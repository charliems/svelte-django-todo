import { todosApi } from "$lib/sdk/client";
import type { PageLoad } from "./$types";

export const load = (async () => {
    let todos = await todosApi.api.apiV1TodosList();
    return {
        todos: todos.data
    };
}) satisfies PageLoad;