import type { LayoutServerLoad } from "./$types";
import { PUBLIC_API } from "$env/static/public";
import type { Todo } from "$lib/types/Todo";

export const load = (async ({ locals, fetch }) => {
    let todos = await fetch(`${PUBLIC_API}/todos/`);
    let todosJson = await todos.json() as Todo[];
    return {
        todos: todosJson,
        user: locals.user,
    };
}) satisfies LayoutServerLoad;