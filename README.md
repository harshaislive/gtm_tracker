# 🎤 GTM Tracker Beforest

A sophisticated voice-powered Trello management interface built with React, TypeScript, and VAPI, featuring Beforest's signature glassmorphism design with world-class animations.

## ✨ Features

- 🎨 **Beforest Brand Design** - Beautiful glassmorphism UI with authentic brand colors
- 🎭 **World-Class Animations** - Smooth transitions and micro-interactions
- 💬 **Voice-Powered GTM Management** - Control Trello boards with voice commands
- 🌊 **Real-time Task Updates** - See your GTM progress update instantly
- 🎯 **Interactive Voice Interface** - Visual feedback with ripple effects and status indicators
- 📱 **Responsive Design** - Perfect on desktop and mobile devices
- 🔊 **Smart Voice Recognition** - Advanced speech processing for GTM commands

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- VAPI account with API key and Assistant ID
- Trello integration (configured in VAPI assistant)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Setup environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
   VITE_VAPI_ASSISTANT_ID=your_assistant_id_here
   ```

   > **Get your VAPI credentials:**
   > - Sign up at [VAPI Dashboard](https://dashboard.vapi.ai)
   > - Create a GTM assistant with Trello integration
   > - Copy the Assistant ID and Public API Key

3. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎯 GTM Voice Commands

### Task Management
- **"Add task [task name] to [board/list]"** - Create new GTM tasks
- **"Update status of [task] to [status]"** - Change task progress
- **"Show me the progress on [project]"** - Get status updates
- **"Move [task] to [list]"** - Reorganize tasks

### Team Coordination  
- **"Assign [task] to [team member]"** - Delegate responsibilities
- **"What's the timeline for [project]?"** - Check deadlines
- **"Show blockers"** - Identify issues

### Reporting
- **"Generate progress report"** - Get comprehensive updates
- **"What's completed this week?"** - Weekly summaries
- **"Show priority tasks"** - Focus on what matters

## 🎨 Beforest Design System

### Brand Colors
- **Deep Blue** (`#002140`) - Primary background
- **Forest Green** (`#344736`) - Success states and assistant messages  
- **Rich Red** (`#86312b`) - User messages and alerts
- **Warm Yellow** (`#ffc083`) - Accent and active states
- **Off White** (`#fdfbf7`) - Primary text

### Visual Elements
- **Glassmorphism Cards** - Semi-transparent with 25px blur
- **Brand Logo** - Authentic [Beforest branding](https://beforest.co/wp-content/uploads/2024/10/24-Beforest-White-with-Tagline.png)
- **Apple-style Scrollbar** - Ultra-thin, auto-hiding
- **Smooth Animations** - 60fps transitions throughout

## 🏗 Project Structure

```
src/
├── components/
│   ├── VoiceButton.tsx      # Voice control with brand colors
│   ├── ConversationDisplay.tsx # GTM command center
├── hooks/
│   └── useVapi.ts           # VAPI integration
├── types/
│   └── vapi.types.ts        # TypeScript interfaces
├── App.tsx                  # Main GTM Tracker interface
├── main.tsx                 # React entry point
└── index.css               # Beforest glassmorphism styles
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_VAPI_PUBLIC_KEY` | Your VAPI public API key | ✅ Yes |
| `VITE_VAPI_ASSISTANT_ID` | Your GTM assistant ID | ✅ Yes |

### Trello Integration

Configure your VAPI assistant with:
- Trello API access
- Board permissions for your GTM workspace
- Custom functions for task management
- Team member identification

## 🎭 Animation System

### Message Animations
- **User commands**: Slide in from right with Rich Red styling
- **Assistant responses**: Slide in from left with Forest Green styling
- **Status updates**: Smooth fade transitions
- **Progress indicators**: Warm Yellow accent animations

### Voice Interface
- **Idle**: Gentle pulse with Beforest earth tones
- **Listening**: Forest Green ripple effects
- **Processing**: Warm Yellow spinner animation
- **Speaking**: Rich Red pulse with response feedback

## 🛠 Tech Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling with Beforest colors
- **VAPI SDK** - Voice AI integration
- **Lucide React** - Professional iconography
- **Framer Motion** - Advanced animations

## 🔍 Troubleshooting

### Common Issues

**"VAPI API key is required" error:**
- Ensure your `.env` file contains valid VAPI credentials
- Restart the development server after changes
- Verify your VAPI assistant has Trello permissions

**Voice commands not working:**
- Check microphone permissions in browser
- Ensure HTTPS in production environments
- Verify Trello integration in VAPI dashboard

**Styling issues:**
- Confirm Tailwind CSS is processing Beforest colors
- Check browser support for backdrop-filter (glassmorphism)
- Verify logo image is accessible

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Deploy to Vercel/Netlify:
1. Connect your repository
2. Add environment variables (VAPI keys)
3. Deploy with automatic builds

## 🤝 GTM Team Usage

This voice interface is specifically designed for:
- **Product Managers** - Track feature development
- **Marketing Teams** - Monitor campaign progress  
- **Sales Teams** - Update pipeline status
- **Leadership** - Get real-time progress reports

## 📄 License

MIT License - Built for Beforest's GTM excellence.

---

**Manage your GTM success with voice! 🎤📊**

*Powered by [Beforest](https://beforest.co) - Where innovation meets execution.* 