const inventory = require('../inventory.json').inventory

class BagelShop {
    constructor() {
        this.basket = []
        this.basketCapacity = 5
        this.basketQuantity = 0
        this.inventory = inventory
        this.offer = [
            {
                "sku": 'BGLO',
                amount: 6,
                price: 2.49
            },
            {
                "sku": 'BGLP',
                amount: 12,
                price: 3.99
            },
            {
                "sku": 'BGLE',
                amount: 6,
                price: 2.49
            },
            {
                "sku": 'COF',
                amount: undefined,
                price: 1.25
            }
        ]
    }


    addToBasket(itemToAdd) {
        if (this.basketQuantity + itemToAdd.quantity <= this.basketCapacity) {
            const findSameItem = this.basket.find(item => item.sku === itemToAdd.sku)
            if (findSameItem) {
                findSameItem.quantity += itemToAdd.quantity
                this.basketQuantity += itemToAdd.quantity
                return this.basket
            }
            const findInInventory = this.inventory.find(item => item.sku === itemToAdd.sku)
            findInInventory.quantity = itemToAdd.quantity
            this.basket.push(findInInventory)
            this.basketQuantity += findInInventory.quantity
            return this.basket
        }
        return "Too many! Basket cannot fit."
    }

    removeFromBasket(itemToRemove) {
        const findSameItem = this.basket.find(item => item.sku === itemToRemove.sku)
        if (findSameItem) {
            if (findSameItem.quantity > itemToRemove.quantity) {
                findSameItem.quantity -= itemToRemove.quantity
                this.basketQuantity -= itemToRemove.quantity
                return this.basket
            } else if (findSameItem.quantity === itemToRemove.quantity) {
                const index = this.basket.indexOf(findSameItem)
                this.basket.splice(index, 1)
                return this.basket
            } else if (findSameItem.quantity < itemToRemove.quantity) {
                return "Cannot remove more than " + findSameItem.quantity + "!"
            }
        }
        return "Item not found in the basket"
    }

    alterBasketCapacity(newBasketCapacity) {
        this.basketCapacity = newBasketCapacity
        return this.basketCapacity
    }

    checkItemPrice(itemToCheck) {
        const findInInventory = this.inventory.find(item => item.sku === itemToCheck.sku)
        return Number(findInInventory.price)
    }

    getSumOfItems() {
        let sum = 0
        for (let i = 0; i < this.basket.length; i++) {
            sum += this.basket[i].quantity
        }
        return sum
    }

    getCostOfItem(itemToCheck) {
        const findInInventory = this.inventory.find(item => item.sku === itemToCheck.sku)
        const findInOffer = this.offer.find(offer => offer.sku === itemToCheck.sku)
        let cost = 0

        if (findInInventory.name === 'Bagel') {
            const quantityOfOffer = Math.floor(itemToCheck.quantity / findInOffer.amount)
            const offerCost = quantityOfOffer * findInOffer.price
            const remainingBagel = itemToCheck.quantity % findInOffer.amount
            const remainingBagelCost = remainingBagel * Number(findInInventory.price)
            cost = offerCost + remainingBagelCost
        } else if (findInInventory.name === 'Coffee') {
            cost = Number(findInInventory.price) * itemToCheck.quantity
        }
        return Number(cost.toFixed(2))
    }

    getTotalCost() {
        let totalCost = 0

        const bagels = this.basket.filter(item => item.name === 'Bagel')
        for (let i = 0; i < bagels.length; i++) {
            const cost = this.getCostOfItem(bagels[i])
            totalCost += cost
        }

        const coffeeInBasket = this.basket.find(item => item.name === 'Coffee')
        if (coffeeInBasket) {
            const coffeeCost = coffeeInBasket.quantity * Number(coffeeInBasket.price)
            totalCost += coffeeCost

            const combinedOfferSave = this.getCombinedOffer().save
            totalCost -= combinedOfferSave
        }
        return Number(totalCost.toFixed(2))
    }

    getCombinedOffer() {
        const coffeeInBasket = this.basket.find(item => item.name === 'Coffee')
        const coffeeInOffer = this.offer.find(item => item.sku === 'COF')

        if (coffeeInBasket) {
            const plainInBasket = this.basket.find(item => item.sku === 'BGLP')
            const plainInOffer = this.offer.find(item => item.sku === 'BGLP')
            const singlePlains = plainInBasket.quantity % plainInOffer.amount

            let combinedOffer = coffeeInBasket.quantity
            if (singlePlains < coffeeInBasket.quantity) {
                combinedOffer = singlePlains
            }

            const combinedOfferSave = combinedOffer * (Number(coffeeInBasket.price) + Number(plainInBasket.price) - coffeeInOffer.price)
            return { amount: combinedOffer, save: combinedOfferSave }
        }
    }

    getReceipt() {
        const header = "    ~~~ Bob's Bagels ~~~ \n\n"
        const date = (new Date()).toLocaleString() + '\n\n'
        const divider = '---------------------------- \n\n'
        const totalCost = this.getTotalCost()
        const combinedOffer = this.getCombinedOffer().amount
        const combinedOfferSave = this.getCombinedOffer().save.toFixed(2)
        const combinedOfferPrice = this.offer.find(item => item.sku === 'COF').price

        let receipt = header + date + divider
        let savedInTotal = 0

        for (let i = 0; i < this.basket.length; i++) {
            const thisItem = this.basket[i]
            if (combinedOffer > 0 && (thisItem.sku === 'BGLP' || thisItem.sku === 'COF')) {
                thisItem.quantity -= combinedOffer
            }
            const thisCost = this.getCostOfItem(thisItem)

            let savedOnThis = Number((thisItem.quantity * Number(thisItem.price) - thisCost).toFixed(2))
            savedInTotal += savedOnThis
            if (savedOnThis === 0) {
                savedOnThis = ''
            } else {
                savedOnThis = `(-${savedOnThis})`
            }

            if (thisItem.quantity !== 0 && thisItem.sku !== 'COF') {
                receipt += `${thisItem.variant} ${thisItem.name}     ${thisItem.quantity}    ${thisCost} \n                       ${savedOnThis} \n`
            } else if (thisItem.quantity !== 0 && thisItem.sku === 'COF') {
                receipt += `${thisItem.name}          ${thisItem.quantity}         ${thisCost} \n                       ${savedOnThis} \n`
            }
        }

        if (combinedOffer > 0) {
            receipt += `Coffee & Plain Bagel     ${combinedOffer}    ${combinedOffer * combinedOfferPrice} \n                       (-${combinedOfferSave}) \n`
        }

        receipt += divider + 'Total          ' + totalCost + `\n\nYou saved a total of £${savedInTotal} \non this shop\n` + '\nThank you\nfor your order!'
        return receipt
    }
}

const bagelShop = new BagelShop()
bagelShop.alterBasketCapacity(50)
const onion = { "sku": 'BGLO', "quantity": 2 }
bagelShop.addToBasket(onion)
const plain = { "sku": 'BGLP', "quantity": 16 }
bagelShop.addToBasket(plain)
const everything = { "sku": 'BGLE', "quantity": 6 }
bagelShop.addToBasket(everything)
const coffee = { "sku": 'COF', "quantity": 5 }
bagelShop.addToBasket(coffee)
const receipt = bagelShop.getReceipt()
console.log('receipt', receipt)


module.exports = BagelShop