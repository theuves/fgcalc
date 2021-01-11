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
    .price {
        font-size: 3.25em;
        font-family: 'Roboto Mono', monospace;
    }
    .table {
        width: 80%;
        margin: 0 auto;
        font-family: 'Roboto Mono', monospace;
    }
    .input-container:not(:last-child) {
        margin-bottom: 15px;
    }
    .label {
        user-select: none;
    }
    .label:hover {
        opacity: .9;;
    }
    .label:active {
        opacity: 1;;
    }
</style>

<div class="calculator">
    <div class="actions">
        <div class="input-container">
            <TimePicker bind:value={timeValue} bind:type={timeType} />
        </div>
        <div class="input-container">
            <CPU bind:value={cpu} />
        </div>
        <div class="input-container">
            <RAM bind:value={ram} cpu={cpu} />
        </div>
        <div class="input-container">
            <label class="label">
                <input type="checkbox" bind:checked={isSpot} /> Is <b>Fargate Spot</b>?
            </label>
        </div>
    </div>
    <div class="result">
        <h1 class="price">
            {formatPrice(price)}
        </h1>
        <table class="table">
            <tr>
                <td>
                    <b>vCPU</b>
                </td>
                <td>{formatPrice(cpuPrice)}</td>
                <td>{(cpuPrice / price * 100).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>
                    <b>GiB</b>
                </td>
                <td>{formatPrice(ramPrice)}</td>
                <td>{(ramPrice / price * 100).toFixed(2)}%</td>
            </tr>
        </table>
    </div>
</div>