import data from './data'
import getTime from './getTime'

export default function getPrices(options) {
    return (capacity, capacityType) => {
        const {prices} = data.filter(item => item.region === options.region)[0]
        const exchangeRate = Number(options.exchangeRate)
        const time = getTime(
            options.time.value,
            options.time.type
        )

        const {
            cpu: cpuPrice,
            ram: ramPrice,
        } = prices[capacityType]

        const priceCPU = capacity * cpuPrice * exchangeRate * options.cpu * time
        const priceRAM = capacity * ramPrice * exchangeRate * options.ram * time

        return {
            total: priceCPU + priceRAM,
            cpu: priceCPU,
            ram: priceRAM,
        }
    }
}