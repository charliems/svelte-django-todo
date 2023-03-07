import type { LayoutServerLoad } from "./$types";
import { PUBLIC_API } from "$env/static/public";
import type { Todo } from "$lib/types/Todo";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ locals, cookies, fetch }) => {
    if (!locals.user) {
        throw redirect(303, '/login');
    }
    let todos = await fetch(`${PUBLIC_API}/todos/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.get('access_token')}`
        },
    });
    let todosJson = await todos.json() as Todo[];
    return {
        todos: todosJson,
        user: locals.user,
    };
}) satisfies LayoutServerLoad;