import { PUBLIC_API } from "$env/static/public";
import type { Todo } from "$lib/types/Todo";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ params, fetch }) => {
    let todo = await fetch(`${PUBLIC_API}/todos/${params.id}/`);
    if (todo.ok) {
        let todoJson = await todo.json() as Todo;
        return {
            todo: todoJson,
        };
    } else {
        throw error(404, "Todo not found");
    }
}) satisfies PageLoad;