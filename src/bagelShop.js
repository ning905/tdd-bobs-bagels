class BagelShop {
    constructor() {
        this.basket = []
        this.basketCapacity = 5
    }

    getCurrentQuantity() {
        let currentQuantity = 0
        for (let i = 0; i < this.basket.length; i++) {
            currentQuantity += this.basket[i].quantity
        }
        return currentQuantity
    }

    addToBasket(itemToAdd) {
        const currentQuantity = this.getCurrentQuantity()
        if (currentQuantity + itemToAdd.quantity <= this.basketCapacity) {
            const findSameItem = this.basket.find(item => item.name === itemToAdd.name)
            if (findSameItem) {
                findSameItem.quantity += itemToAdd.quantity
                return this.basket
            }
            this.basket.push(itemToAdd)
            return this.basket
        }
        return "Basket is full. Cannot add to basket."
    }

    removeFromBasket(itemToRemove) {
        const findSameItem = this.basket.find(item => item.name === itemToRemove.name)
        if (findSameItem) {
            findSameItem.quantity -= itemToRemove.quantity
            return this.basket
        }
        return "Item not found in the basket"
    }

    alterBasketCapacity(newBasketCapacity) {
        this.basketCapacity = newBasketCapacity
        return this.basketCapacity
    }

    checkItemPrice(item) {
        return item.price
    }

    getSumOfItems() {
        let sum = 0
        for (let i = 0; i < this.basket.length; i++) {
            sum += this.basket[i].quantity
        }
        return sum
    }

}

module.exports = BagelShop