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

	let capacityFargate      = 1
	let capacityFargateSpot  = 0

	let currencyRates = {USD: '1.0'}

	let totalPrice
	let totalPriceCPU
	let totalPriceRAM
	let totalPriceSpot
	let totalPriceCPUSpot
	let totalPriceRAMSpot

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

	const getPrices = (capacity) => {
		const {prices} = data.filter(item => item.region === region)[0]
		const time = getTime(timeValue, timeType)

		let {
			cpu: cpuPrice,
			ram: ramPrice,
		} = prices[capacity]

		cpuPrice = cpuPrice * Number(currencyRates[currency])
		ramPrice = ramPrice * Number(currencyRates[currency])
		
		return {
			cpu: cpuPrice * cpu * time,
			ram: ramPrice * ram * time
		}
	}

	afterUpdate(() => {
		const prices = getPrices('normal')
		const pricesSpot = getPrices('spot')

		totalPrice        = capacityFargate * (prices.cpu + prices.ram)
		totalPriceCPU     = capacityFargate * prices.cpu
		totalPriceRAM     = capacityFargate * prices.ram
		totalPriceSpot    = capacityFargateSpot * (pricesSpot.cpu + pricesSpot.ram)
		totalPriceCPUSpot = capacityFargateSpot * pricesSpot.cpu
		totalPriceRAMSpot = capacityFargateSpot * pricesSpot.ram
	})
</script>

<style>
	main {
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
		bind:capacityFargate={capacityFargate}
		bind:capacityFargateSpot={capacityFargateSpot}
		currency={currency}
		price={totalPrice}
		cpuPrice={totalPriceCPU}
		ramPrice={totalPriceRAM}
		priceSpot={totalPriceSpot}
		cpuPriceSpot={totalPriceCPUSpot}
		ramPriceSpot={totalPriceRAMSpot}
	/>
</main>