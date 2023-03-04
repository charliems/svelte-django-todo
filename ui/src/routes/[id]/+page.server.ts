import type { Actions, PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { todosApi } from "$lib/sdk/client";
import type { TodoRequest } from "$lib/sdk/todos";

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
}) satisfies PageServerLoad;

export const actions = {
    update: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const title = data.get('title');
        const description = data.get('description');

        if (id && title && description) {
            const todo: TodoRequest = {
                title: String(title),
                description: String(description),
            }
            let updated = await todosApi.api.apiV1TodosUpdate(Number(id), todo);
        }
    },
} satisfies Actions;