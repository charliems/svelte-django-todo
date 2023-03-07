import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { z } from 'zod';
import { PUBLIC_API } from "$env/static/public";
import type { TodoRequest, TodoRequestError } from "$lib/types/Todo";

const todoSchema = z.object({
    title: z.string({ required_error: 'Todo title is required' }).min(1, { message: 'Todo title required' }).max(64, { message: 'The maximum length is 64' }).trim(),
    description: z.string().min(0).max(256, { message: "Description must be less than 256 characters" }),
});

export const actions = {
    create: async ({ request, fetch, cookies }) => {
        const formData = Object.fromEntries(await request.formData());
        let todo: TodoRequest;
        try {
            todo = todoSchema.parse(formData);
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                const { fieldErrors: errors } = err.flatten();
                return fail(400, {
                    data: formData,
                    validation: errors
                })
            }
            else {
                return fail(500, {
                    data: formData,
                    error: {
                        message: "Something went wrong",
                    }
                })
            }
        }
        let created = await fetch(`${PUBLIC_API}/todos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get('access_token')}`
            },
            body: JSON.stringify(todo),
        });
        if (created.ok) {
            return {
                success: true,
            }
        } else {
            let errors = await created.json() as TodoRequestError;
            console.log(errors)
            return fail(created.status, {
                data: formData,
                errors
            })
        }
    },
    delete: async ({ request, fetch, cookies }) => {
        const formData = Object.fromEntries(await request.formData());

        let deleted = await fetch(`${PUBLIC_API}/todos/${formData.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get('access_token')}`
            },
        });
        if (deleted.ok) {
            return {
                success: true,
            }
        } else {
            return fail(deleted.status, {
                data: formData,
                error: {
                    message: "Something went wrong",
                }
            })
        }
    }
} satisfies Actions;