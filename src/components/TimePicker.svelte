<script>
    export let value
    export let type

    function pluralize(word, count) {
        return count > 1
            ? word + 's'
            : word
    }
</script>

<style>
    .main {
        display: flex;
    }
    .input {
        width: 80px;
        margin-right: 10px;
    }
    .select {
        flex: 1;
    }
</style>

<div class="main">
    <input class="input" type="number" bind:value={value} min="1" />
    <select class="select" bind:value={type}>
        <option value="hour">
            {pluralize('hour', value)}
        </option>
        <option value="day">
            {pluralize('day', value)}
        </option>
        <option value="month">
            {pluralize('month', value)}
        </option>
        <option value="year">
            {pluralize('year', value)}
        </option>
    </select>
</div>