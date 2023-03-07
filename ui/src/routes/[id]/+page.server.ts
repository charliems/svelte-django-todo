import type { Actions } from "./$types";
import { z } from 'zod';
import { fail } from "@sveltejs/kit";
import type { TodoRequest } from "$lib/types/Todo";
import { PUBLIC_API } from "$env/static/public";


const todoSchema = z.object({
    title: z.string({ required_error: 'Todo title is required' }).min(1, { message: 'Todo title required' }).max(64, { message: 'The maximum length is 64' }).trim(),
    description: z.string().min(0).max(256, { message: "Description must be less than 256 characters" }),
})

export const actions = {
    update: async ({ request, params, fetch }) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            let id = Number(params.id);
            const parsedTodo = todoSchema.parse(formData);
            let todo = JSON.stringify(parsedTodo as TodoRequest);
            console.log(todo);
            let res = await fetch(`${PUBLIC_API}/todos/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: todo,
            });
            if (res.ok) {
                return {
                    success: true,
                }
            } else {
                let errors = await res.json() as TodoRequest;
                return fail(res.status, {
                    data: formData,
                    errors,
                })
            }
        } catch (err) {
            console.log(err);
            if (err instanceof z.ZodError) {
                const { fieldErrors: errors } = err.flatten();
                return fail(400, {
                    data: formData,
                    validation: errors
                })
            } else {
                return fail(500, {
                    data: formData,
                    error: {
                        message: "Something went wrong",
                    }
                })
            }
        }
    }
} satisfies Actions;