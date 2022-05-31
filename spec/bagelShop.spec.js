const BagelShop = require('../src/bagelShop.js')

describe("BagelShop", () => {
    it("adds 2 onion bagels to the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const onion = { SKU: 'BGLO', quantity: 2 }
        const expected = [{
            SKU: 'BGLO',
            name: 'bagel',
            variant: 'onion',
            price: 0.49,
            offer: {
                amount: 6,
                price: 2.49
            },
            quantity: 2
        }]
        // execute
        const result = bagelShop.addToBasket(onion)
        //verify
        expect(result).toEqual(expected)
    })

    it("cannot add 3 onion bagels and 3 plain bagels to the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const onion = { SKU: 'BGLO', quantity: 3 }
        bagelShop.addToBasket(onion)
        const plain = { SKU: 'BGLP', quantity: 3 }
        const expected = "Too many! Basket cannot fit."
        // execute
        const result = bagelShop.addToBasket(plain)
        //verify
        expect(result).toEqual(expected)
    })

    it("adds 1 more onion bagel after adding 3 onion bagels to the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const onion = { SKU: 'BGLO', quantity: 3 }
        bagelShop.addToBasket(onion)
        const moreOnion = { SKU: 'BGLO', quantity: 1 }
        const expected = [{
            SKU: 'BGLO',
            name: 'bagel',
            variant: 'onion',
            price: 0.49,
            offer: {
                amount: 6,
                price: 2.49
            },
            quantity: 4
        }]
        // execute
        const result = bagelShop.addToBasket(moreOnion)
        //verify
        expect(result).toEqual(expected)
    })

    it("cannot add 3 more onion bagels after adding 3 onion bagels to the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const onion = { SKU: 'BGLO', quantity: 3 }
        bagelShop.addToBasket(onion)
        const moreOnion = { SKU: 'BGLO', quantity: 3 }
        const expected = "Too many! Basket cannot fit."
        // execute
        const result = bagelShop.addToBasket(moreOnion)
        //verify
        expect(result).toEqual(expected)
    })

    it("removes 1 onion bagel from the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const onion = { SKU: 'BGLO', quantity: 2 }
        bagelShop.addToBasket(onion)
        const onionToRemove = { SKU: 'BGLO', quantity: 1 }
        const expected = [{
            SKU: 'BGLO',
            name: 'bagel',
            variant: 'onion',
            price: 0.49,
            offer: {
                amount: 6,
                price: 2.49
            },
            quantity: 1
        }]
        // execute
        const result = bagelShop.removeFromBasket(onionToRemove)
        //verify
        expect(result).toEqual(expected)
    })

    it("removes all onion bagel from the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const onion = { SKU: 'BGLO', quantity: 2 }
        bagelShop.addToBasket(onion)
        const onionToRemove = { SKU: 'BGLO', quantity: 2 }
        const expected = []
        // execute
        const result = bagelShop.removeFromBasket(onionToRemove)
        //verify
        expect(result).toEqual(expected)
    })

    it("cannot remove 3 onion bagel when there are only 2 onion bagels in the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const onion = { SKU: 'BGLO', quantity: 2 }
        bagelShop.addToBasket(onion)
        const onionToRemove = { SKU: 'BGLO', quantity: 3 }
        const expected = "Cannot remove more than 2!"
        // execute
        const result = bagelShop.removeFromBasket(onionToRemove)
        //verify
        expect(result).toEqual(expected)
    })

    it("cannot remove 1 plain bagel from the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const onion = { SKU: 'BGLO', quantity: 2 }
        bagelShop.addToBasket(onion)
        const plain = { SKU: 'BGLP', quantity: 1 }
        const expected = "Item not found in the basket"
        // execute
        const result = bagelShop.removeFromBasket(plain)
        //verify
        expect(result).toEqual(expected)
    })

    it("increases basket capacity to 8", () => {
        // set up
        const bagelShop = new BagelShop()
        bagelShop.alterBasketCapacity(8)
        // execute
        const result = bagelShop.basketCapacity
        //verify
        expect(result).toEqual(8)
    })

    it("decreases basket capacity to 3", () => {
        // set up
        const bagelShop = new BagelShop()
        bagelShop.alterBasketCapacity(3)
        // execute
        const result = bagelShop.basketCapacity
        //verify
        expect(result).toEqual(3)
    })

    it("checks the price of a onion bagel", () => {
        // set up
        const bagelShop = new BagelShop()
        const onion = { SKU: 'BGLO' }
        const expected = 0.49
        // execute
        const result = bagelShop.checkItemPrice(onion)
        // verify
        expect(result).toEqual(expected)
    })

    it("calculates the sum of 3 onion bagels and 3 plain bagels", () => {
        // set up
        const bagelShop = new BagelShop()
        bagelShop.alterBasketCapacity(8)
        const onion = { SKU: 'BGLO', quantity: 3 }
        bagelShop.addToBasket(onion)
        const plain = { SKU: 'BGLP', quantity: 3 }
        bagelShop.addToBasket(plain)
        const expected = 6
        // execute
        const result = bagelShop.getSumOfItems()
        //verify
        expect(result).toEqual(expected)
    })
})