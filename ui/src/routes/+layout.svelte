<script>
    import { page } from "$app/stores";
</script>

<nav>
    <li>
        <a href="/">Home</a>
    </li>
    {#if $page.data.user}
        <li>Logged in as {$page.data.user.username}</li>
    {/if}
</nav>
<br />
<slot />

<style>
    li {
        display: inline;
    }
</style>
