import { todosApi } from "$lib/sdk/client";
import type { LayoutLoad } from "./$types";

export const load = (async () => {
    let todos = await todosApi.api.todosList();
    return {
        todos: todos.data
    };
}) satisfies LayoutLoad;