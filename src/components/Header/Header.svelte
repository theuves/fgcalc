<script>
    import RegionInput from './RegionInput.svelte'
    import CurrencyInput from './CurrencyInput.svelte'

    export let region
    export let currency
    export let currencyList
</script>

<style>
    .header {
        padding: 15px 10px;
        background-color: #232f3e;
        box-shadow: 0px 2px 5px -2px #333;
        margin-bottom: 40px;
    }
    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-between;
    }
    .title {
        margin: 0;
        margin-bottom: 5px;
        padding: 0;
        line-height: 100%;
        font-weight: lighter;
        color: white;
    }
</style>

<header class="header">
    <div class="container">
        <div>
            <h1 class="title">
                AWS Fargate Pricing Calculator
            </h1>
        </div>
        <div>
            <CurrencyInput bind:value={currency} currencyList={currencyList} />
            <RegionInput bind:value={region} />
        </div>
    </div>
</header>
