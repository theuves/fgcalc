<script>
    export let cpu
    export let value

    let values

    $: {
       values = getValues(cpu)
    }

    /**
     * @example
     * getRange(3, 6)
     * // [3, 4, 5, 6]
     */
    function getRange(start, end) {
        return Array(end - start + 1)
            .fill(start)
            .map((item, index) => item + index)
    }

    function getValues(currentCPU) {
        const possibleRAMValues = {
            '0.25': [
                0.5,
                1,
                2,
            ],
            '0.5': getRange(1, 4),
            '1': getRange(2, 8),
            '2': getRange(4, 16),
            '4': getRange(8, 30),
        }

        return currentCPU in possibleRAMValues
            ? possibleRAMValues[currentCPU]
            : possibleRAMValues[Object.keys(possibleRAMValues)[0]]
    }
</script>

<style>
    select {
        width: 100%;
    }
</style>

<select bind:value={value}>
    {#each values as value}
        <option value={value}>
            {value} GiB
        </option>
    {/each}
</select>