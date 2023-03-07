<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Todo } from "$lib/types/Todo";
    import { fly } from "svelte/transition";

    export let todo: Todo;
</script>
<li class="todo" in:fly={{ y: 20 }} out:fly|local={{ x: 20 }}>
    <form action="?/delete" method="post" use:enhance>
        <a href="/{todo.id}">
            {todo.title}
        </a>
        <input type="hidden" name="id" value={todo.id} />
        <input type="submit" value="Complete" />
    </form>
</li>