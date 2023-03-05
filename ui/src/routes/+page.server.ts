import { todosApi } from "$lib/sdk/client";
import type { TodoRequest } from "$lib/sdk/todos";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { z } from 'zod';
import type { AxiosError } from "axios";

const todoSchema = z.object({
    title: z.string({ required_error: 'Todo title is required' }).min(1, { message: 'Todo title required' }).max(64, { message: 'The maximum length is 64' }).trim(),
    description: z.string().min(0).max(256, { message: "Description must be less than 256 characters" }),
})

export const actions = {
    create: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = todoSchema.parse(formData);
            let res = todosApi.api.todosCreate(result as TodoRequest)
                .then((res) => {
                    return {
                        success: true,
                    }
                }).catch((err: AxiosError) => {
                    return fail(400, {
                        data: formData,
                        errors: err.response?.data as TodoRequest,
                    })
                });
            return res;
        } catch (err) {
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
    },
    delete: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            let id = Number(formData.id);
            let res = todosApi.api.todosDestroy(id)
                .then((res) => {
                    return {
                        success: true,
                        data: res.data,
                    }
                }).catch((err: AxiosError) => {
                    return fail(400, {
                        data: formData,
                        errors: err.response?.data as TodoRequest,
                    })
                });
            return res;
        } catch (err) {
            return fail(500, {
                data: formData,
                error: {
                    message: "Something went wrong",
                }
            })
        }
    }
} satisfies Actions