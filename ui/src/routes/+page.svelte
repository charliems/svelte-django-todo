<script lang="ts">
    import { fly } from "svelte/transition";
    import type { ActionData, PageData } from "./$types";
    import { enhance } from "$app/forms";

    export let data: PageData;

    export let form: ActionData;
    $: todos = data.todos;
</script>

<form action="?/create" method="post" use:enhance>
    {#if form?.missing}
        <p>Both fields are required</p>
    {/if}
    <label for="title">Title</label>
    <input type="text" name="title" id="title" value={form?.title ?? ""} />
    <label for="description">Description</label>
    <input
        type="text"
        name="description"
        id="description"
        value={form?.description ?? ""}
    />
    <input type="submit" value="Add!" />
</form>

{#if todos}
    <ul>
        {#each todos as todo (todo.id)}
            <li class="todo" in:fly={{ y: 20 }}>
                <form action="?/delete" method="post" use:enhance>
                    <a href="/{todo.id}">
                        {todo.title}
                    </a>
                    <input type="hidden" name="id" value={todo.id} />
                    <input type="submit" value="Complete" />
                </form>
            </li>
        {/each}
    </ul>
{/if}
