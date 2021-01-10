<script>
    const values = [
        0.25,
        0.5,
        1,
        2,
        4,
    ]
</script>

<select>
    {#each values as value}
        <option value={value}>
            {value} vCPU
        </option>
    {/each}
</select>