// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const platform = require('os').platform;



contextBridge.exposeInMainWorld(
    'fileAPI', {
    readFileSync: fs.readFileSync,
    readdirSync: fs.readdirSync,
    mkdirSync: fs.mkdirSync,
    writeFileSync: fs.writeFileSync,
    statSync: (path) => fs.statSync(path),
    getExtension: (filePath) => path.extname(filePath),
    opendir: (path) => {
        let explorer;
        switch (platform()) {
            case "win32": explorer = "explorer"; break;
            case "linux": explorer = "xdg-open"; break;
            case "darwin": explorer = "open"; break;
        }
        spawn(explorer, [path], { detached: true }).unref();
    },
    showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
    getBasePath: () => ipcRenderer.invoke('get-base-path')
});

