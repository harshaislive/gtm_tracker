---
title: Web Snippet
subtitle: >-
  Easily integrate the Vapi Voice Widget into your website for enhanced user
  interaction.
slug: assistants/examples/voice-widget
---

Improve your website's user interaction with the Vapi Voice Widget. This robust tool enables your visitors to engage with a voice assistant for support and interaction, offering a smooth and contemporary way to connect with your services.

## Quick Implementation

Choose your preferred implementation method:

<Tabs>
  <Tab title="HTML Script Tag">
    The fastest way to get started. Copy this snippet into your website:

    ```html
    <script>
      var vapiInstance = null;
      const assistant = "<assistant_id>"; // Substitute with your assistant ID
      const apiKey = "<your_public_api_key>"; // Substitute with your Public key from Vapi Dashboard.
      const buttonConfig = {}; // Modify this as required

      (function (d, t) {
        var g = document.createElement(t),
          s = d.getElementsByTagName(t)[0];
        g.src =
          "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g, s);

        g.onload = function () {
          vapiInstance = window.vapiSDK.run({
            apiKey: apiKey, // mandatory
            assistant: assistant, // mandatory
            config: buttonConfig, // optional
          });
        };
      })(document, "script");
    </script>
    ```
  </Tab>

  <Tab title="React/TypeScript">
    Install the SDK and create a React component:

    <CodeBlocks>
    ```bash title="npm"
    npm install @vapi-ai/web
    ```

    ```bash title="yarn"
    yarn add @vapi-ai/web
    ```

    ```bash title="pnpm"
    pnpm add @vapi-ai/web
    ```

    ```bash title="bun"
    bun add @vapi-ai/web
    ```
    </CodeBlocks>

    ```tsx
    import React, { useState, useEffect } from 'react';
    import Vapi from '@vapi-ai/web';

    interface VapiWidgetProps {
      apiKey: string;
      assistantId: string;
      config?: Record<string, unknown>;
    }

    const VapiWidget: React.FC<VapiWidgetProps> = ({ 
      apiKey, 
      assistantId, 
      config = {} 
    }) => {
      const [vapi, setVapi] = useState<Vapi | null>(null);
      const [isConnected, setIsConnected] = useState(false);
      const [isSpeaking, setIsSpeaking] = useState(false);
      const [transcript, setTranscript] = useState<Array<{role: string, text: string}>>([]);

      useEffect(() => {
        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);

        // Event listeners
        vapiInstance.on('call-start', () => {
          console.log('Call started');
          setIsConnected(true);
        });

        vapiInstance.on('call-end', () => {
          console.log('Call ended');
          setIsConnected(false);
          setIsSpeaking(false);
        });

        vapiInstance.on('speech-start', () => {
          console.log('Assistant started speaking');
          setIsSpeaking(true);
        });

        vapiInstance.on('speech-end', () => {
          console.log('Assistant stopped speaking');
          setIsSpeaking(false);
        });

        vapiInstance.on('message', (message) => {
          if (message.type === 'transcript') {
            setTranscript(prev => [...prev, {
              role: message.role,
              text: message.transcript
            }]);
          }
        });

        vapiInstance.on('error', (error) => {
          console.error('Vapi error:', error);
        });

        return () => {
          vapiInstance?.stop();
        };
      }, [apiKey]);

      const startCall = () => {
        if (vapi) {
          vapi.start(assistantId);
        }
      };

      const endCall = () => {
        if (vapi) {
          vapi.stop();
        }
      };

      return (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          fontFamily: 'Arial, sans-serif'
        }}>
          {!isConnected ? (
            <button
              onClick={startCall}
              style={{
                background: '#12A594',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(18, 165, 148, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(18, 165, 148, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 165, 148, 0.3)';
              }}
            >
              🎤 Talk to Assistant
            </button>
          ) : (
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '20px',
              width: '320px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              border: '1px solid #e1e5e9'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isSpeaking ? '#ff4444' : '#12A594',
                    animation: isSpeaking ? 'pulse 1s infinite' : 'none'
                  }}></div>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>
                    {isSpeaking ? 'Assistant Speaking...' : 'Listening...'}
                  </span>
                </div>
                <button
                  onClick={endCall}
                  style={{
                    background: '#ff4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  End Call
                </button>
              </div>
              
              <div style={{
                maxHeight: '200px',
                overflowY: 'auto',
                marginBottom: '12px',
                padding: '8px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                {transcript.length === 0 ? (
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                    Conversation will appear here...
                  </p>
                ) : (
                  transcript.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        marginBottom: '8px',
                        textAlign: msg.role === 'user' ? 'right' : 'left'
                      }}
                    >
                      <span style={{
                        background: msg.role === 'user' ? '#12A594' : '#333',
                        color: '#fff',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        display: 'inline-block',
                        fontSize: '14px',
                        maxWidth: '80%'
                      }}>
                        {msg.text}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          <style>{`
            @keyframes pulse {
              0% { opacity: 1; }
              50% { opacity: 0.5; }
              100% { opacity: 1; }
            }
          `}</style>
        </div>
      );
    };

    export default VapiWidget;

    // Usage in your app:
    // <VapiWidget 
    //   apiKey="your_public_api_key" 
    //   assistantId="your_assistant_id" 
    // />
    ```
  </Tab>
