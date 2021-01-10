<script>
    import Region from './ComboBox/Region.svelte'
    import Currency from './ComboBox/Currency.svelte'

    export let region
    export let currency
</script>

<style>
    .header {
        padding: 15px 10px;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        border-bottom: solid 1px gray;
    }
    .title {
        margin: 0;
        padding: 0;
        line-height: 100%;
    }
</style>

<header class="header">
    <div>
        <h1 class="title">
            FGCalc
        </h1>
    </div>
    <div>
        <Currency bind:value={currency} />
        <Region bind:value={region} />
    </div>
</header>
