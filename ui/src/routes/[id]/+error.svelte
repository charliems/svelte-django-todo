<script>
    import { page } from "$app/stores";
</script>

<h1>Error</h1>
{#if $page.error}
    <h2>{$page.status}: {$page.error.message}</h2>
{/if}
