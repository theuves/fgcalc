<script>
    import data from '../../utils/data.js'

    const regions = data.map(value => ({
        name: value.region,
        description: value.description
    }))
</script>

<select>
    {#each regions as region}
        <option value={region.name}>
            {region.description}
        </option>
    {/each}
</select>