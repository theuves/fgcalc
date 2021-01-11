<script>
    import data from '../../utils/data.js'

    export let value

    const regions = data.map(value => ({
        name: value.region,
        description: value.description
    }))
</script>

<style>
    select {
        color: #eee;
        border-color: #e76d0c #e15500 #e15500;
        background-color: white;
        background-image: linear-gradient(180deg,#f67c1b 0,#e15500);
    }
    option {
        color: black;
    }
</style>

<select bind:value={value}>
    {#each regions as region}
        <option value={region.name}>
            {region.description}
        </option>
    {/each}
</select>