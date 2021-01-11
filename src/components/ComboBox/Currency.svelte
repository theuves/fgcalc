<script>
    export let value = 'USD';
    export let currencyList = ['USD']
</script>

<style>
    select {
        color: #eee;
        border-color: #e76d0c #e15500 #e15500;
        background-color: white;
        background-image: linear-gradient(180deg,#f67c1b 0,#e15500);

        /**
         * TODO: Improve this.
         */
        margin-right: 5px;
    }
    option {
        color: black;
    }
</style>

<select bind:value={value}>
    {#each currencyList as currency}
        <option value={currency}>
            {currency}
        </option>
    {/each}
</select>