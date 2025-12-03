
# Windows Setup Guide for TTL-SPHINX

This guide will help you set up the development environment on Windows 10/11.

## Prerequisites

1.  **Node.js**: Download and install the "LTS" version from [nodejs.org](https://nodejs.org/).
2.  **Google Gemini API Key**: Get a key from [Google AI Studio](https://aistudio.google.com/).

## Step 1: Install Project Dependencies

Open **PowerShell** or **Command Prompt** (cmd) and navigate to the project folder.

```powershell
cd path\to\ttl-sphinx
npm install
```

*Note: If you do not have a `package.json`, you may need to initialize one or install the required packages manually if you are building from scratch:*
```powershell
npm install react react-dom lucide-react @google/genai
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom tailwindcss postcss autoprefixer
```

## Step 2: Configure Environment Variables

For security, the API key should be set as an environment variable.

**Option A: Temporary (Current Session Only)**
In PowerShell:
```powershell
$env:API_KEY="your_actual_api_key_here"
```

In Command Prompt (cmd):
```cmd
set API_KEY=your_actual_api_key_here
```

**Option B: Create a `.env` file (Recommended)**
Create a file named `.env` in the root of your project folder and add:
```
VITE_API_KEY=your_actual_api_key_here
```
*(Note: If using Vite, variables must usually start with `VITE_`. If running in a Node context, standard `API_KEY` works. The provided code expects `process.env.API_KEY`, which is often replaced by bundlers).*

## Step 3: Run the Application

Start the development server:

```powershell
npm run dev
```

or if using a raw vite setup:

```powershell
npx vite
```

Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

## Troubleshooting

*   **"API_KEY is missing"**: Ensure you set the environment variable correctly before running the start command. If using Vite, you may need to update `services/geminiService.ts` to use `import.meta.env.VITE_API_KEY` instead of `process.env.API_KEY` depending on your build configuration.
*   **Blank Screen**: Check the browser console (F12) for errors.
