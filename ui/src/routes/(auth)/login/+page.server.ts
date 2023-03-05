import type { Actions } from "./$types";
import { z } from 'zod';
import { fail, redirect } from "@sveltejs/kit";
import { todosApi } from "$lib/sdk/client";
import type { LoginRequest } from "$lib/sdk/todos";
import { AxiosError } from "axios";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

interface LoginError {
    email?: string[];
    password?: string[];
    non_field_errors?: string[];
}

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = Object.fromEntries(await request.formData());
        let login: LoginRequest;
        try {
            login = loginSchema.parse(formData);
        } catch (err) {
            console.log(err)
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

        let res = await todosApi.api.accountsLoginCreate(login as LoginRequest)
            .catch((err: AxiosError) => {
                return err;
            });
        if (res instanceof AxiosError) {
            console.log(res)
            return fail(400, {
                data: formData,
                errors: res.response?.data as LoginError,
            });
        }
        cookies.set('token', res.data.access_token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30,
        })
        throw redirect(302, '/')
    }
} satisfies Actions;