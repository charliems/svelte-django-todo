import { PUBLIC_API } from "$env/static/public";
import type { Handle } from "@sveltejs/kit";
export const handle: Handle = async ({ event, resolve}) => {
    const token = event.cookies.get('token');
    if (!token) {
        return await resolve(event);
    }
    const res = await fetch(`${PUBLIC_API}/accounts/me/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    if (res.ok) {
        event.locals.user = await res.json() as App.Locals['user'];
    } else {
        event.cookies.delete('token', {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        })
    }
    return await resolve(event);
}