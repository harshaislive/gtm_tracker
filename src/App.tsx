import { VoiceButton } from './components/VoiceButton';
import { ConversationDisplay } from './components/ConversationDisplay';
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
    startCall,
    endCall,
    clearMessages,
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
          
          {/* Smaller, More Refined Title */}
          <h1 className="text-sm md:text-lg lg:text-xl font-semibold text-beforest-off-white mb-2">
            GTM Tracker Beforest
          </h1>
          <p className="text-beforest-off-white/75 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Manage your Go-to-Market tasks and Trello boards with voice commands. Keep your team aligned and track progress effortlessly.
          </p>
          
          {/* Smaller Badge Tags */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span className="px-2.5 py-1 bg-beforest-warm-yellow/20 text-beforest-warm-yellow rounded-full border border-beforest-warm-yellow/30 text-xs font-medium">
              Voice-Powered
            </span>
            <span className="px-2.5 py-1 bg-beforest-soft-green/20 text-beforest-soft-green rounded-full border border-beforest-soft-green/30 text-xs font-medium">
              Trello Integration
            </span>
            <span className="px-2.5 py-1 bg-beforest-light-blue/20 text-beforest-light-blue rounded-full border border-beforest-light-blue/30 text-xs font-medium">
              GTM Focused
            </span>
          </div>
        </div>

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

        {/* Conversation Display */}
        <div className="mb-6">
          <ConversationDisplay 
            messages={messages} 
            isAssistantSpeaking={isAssistantSpeaking}
          />
        </div>

        {/* Voice Controls */}
        <div className="flex flex-col items-center gap-6">
          <VoiceButton
            connectionStatus={connectionStatus}
            speechStatus={speechStatus}
            onStartCall={startCall}
            onEndCall={endCall}
            isAssistantSpeaking={isAssistantSpeaking}
          />
          
          {/* Clear Messages Button */}
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="glass-button px-3 py-1.5 rounded-full text-beforest-off-white/80 text-xs hover:text-beforest-off-white transition-colors"
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