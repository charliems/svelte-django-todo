<script lang="ts">
    import { fly } from "svelte/transition";
    import type { ActionData, PageData } from "./$types";
    import { enhance } from "$app/forms";

    export let data: PageData;

    export let form: ActionData;
    $: todos = data.todos;
</script>

{#if form?.error?.message}
    <p>{form.error.message}</p>
{/if}
<form action="?/create" method="post" use:enhance>
    {#if form?.validation?.title}
        <p>{form.validation.title}</p>
    {/if}
    {#if form?.errors?.title}
        <p>{form.errors.title}</p>
    {/if}
    <label for="title">Title</label>
    <input type="text" name="title" id="title" />
    <br />
    {#if form?.validation?.description}
        <p>{form.validation.description}</p>
    {/if}
    {#if form?.errors?.description}
        <p>{form.errors.description}</p>
    {/if}
    <label for="description">Description</label>
    <input type="text" name="description" id="description" />
    <input type="submit" value="Add!" />
</form>
<ul>
    {#each todos as todo (todo.id)}
        <li class="todo" in:fly={{ y: 20 }} out:fly|local={{ x: 20 }}>
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
