import posthog from 'posthog-js';

export function init(): void {
    const apiKey = import.meta.env.VITE_POSTHOG_API_KEY?.trim();
    const apiHost = import.meta.env.VITE_POSTHOG_API_HOST?.trim();

    if (!apiKey || !apiHost) return;

    posthog.init(apiKey, {
        api_host: apiHost,
        autocapture: false,
        capture_pageleave: false,
        capture_pageview: false,
        opt_out_capturing_by_default: true,
        persistence: 'memory',
    });
}
