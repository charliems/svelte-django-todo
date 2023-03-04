import { todosApi } from "$lib/sdk/client";
import type { TodoRequest } from "$lib/sdk/todos";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const title = data.get('title');
        const description = data.get('description');

        if (title && description) {
            const todo: TodoRequest = {
                title: String(title),
                description: String(description),
            }

            // TODO: Handle errors
            let created = await todosApi.api.apiV1TodosCreate(todo);
        } else {
            return fail(400, { title, description, missing: true })
        }
    },
    delete: async ({request}) => {
        const data = await request.formData();
        const id = data.get('id');

        if (id && !isNaN(Number(id))) {
            // TODO: Handle errors
            let deleted = await todosApi.api.apiV1TodosDestroy(Number(id));
        }
    }
} satisfies Actions