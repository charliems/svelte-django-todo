<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    export let form: ActionData;
</script>

{#if form?.errors?.non_field_errors}
    <p>{form.errors.non_field_errors}</p>
{/if}
<form method="post" use:enhance>
    {#if form?.errors?.email}
        <p>{form.errors.email}</p>
    {/if}
    <label for="username">Email</label>
    <input type="text" name="email" id="email" required />
    {#if form?.errors?.password}
        <p>{form.errors.password}</p>
    {/if}
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required />
    <button type="submit">Login</button>
</form>
