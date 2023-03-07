import type { Actions } from "./$types";
import { z } from 'zod';
import { fail } from "@sveltejs/kit";
import { PUBLIC_API } from "$env/static/public";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginError {
    email?: string[];
    password?: string[];
    non_field_errors?: string[];
}

interface LoginResponse {
    access_token: string;
    refresh_token: string;
    access_token_expiration: string;
    refresh_token_expiration: string;
    user: {
        id: number;
        email: string;
        username: string;
    };
}

export const actions = {
    default: async ({ request, cookies, fetch, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            const parsedLogin = loginSchema.parse(formData);
            const login = JSON.stringify(parsedLogin as LoginRequest);
            const res = await fetch(`${PUBLIC_API}/accounts/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: login,
            });
            if (!res.ok) {
                const errors = await res.json() as LoginError;
                return fail(res.status, {
                    data: formData,
                    errors,
                })
            } else {
                const response = await res.json() as LoginResponse;
                const access_expiration = new Date(response.access_token_expiration);
                const refresh_expiration = new Date(response.refresh_token_expiration);
                cookies.set('access_token', response.access_token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: access_expiration.getTime() - Date.now(),
                })
                cookies.set('refresh_token', response.refresh_token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: refresh_expiration.getTime() - Date.now(),
                })
                locals.user = response.user;
                return {
                    user: response.user,
                }
            }
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
    }
} satisfies Actions;