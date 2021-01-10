<script>
    import data from '../../utils/data.js'

    export let value

    const regions = data.map(value => ({
        name: value.region,
        description: value.description
    }))
</script>

<select bind:value={value}>
    {#each regions as region}
        <option value={region.name}>
            {region.description}
        </option>
    {/each}
</select>