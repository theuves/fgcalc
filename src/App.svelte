<script>
	// Svelte
	import {afterUpdate, onMount} from 'svelte'

	// Utils
	import createPriceGetter from './utils/createPriceGetter'
	import getExchangeRates from './utils/getExchangeRates'
	import formatPrice from './utils/formatPrice'

	// Components
	import Header from './components/Header/Header.svelte';
	import TimeInput from './components/TimeInput.svelte'
	import CPUInput from './components/CPUInput.svelte'
	import RAMInput from './components/RAMInput.svelte'
	import CapacityInput from './components/CapacityInput.svelte'
	import Table from './components/Table.svelte'

	// Header inputs
	let region = 'us-east-1'
	let currency = 'USD'

	// Form inputs
	let cpu = 1
    let ram = 2
    let timeValue = 1
	let timeType = 'month'
	let capacityFargate = 1
	let capacityFargateSpot = 0

	let currencyRates = {USD: '1.0'}

	let prices = {
		total: 0,
		fargatePrice: {
			total: 0,
			cpu: 0,
			ram: 0,
		},
		fargateSpotPrice: {
			total: 0,
			cpu: 0,
			ram: 0,
		},
	}

	function updateCurrencyRates() {
		getExchangeRates().then(rates => {
			console.info('[INFO] Updated exchange rates.')
			currencyRates = rates
		})
	}

	onMount(() => {
		const onMinute = 1 * 60 * 1000
		updateCurrencyRates()
		setInterval(updateCurrencyRates, onMinute)
	})

	afterUpdate(() => {
		const getPrices = createPriceGetter({
			region,
			time: {
				value: timeValue,
				type: timeType
			},
			exchangeRate: currencyRates[currency],
			cpu,
			ram,
		})

		const fargatePrice = getPrices(capacityFargate, 'FARGATE')
		const fargateSpotPrice = getPrices(capacityFargateSpot, 'FARGATE_SPOT')

		prices = {
			total: fargatePrice.total + fargateSpotPrice.total,
			fargatePrice,
			fargateSpotPrice,
		}
	})
</script>

<style>
	.main {
		margin: 0 auto;
	}
	.main {
		display: flex;
        width: 900px;
        margin: 0 auto;
        padding: 10px 40px;
        background-color: white;
        box-shadow: 1px 1px 1px 1px #ccc;
        border-radius: 2px;
	}
	.main > * {
		flex: 1;
        margin: 50px 20px;
	}
	.estimate {
		text-align: center;
	}
	.estimate-price {
		font-size: 3em;
        font-family: 'Roboto Mono', monospace;
	}
</style>

<div class="container">
	<Header
		bind:region={region}
		bind:currency={currency}
		currencyList={Object.keys(currencyRates)}
	/>
	<main class="main">
		<form class="form">
			<TimeInput bind:value={timeValue} bind:type={timeType} />
			<CPUInput bind:value={cpu} />
			<RAMInput bind:value={ram} cpu={cpu} />
			<CapacityInput value={1} name="FARGATE" />
			<CapacityInput value={0} name="FARGATE_SPOT" />
		</form>
		<div class="estimate">
			<h1 class="estimate-price">
				{formatPrice(prices.total, currency)}
			</h1>
			<Table
				name="FARGATE"
				currency={currency}
				cpu={prices.fargatePrice.cpu}
				ram={prices.fargatePrice.ram}
				total={prices.total}
			/>
			<Table
				name="FARGATE_SPOT"
				currency={currency}
				cpu={prices.fargateSpotPrice.cpu}
				ram={prices.fargateSpotPrice.ram}
				total={prices.total}
			/>
		</div>
	</main>
</div>