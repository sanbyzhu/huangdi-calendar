const { contextBridge, process } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getAssetPath: (relativePath) => {
        // 在生产环境下，资源位于 resources 目录
        const isDev = process.env.NODE_ENV === 'development' || !process.resourcesPath.includes('app.asar');
        // 注意：electron-builder 打包后 app 位于 app.asar，extraResources 位于 resources 文件夹下
        return relativePath; // 占位，稍后在主进程中更优雅地处理或由前端动态拼接
    },
    isElectron: true,
    resourcesPath: process.resourcesPath
});

window.addEventListener('DOMContentLoaded', () => {
    console.log('古历法桌面端环境就绪');
});
