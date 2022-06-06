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
        const coffeeInOffer = this.offer.find(item => item.sku === 'COF')
        if (coffeeInBasket) {
            const coffeeCost = coffeeInBasket.quantity * Number(coffeeInBasket.price)
            totalCost += coffeeCost

            const plainInBasket = this.basket.find(item => item.sku === 'BGLP')
            const plainInOffer = this.offer.find(item => item.sku === 'BGLP')
            const singlePlains = plainInBasket.quantity % plainInOffer.amount

            let combinedOffer = coffeeInBasket.quantity
            if (singlePlains < coffeeInBasket.quantity) {
                combinedOffer = singlePlains
            }
            const combinedOfferSave = combinedOffer * (Number(coffeeInBasket.price) + Number(plainInBasket.price) - coffeeInOffer.price)
            totalCost -= combinedOfferSave
        }
        return Number(totalCost.toFixed(2))
    }

}

module.exports = BagelShop