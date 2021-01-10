<script>
	import Header from './components/Header.svelte';
	import Calculator from './components/Calculator.svelte';

	let region    = 'us-east-1'
	let currency  = 'USD'
	let cpu       = 0.5
    let ram       = 1
    let timeValue = 1
    let timeType  = 'month'
    let price     = 0
</script>

<style>
	main {
		width: 1200px;
		margin: 0 auto;
	}
</style>

<main>
	<Header
		bind:region={region}
		bind:currency={currency}
	/>
	<Calculator
		bind:cpu={cpu}
		bind:ram={ram}
		bind:timeValue={timeValue}
		bind:timeType={timeType}
		currency={currency}
		price={price}
	/>
</main>