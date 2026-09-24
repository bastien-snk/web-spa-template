/**
 * Configure the generated API SDK here when deriving an application.
 * Feature adapters, rather than UI components, consume that SDK.
 */
export function init() {
    return import.meta.env.VITE_API_URL;
}

export function resolveApiUrl(path: string): string {
    return `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
