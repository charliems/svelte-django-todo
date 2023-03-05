<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";
    import type { ActionData, PageData } from "./$types";

    export let data: PageData;
    export let form: ActionData;
    let edit = $page.url.searchParams.get('edit') === 'true';
</script>

{#if data.todo}
    {#if !edit}
        <h1>{data.todo.title}</h1>
        <p>{data.todo.description}</p>
        <a href="?edit=true" on:click|preventDefault={() => (edit = true)}>Edit</a>
    {:else}
        {#if form?.error?.message}
            <p>{form.error.message}</p>
        {/if}
        <form
            action="?/update"
            method="post"
            use:enhance={() => {
                return async ({ result }) => {
                    if (result.type === "success") {
                        edit = false;
                        invalidateAll();
                        applyAction(result);
                    } else {
                        applyAction(result);
                    }
                };
            }}
        >
            {#if form?.validation?.title}
                <p>{form.validation.title}</p>
            {/if}
            {#if form?.errors?.title}
                <p>{form.errors.title}</p>
            {/if}
            <label for="title">Title</label>
            <input
                type="text"
                name="title"
                id="title"
                value={data.todo.title}
            />

            <br />
            {#if form?.validation?.description}
                <p>{form.validation.description}</p>
            {/if}
            {#if form?.errors?.description}
                <p>{form.errors.description}</p>
            {/if}
            <label for="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
                value={data.todo.description}
            />
            <input type="submit" value="Update" />
        </form>
    {/if}
{/if}
