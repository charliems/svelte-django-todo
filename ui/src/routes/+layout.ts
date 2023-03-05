import { todosApi } from "$lib/sdk/client";
import type { LayoutLoad } from "./$types";

export const load = (async () => {
    let todos = await todosApi.api.apiV1TodosList();
    return {
        todos: todos.data
    };
}) satisfies LayoutLoad;