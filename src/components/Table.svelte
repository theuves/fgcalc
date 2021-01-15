<script>
    import formatPrice from '../utils/formatPrice.js'

    export let name
    export let cpu
    export let ram
    export let total
    export let currency
</script>

<style>
    .table {
        width: 80%;
        margin: 0 auto;
        font-family: 'Roboto Mono', monospace;
    }
    .table:not(:last-child) {
        margin-bottom: var(--margin);
    }
</style>

<table class="table">
    <tr>
        <th colspan="3">{name}</th>
    </tr>
    <tr>
        <td>
            <b>vCPU</b>
        </td>
        <td>{formatPrice(cpu, currency)}</td>
        <td>{(cpu / total * 100 || 0).toFixed(2)}%</td>
    </tr>
    <tr>
        <td>
            <b>GiB</b>
        </td>
        <td>{formatPrice(ram, currency)}</td>
        <td>{(ram / total * 100 || 0).toFixed(2)}%</td>
    </tr>
</table>