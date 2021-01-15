<script>
    export let name
    export let value

    const randomCode = (Math.random()).toString(16).substring(2)
</script>

<style>
    .container {
        display: flex;
        margin-bottom: var(--margin);
        align-items: center;
    }
    .input {
        width: 80px;
        margin-right: var(--margin);
        margin-bottom: 0;
    }
    .label {
        font-weight: bold;
    }
    .label::before {
        content: "\00D7"; /* Same "&times;". */
        margin-right: var(--margin);
        font-weight: lighter;
    }
</style>

<div class="container">
    <input
        id={'input-' + randomCode}
        class="input"
        type="number"
        min="0"
        bind:value={value}
    />
    <label class="label" for={'input-' + randomCode}>
        {name}
    </label>
</div>