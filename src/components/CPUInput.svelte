<script>
    export let value

    const values = [
        0.25,
        0.5,
        1,
        2,
        4,
    ]
</script>

<style>
    .select {
        width: 100%;
        margin-bottom: var(--margin);
    }
</style>

<select class="select" bind:value={value}>
    {#each values as value}
        <option value={value}>
            {value} vCPU
        </option>
    {/each}
</select>