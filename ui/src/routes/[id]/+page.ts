import { todosApi } from "$lib/sdk/client";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
    // Get the todo from the API
    // make sure id is number
    let id = Number(params.id);
    if (isNaN(id)) {
        throw error(404, "Not found");
    }
    const todo = await todosApi.api.apiV1TodosRetrieve(id)
        .catch((err) => {
            throw error(404, "Not found");
        });
    return {
        todo: todo.data
    }
}) satisfies PageLoad;