</Tabs>

### Custom Styling

You can customize the widget appearance by modifying the styles in the React component:

```tsx
// Custom button styles
const customButtonStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '25px',
  padding: '12px 30px',
  fontSize: '14px',
  fontWeight: '600',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
};

// Custom panel styles  
const customPanelStyle = {
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  borderRadius: '16px',
  border: '2px solid #e1e8ed',
  backdropFilter: 'blur(10px)',
};
```

### Event Handling

Listen to various events for custom functionality:

```tsx
import Vapi from '@vapi-ai/web';

function setupAdvancedVoiceWidget(apiKey: string, assistantId: string) {
  const vapi = new Vapi(apiKey);

  // Call lifecycle events
  vapi.on('call-start', () => {
    console.log('Voice conversation started');
    // Track analytics, show notifications, etc.
  });

  vapi.on('call-end', () => {
    console.log('Voice conversation ended');
    // Save conversation data, show feedback form, etc.
  });

  // Real-time conversation events
  vapi.on('speech-start', () => {
    console.log('User started speaking');
  });

  vapi.on('speech-end', () => {
    console.log('User stopped speaking');
  });

  vapi.on('message', (message) => {
    if (message.type === 'transcript') {
      console.log(`${message.role}: ${message.transcript}`);
      // Update UI with real-time transcription
    } else if (message.type === 'function-call') {
      console.log('Function called:', message.functionCall.name);
      // Handle custom function calls
    }
  });

  // Error handling
  vapi.on('error', (error) => {
    console.error('Voice widget error:', error);
    // Show user-friendly error messages
  });

  return {
    start: () => vapi.start(assistantId),
    stop: () => vapi.stop(),
    send: (message: string) => vapi.send({
      type: 'add-message',
      message: {
        role: 'user',
        content: message
      }
    })
  };
}
```

### Integration Examples

**E-commerce Support Widget:**
```tsx
const EcommerceSupportWidget = () => {
  return (
    <VapiWidget
      apiKey="your_api_key"
      assistantId="ecommerce_support_assistant_id"
      config={{
        position: 'bottom-right',
        theme: 'ecommerce',
        greeting: 'Hi! Need help with your order?',
        voice: {
          provider: 'playht',
          voice_id: 'jennifer',
        },
      }}
    />
  );
};
```

**Healthcare Appointment Widget:**
```tsx
const HealthcareWidget = () => {
  return (
    <VapiWidget
      apiKey="your_api_key"
      assistantId="healthcare_assistant_id"
      config={{
        position: 'bottom-left',
        theme: 'healthcare',
        greeting: 'Hello! I can help schedule your appointment.',
        voice: {
          provider: 'playht',
          voice_id: 'jennifer',
        },
      }}
    />
  );
};
```