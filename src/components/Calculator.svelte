<script>
    import CPU from './ComboBox/CPU.svelte'
    import RAM from './ComboBox/RAM.svelte'
    import TimePicker from './TimePicker.svelte'

    export let cpu
    export let ram
    export let timeValue
    export let timeType
    export let currency
    export let price
    export let cpuPrice
    export let ramPrice
    export let isSpot

    function formatPrice(value) {
        value = value || 0
        // return value.toFixed(3)
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 3
        })
    }
</script>

<style>
    .calculator {
        display: flex;
        width: 900px;
        margin: 0 auto;
    }
    .actions,
    .result {
        flex: 1;
        margin: 50px 20px;
    }
    .result {
        text-align: center;
    }
    .table {
        width: 100%;
    }
</style>

<div class="calculator">
    <div class="actions">
        <TimePicker bind:value={timeValue} bind:type={timeType} />
        <CPU bind:value={cpu} />
        <RAM bind:value={ram} cpu={cpu} />
        <label>
            <input type="checkbox" bind:checked={isSpot} /> Is Fargate Spot?
        </label>
    </div>
    <div class="result">
        <h1>
            {formatPrice(price)}
        </h1>
        <table class="table">
            <tr>
                <td>vCPU</td>
                <td>{formatPrice(cpuPrice)}</td>
                <td>{(cpuPrice / price * 100).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>GiB</td>
                <td>{formatPrice(ramPrice)}</td>
                <td>{(ramPrice / price * 100).toFixed(2)}%</td>
            </tr>
        </table>
    </div>
</div>