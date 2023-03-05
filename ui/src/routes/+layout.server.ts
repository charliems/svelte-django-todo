import { todosApi } from "$lib/sdk/client";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    let todos = await todosApi.api.todosList();
    return {
        todos: todos.data,
        user: locals.user,
    };
}) satisfies LayoutServerLoad;