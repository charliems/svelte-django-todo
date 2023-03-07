<script lang="ts">
    import { fly } from "svelte/transition";
    import type { ActionData, PageData } from "./$types";
    import CreateTodo from "./CreateTodo.svelte";
    import TodoItem from "./TodoItem.svelte";

    export let data: PageData;
    export let form: ActionData;
</script>

<CreateTodo form={form} />

<ul>
    {#each data.todos as todo (todo.id)}
        <TodoItem todo={todo} />
    {/each}
    {#if data.todos.length === 0}
        <li class="todo" in:fly={{ y: 20 }} out:fly|local={{ x: 20 }}>
            <p>No more todos left!</p>
        </li>
    {/if}
</ul>
