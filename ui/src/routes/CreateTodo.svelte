<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

{#if form?.error?.message}
    <p>{form.error.message}</p>
{/if}
<form action="?/create" method="post" use:enhance>
    {#if form?.validation?.title}
        <p>{form.validation.title}</p>
    {/if}
    {#if form?.errors?.title}
        {#each form.errors.title as error}
            <p>{error}</p>
        {/each}
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
