<script>
	import data from './utils/data.js'
	import {afterUpdate} from 'svelte'
	import Header from './components/Header.svelte';
	import Calculator from './components/Calculator.svelte';

	let region    = 'us-east-1'
	let currency  = 'USD'
	let cpu       = 1
    let ram       = 2
    let timeValue = 1
	let timeType  = 'month'
	let isSpot    = false

	let currencyRates = {USD: '1.0'}

	let totalPrice = 0
	let totalPriceCPU
	let totalPriceRAM

	function getTime(value, type) {
		switch (type) {
			case 'hour':
			default:
				return value * 1
			case 'day':
				return value * 24
			case 'month':
				return value * 730
			case 'year':
				return value * 8760
		}
	}

	function updateCurrencyRates() {
		console.info('[INFO] Updated exchange rates.')
		fetch('https://api.exchangeratesapi.io/latest?base=USD')
			.then(response => response.json())
			.then(data => {
				currencyRates = data.rates
			})
	}
	
	const THIRTY_SECONDS = 30000
	updateCurrencyRates()
	setInterval(updateCurrencyRates, THIRTY_SECONDS)

	afterUpdate(() => {
		const {prices} = data.filter(item => item.region === region)[0]
		const time = getTime(timeValue, timeType)

		let {
			cpu: cpuPrice,
			ram: ramPrice,
		} = prices[isSpot ? 'spot' : 'normal']

		cpuPrice = cpuPrice * Number(currencyRates[currency])
		ramPrice = ramPrice * Number(currencyRates[currency])
		
		totalPriceCPU = cpuPrice * cpu * time
		totalPriceRAM = ramPrice * ram * time
		totalPrice = totalPriceCPU + totalPriceRAM
	})
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
		currencyList={Object.keys(currencyRates)}
	/>
	<Calculator
		bind:cpu={cpu}
		bind:ram={ram}
		bind:timeValue={timeValue}
		bind:timeType={timeType}
		bind:isSpot={isSpot}
		currency={currency}
		price={totalPrice}
		cpuPrice={totalPriceCPU}
		ramPrice={totalPriceRAM}
	/>
</main>