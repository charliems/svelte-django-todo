import { PUBLIC_API } from "$env/static/public";
import type { Handle } from "@sveltejs/kit";
export const handle: Handle = async ({ event, resolve }) => {
    let access_token = event.cookies.get('access_token');
    const refresh_token = event.cookies.get('refresh_token');
    if (!access_token) {
        if (!refresh_token) {
            return await resolve(event);
        }
        let res = await fetch(`${PUBLIC_API}/accounts/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refresh_token,
            }),
        });
        if (res.ok) {
            let {access, access_token_expiration} = await res.json();
            event.cookies.set('access_token', access, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                expires: new Date(access_token_expiration),
            });
            access_token = access;
        } else {
            return await resolve(event);
        }
    }
    const res = await fetch(`${PUBLIC_API}/accounts/me/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    });
    if (res.ok) {
        event.locals.user = await res.json() as App.Locals['user'];
    }
    return await resolve(event);
}