/**
 * 统一资源路径适配工具
 * 用于解决不同环境下（Web, Android, Electron）静态资源加载路径不一致的问题
 */

export const getAssetUrl = (path: string): string => {
    // 处理路径前缀，确保以 / 开头或不带 ./ 开头
    let cleanPath = path.startsWith('./') ? path.substring(2) : path;
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

    // 1. 检查是否在 Electron 环境
    const currentWindow = typeof window !== 'undefined'
        ? (window as Window & { electronAPI?: { isElectron?: boolean } })
        : undefined;
    const isElectron = currentWindow?.electronAPI?.isElectron;

    if (isElectron) {
        // 获取由 preload.cjs 注入的资源路径
        // 注意：在生产环境下，extraResources 位于 resourcesDir/ 目录下，而网页位于 resourcesDir/app.asar/dist 下
        // 我们的 package.json 配置将 public/assets 复制到了 resources/assets
        // 相对路径 ../../assets 应该可以跳出 app.asar 访问到 resources/assets
        return `..${cleanPath}`;
    }

    // 2. 处理 Capacitor / Android 环境 (通常使用相对路径 ./ 或绝对路径 /)
    // Capacitor 虽然也面临路径问题，但目前用户反馈 APK 没问题，所以保持现状

    // 3. Web / GitHub Pages 环境
    return `.${cleanPath}`;
};
