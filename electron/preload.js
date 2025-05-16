// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Example: Send a message and receive a reply
  sendMessageToMain: (message) => ipcRenderer.send('message-from-renderer', message),
  onReplyFromMain: (callback) => ipcRenderer.on('reply-from-main', (_event, ...args) => callback(...args)),

  // Database related APIs will be exposed here
  // e.g., getComponents: () => ipcRenderer.invoke('db:get-components'),
  //       addComponent: (component) => ipcRenderer.invoke('db:add-component', component),
});

console.log('Preload script loaded.');
