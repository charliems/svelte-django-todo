import { todosApi } from "$lib/sdk/client";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
    let id = Number(params.id);
    if (isNaN(id)) {
        throw error(404, "Not found");
    }
    const todo = await todosApi.api.todosRetrieve(id)
        .catch((err) => {
            throw error(404, "Not found");
        });
    return {
        todo: todo.data
    }
}) satisfies PageLoad;