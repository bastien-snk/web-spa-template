import { createAuthClient } from 'better-auth/react';

/** Configure Better Auth once for the application; feature modules consume this client. */
export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL,
});
