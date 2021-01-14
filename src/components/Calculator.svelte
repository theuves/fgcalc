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
    export let priceSpot
    export let cpuPriceSpot
    export let ramPriceSpot
    export let capacityFargate
    export let capacityFargateSpot

    function formatPrice(value) {
        value = value || 0
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
        padding: 10px 40px;
        background-color: white;
        box-shadow: 1px 1px 1px 1px #ccc;
        border-radius: 2px;
    }
    .actions,
    .result {
        flex: 1;
        margin: 50px 20px;
    }
    .result {
        text-align: center;
        border-left: 1px solid #ccc;
    }
    .price {
        font-size: 3em;
        font-family: 'Roboto Mono', monospace;
    }
    .table {
        width: 80%;
        margin: 0 auto;
        font-family: 'Roboto Mono', monospace;
    }
    .input-container:not(:last-child) {
        margin-bottom: 10px;
    }
    .capacity-input {
        width: 80px;
        margin-right: 10px;
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
            <input type="number" class="capacity-input" min="0" bind:value={capacityFargate}>
            &times; <b>FARGATE</b>
        </div>
        <div class="input-container">
            <input type="number" class="capacity-input" min="0" bind:value={capacityFargateSpot}>
            &times; <b>FARGATE_SPOT</b>
        </div>
    </div>
    <div class="result">
        <h1 class="price">
            {formatPrice((price || 0) + (priceSpot || 0))}
        </h1>
        <table class="table" style="margin-bottom: 20px;">
            <tr>
                <th colspan="3">FARGATE</th>
            </tr>
            <tr>
                <td>
                    <b>vCPU</b>
                </td>
                <td>{formatPrice(cpuPrice)}</td>
                <td>{(cpuPrice / price * 100 || 0).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>
                    <b>GiB</b>
                </td>
                <td>{formatPrice(ramPrice)}</td>
                <td>{(ramPrice / price * 100 || 0).toFixed(2)}%</td>
            </tr>
        </table>
        <table class="table">
            <tr>
                <th colspan="3">FARGATE_SPOT</th>
            </tr>
            <tr>
                <td>
                    <b>vCPU</b>
                </td>
                <td>{formatPrice(cpuPriceSpot)}</td>
                <td>{(cpuPriceSpot / priceSpot * 100 || 0).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>
                    <b>GiB</b>
                </td>
                <td>{formatPrice(ramPriceSpot)}</td>
                <td>{(ramPriceSpot / priceSpot * 100 || 0).toFixed(2)}%</td>
            </tr>
        </table>
    </div>
</div>