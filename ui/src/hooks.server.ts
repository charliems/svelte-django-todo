import { todosApi } from "$lib/sdk/client";
import type { Handle } from "@sveltejs/kit";
export const handle: Handle = async ({ event, resolve}) => {
    const token = event.cookies.get('token');
    if (!token) {
        return await resolve(event);
    }

    return await todosApi.api.accountsMeRetrieve({
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(async (res) => {
        event.locals.user = res.data as App.Locals['user'];
        return await resolve(event);
    })
    .catch(async (err) => {
        return await resolve(event);
    })
}