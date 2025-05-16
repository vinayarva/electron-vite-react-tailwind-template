// src/App.jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [messageFromMain, setMessageFromMain] = useState('');

  useEffect(() => {
    // Example: Listen for replies from the main process
    if (window.electronAPI && window.electronAPI.onReplyFromMain) {
      window.electronAPI.onReplyFromMain((reply) => {
        console.log('Reply received from main:', reply);
        setMessageFromMain(reply);
      });
    } else {
      console.warn('electronAPI or onReplyFromMain not found. Are you running in Electron?');
    }
  }, []);

  const handleSendMessage = () => {
    if (window.electronAPI && window.electronAPI.sendMessageToMain) {
      const message = "Hello Main Process from React!";
      console.log('Sending message to main:', message);
      window.electronAPI.sendMessageToMain(message);
    } else {
      console.warn('electronAPI or sendMessageToMain not found.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-teal-400">Component Library for Testing </h1>
        <p className="text-xl text-gray-400">Desktop Edition</p>
      </header>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <button
          onClick={handleSendMessage}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
        >
          Send Message to Main Process
        </button>
        {messageFromMain && (
          <p className="mt-4 text-sm text-green-400 bg-gray-700 p-3 rounded-md">
            Response from Main: <span className="font-semibold">{messageFromMain}</span>
          </p>
        )}
      </div>

      {/* Future components will go here: ComponentList, ComponentForm, PreviewPane */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        <p>Next steps: Implement database IPC and UI components.</p>
      </div>
    </div>
  );
}

export default App;