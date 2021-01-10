<script>
    const values = [
        'USD'
    ]
</script>

<select>
    {#each values as value}
        <option value={value}>
            {value}
        </option>
    {/each}
</select>