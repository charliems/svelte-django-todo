<script lang="ts">
    import type { LayoutData } from "./$types";
    export let data: LayoutData;
</script>

<div class="content">
<aside>
    <h2>Todos</h2>
    <ul>
        {#each data.todos as todo (todo.id)}
            <li>
                <a href="/{todo.id}">{todo.title}</a>
            </li>
        {/each}
    </ul>
</aside>

<main>
    <slot />
</main>
</div>

<style>
    .content {
        display: flex;
    }

    aside {
        background-color: bisque;
        padding: 0 1rem 1rem 1rem;
    }

    main {
        padding: 0 0 0 2rem;
    }
</style>