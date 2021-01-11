<script>
    export let value = 'USD';
    export let currencyList = ['USD']
</script>

<select bind:value={value}>
    {#each currencyList as currency}
        <option value={currency}>
            {currency}
        </option>
    {/each}
</select>