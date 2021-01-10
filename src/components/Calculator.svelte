<script>
    import CPU from './ComboBox/CPU.svelte'
    import RAM from './ComboBox/RAM.svelte'
    import TimePicker from './TimePicker.svelte'

    let formattedPrice

    export let cpu
    export let ram
    export let timeValue
    export let timeType
    export let currency
    export let price

    $: {
        formattedPrice = price.toLocaleString('en-US', {
            style: 'currency',
            currency: currency
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
</style>

<div class="calculator">
    <div class="actions">
        <TimePicker bind:value={timeValue} bind:type={timeType} />
        <CPU bind:value={cpu} />
        <RAM bind:value={ram} cpu={cpu} />
    </div>
    <div class="result">
        <h1>
            USD {formattedPrice}
        </h1>
    </div>
</div>