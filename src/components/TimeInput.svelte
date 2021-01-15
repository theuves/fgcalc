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
    .container {
        display: flex;
        margin-bottom: var(--margin);
    }
    .input {
        width: 80px;
        margin-right: var(--margin);
    }
    .input:invalid {
        background-color: pink;
    }
    .select {
        flex: 1;
    }
    .input,
    .select {
        margin-bottom: 0 !important;
    }
</style>

<div class="container">
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