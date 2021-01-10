<script>
    export let value = 'USD';

    const values = [
        'USD'
    ]
</script>

<select bind:value={value}>
    {#each values as value}
        <option value={value}>
            {value}
        </option>
    {/each}
</select>