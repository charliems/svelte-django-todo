<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import type { PageData } from "./$types";

    export let data: PageData;

    let edit = false;
</script>

{#if data.todo}
    {#if !edit}
        <h1>{data.todo.title}</h1>
        <p>{data.todo.description}</p>
        <button on:click={() => (edit = true)}>Edit</button>
    {/if}
    {#if edit}
        <form
            action="?/update"
            method="post"
            use:enhance={() => {
                return async ({ result }) => {
                    edit = false;
                    invalidateAll();
                    applyAction(result);
                };
            }}
        >
            <label for="title">Title</label>
            <input
                type="text"
                name="title"
                id="title"
                value={data.todo.title}
            />
            <label for="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
                value={data.todo.description}
            />
            <input type="hidden" name="id" value={data.todo.id} />
            <input type="submit" value="Update" />
        </form>
    {/if}
{/if}
