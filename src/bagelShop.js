class BagelShop {
    constructor() {
        this.basket = []
        this.basketCapacity = 5
        this.basketQuantity = 0
        this.inventory = [
            {
                SKU: 'BGLO',
                name: 'bagel',
                variant: 'onion',
                price: 0.49,
                offer: {
                    amount: 6,
                    price: 2.49
                }
            },
            {
                SKU: 'BGLP',
                name: 'bagel',
                variant: 'Plain',
                price: 0.39,
                offer: {
                    amount: 12,
                    price: 3.99
                }
            },
            {
                SKU: 'BGLE',
                name: 'bagel',
                variant: 'Everything',
                price: 0.49,
                offer: {
                    amount: 6,
                    price: 2.49
                }
            },
            {
                SKU: 'COF',
                name: 'coffee',
                variant: null,
                price: 0.99,
                offer: {
                    withBGLP: true,
                    price: 1.25
                }
            }
        ]
    }

    addToBasket(itemToAdd) {
        if (this.basketQuantity + itemToAdd.quantity <= this.basketCapacity) {
            const findSameItem = this.basket.find(item => item.SKU === itemToAdd.SKU)
            if (findSameItem) {
                findSameItem.quantity += itemToAdd.quantity
                this.basketQuantity += itemToAdd.quantity
                return this.basket
            }
            const findInInventory = this.inventory.find(item => item.SKU === itemToAdd.SKU)
            findInInventory.quantity = itemToAdd.quantity
            this.basket.push(findInInventory)
            this.basketQuantity += findInInventory.quantity
            return this.basket
        }
        return "Too many! Basket cannot fit."
    }

    removeFromBasket(itemToRemove) {
        const findSameItem = this.basket.find(item => item.SKU === itemToRemove.SKU)
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
        const findInInventory = this.inventory.find(item => item.SKU === itemToCheck.SKU)
        return findInInventory.price
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