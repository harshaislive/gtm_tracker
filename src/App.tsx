import { VoiceButton } from './components/VoiceButton';
import { ConversationDisplay } from './components/ConversationDisplay';
import { QuestionDisplay } from './components/QuestionDisplay';
import { TextInput } from './components/TextInput';
import { useVapi } from './hooks/useVapi';

function App() {
  const apiKey = import.meta.env.VITE_VAPI_PUBLIC_KEY || '';
  const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || '';

  const {
    messages,
    connectionStatus,
    speechStatus,
    isAssistantSpeaking,
    error,
    evaluationState,
    startCall,
    endCall,
    clearMessages,
    sendTextMessage,
    isConnected,
  } = useVapi({ apiKey, assistantId });

  const showError = error && !apiKey;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Effects with Beforest Colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-beforest-deep-blue/30 via-beforest-forest-green/20 to-beforest-dark-earth/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,192,131,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(134,49,43,0.1),transparent_70%)]" />
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header with Logo - More Sleek */}
        <div className="text-center mb-6">
          {/* Beforest Logo - Smaller Size */}
          <div className="mb-3 flex justify-center">
            <img 
              src="/beforest-logo.png" 
              alt="Beforest Logo" 
              className="h-8 md:h-10 object-contain filter brightness-100 opacity-90 hover:opacity-100 transition-opacity duration-300"
              onError={(e) => {
                // Fallback if logo doesn't load
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          {/* Updated Title for Bespoke Agent */}
          <h1 className="text-sm md:text-lg lg:text-xl font-semibold text-beforest-off-white mb-2">
            Bespoke Agent Evaluation
          </h1>
          <p className="text-beforest-off-white/75 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Evaluate communication skills in guiding prospects towards Beforest membership. 
            Demonstrate expertise in sustainable living and collective ownership values.
          </p>
          
          {/* Updated Badge Tags */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span className="px-2.5 py-1 bg-beforest-warm-yellow/20 text-beforest-warm-yellow rounded-full border border-beforest-warm-yellow/30 text-xs font-medium">
              Communication Skills
            </span>
            <span className="px-2.5 py-1 bg-beforest-soft-green/20 text-beforest-soft-green rounded-full border border-beforest-soft-green/30 text-xs font-medium">
              Sales Evaluation
            </span>
            <span className="px-2.5 py-1 bg-beforest-light-blue/20 text-beforest-light-blue rounded-full border border-beforest-light-blue/30 text-xs font-medium">
              Beforest Values
            </span>
          </div>
        </div>

        {/* Debug Status Display - Only show when there are actual connection issues */}
        {(error || !apiKey || !assistantId) && (
          <div className="glass-morphism rounded-2xl p-4 mb-6 border-beforest-light-blue/40 bg-beforest-light-blue/5">
            <h3 className="text-beforest-off-white font-medium text-sm mb-2 text-center">
              🔧 Connection Debug
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <p className="text-beforest-off-white/70">API Key</p>
                <p className={apiKey ? 'text-beforest-soft-green' : 'text-beforest-coral-orange'}>
                  {apiKey ? '✅ Loaded' : '❌ Missing'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-beforest-off-white/70">Assistant ID</p>
                <p className={assistantId ? 'text-beforest-soft-green' : 'text-beforest-coral-orange'}>
                  {assistantId ? '✅ Loaded' : '❌ Missing'}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-beforest-off-white/10 text-center">
              <p className="text-beforest-off-white/70 text-xs">Status: 
                <span className={`ml-1 font-medium ${
                  connectionStatus === 'connected' ? 'text-beforest-soft-green' :
                  connectionStatus === 'connecting' ? 'text-beforest-warm-yellow' :
                  'text-beforest-coral-orange'
                }`}>
                  {connectionStatus.toUpperCase()}
                </span>
              </p>
              {error && (
                <p className="text-beforest-coral-orange text-xs mt-1">
                  Error: {error}
                </p>
              )}
              <p className="text-beforest-off-white/50 text-xs mt-2">
                💡 Check browser console for detailed logs
              </p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {showError && (
          <div className="glass-morphism rounded-2xl p-4 mb-6 border-beforest-coral-orange/40 bg-beforest-rich-red/10">
            <p className="text-beforest-coral-orange text-center text-sm">
              ⚠️ Please set your VAPI_PUBLIC_KEY and VAPI_ASSISTANT_ID in your environment variables
            </p>
            <p className="text-beforest-coral-orange/70 text-xs text-center mt-2">
              Create a .env file with: VITE_VAPI_PUBLIC_KEY=your_key and VITE_VAPI_ASSISTANT_ID=your_id
            </p>
          </div>
        )}

        {/* Question Display - New Component */}
        <QuestionDisplay 
          evaluationState={evaluationState} 
          isConnected={isConnected}
          connectionStatus={connectionStatus}
        />

        {/* Conversation Display */}
        <div className="mb-6">
          <ConversationDisplay 
            messages={messages} 
            isAssistantSpeaking={isAssistantSpeaking}
          />
        </div>

        {/* Dual Input Interface */}
        <div className="flex flex-col items-center gap-4">
          {/* Voice Input */}
          <div className="text-center">
            <VoiceButton
              connectionStatus={connectionStatus}
              speechStatus={speechStatus}
              onStartCall={startCall}
              onEndCall={endCall}
              isAssistantSpeaking={isAssistantSpeaking}
            />
          </div>
          
          {/* Text Input */}
          <TextInput
            onSendMessage={sendTextMessage}
            disabled={speechStatus === 'listening' || speechStatus === 'processing' || isAssistantSpeaking}
            placeholder={
              evaluationState.evaluationStep === 'validation' 
                ? "Type your name or email..." 
                : evaluationState.evaluationStep === 'questions'
                ? "Type your response to the evaluation question..."
                : "Type your response..."
            }
            isConnected={isConnected}
          />
          
          {/* Clear Messages Button */}
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="glass-button px-4 py-2 rounded-full text-beforest-off-white/80 text-xs hover:text-beforest-off-white transition-colors mt-2"
            >
              Clear Conversation
            </button>
          )}
        </div>

        {/* Status Info */}
        {error && apiKey && (
          <div className="mt-4 text-center">
            <p className="text-beforest-coral-orange text-xs">
              {error}
            </p>
          </div>
        )}

        {/* Evaluation Instructions */}
        {!isConnected && evaluationState.evaluationStep === 'greeting' && (
          <div className="mt-8 glass-morphism rounded-2xl p-4">
            <h3 className="text-beforest-off-white font-medium text-sm mb-3 text-center">
              Evaluation Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-beforest-warm-yellow/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-beforest-warm-yellow font-medium">1</span>
                </div>
                <p className="text-beforest-off-white/70">Introduction & Validation</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-beforest-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-beforest-light-blue font-medium">2</span>
                </div>
                <p className="text-beforest-off-white/70">Scenario-based Questions</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-beforest-soft-green/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-beforest-soft-green font-medium">3</span>
                </div>
                <p className="text-beforest-off-white/70">Feedback & Summary</p>
              </div>
            </div>
            <div className="text-center pt-3 border-t border-beforest-off-white/10">
              <p className="text-beforest-off-white/60 text-xs">
                💬 <strong>Voice:</strong> Tap microphone • ⌨️ <strong>Text:</strong> Type your response
              </p>
              <p className="text-beforest-off-white/50 text-xs mt-1">
                Choose your preferred input method
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Floating Particles with Brand Colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full animate-pulse ${
              i % 3 === 0 ? 'bg-beforest-warm-yellow/20' : 
              i % 3 === 1 ? 'bg-beforest-soft-green/15' : 
              'bg-beforest-light-blue/10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App; 