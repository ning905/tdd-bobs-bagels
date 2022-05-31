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

    it("calculates the cost of 2 onion bagels", () => {
        // set up
        const bagelShop = new BagelShop()
        const onion = { SKU: 'BGLO', quantity: 2 }
        const expected = 0.98
        // execute
        const result = bagelShop.getCostOfItem(onion)
        //verify
        expect(result).toEqual(expected)
    })


    it("calculates the cost of 12 Plain bagels", () => {
        // set up
        const bagelShop = new BagelShop()
        bagelShop.alterBasketCapacity(20)
        const plain = { SKU: 'BGLP', quantity: 12 }
        const expected = 3.99
        // execute
        const result = bagelShop.getCostOfItem(plain)
        //verify
        expect(result).toEqual(expected)
    })

    it("calculates the cost of 16 Plain bagels", () => {
        // set up
        const bagelShop = new BagelShop()
        bagelShop.alterBasketCapacity(20)
        const plain = { SKU: 'BGLP', quantity: 16 }
        const expected = 5.55
        // execute
        const result = bagelShop.getCostOfItem(plain)
        //verify
        expect(result).toEqual(expected)
    })

    it("calculates the cost of 3 coffees", () => {
        // set up
        const bagelShop = new BagelShop()
        const coffee = { SKU: 'COF', quantity: 3 }
        const expected = 2.97
        // execute
        const result = bagelShop.getCostOfItem(coffee)
        //verify
        expect(result).toEqual(expected)
    })

    it("calculates the cost of 2 onion bagels and 12 Plain bagels", () => {
        // set up
        const bagelShop = new BagelShop()
        bagelShop.alterBasketCapacity(20)
        const onion = { SKU: 'BGLO', quantity: 2 }
        bagelShop.addToBasket(onion)
        const plain = { SKU: 'BGLP', quantity: 12 }
        bagelShop.addToBasket(plain)
        const expected = 4.97
        // execute
        const result = bagelShop.getTotalCost()
        //verify
        expect(result).toEqual(expected)
    })

    it("calculates the cost of 2 onion bagels, 12 Plain bagels, 6 everything bagels and 3 coffees", () => {
        // set up
        const bagelShop = new BagelShop()
        bagelShop.alterBasketCapacity(50)
        const onion = { SKU: 'BGLO', quantity: 2 }
        bagelShop.addToBasket(onion)
        const plain = { SKU: 'BGLP', quantity: 12 }
        bagelShop.addToBasket(plain)
        const everything = { SKU: 'BGLE', quantity: 6 }
        bagelShop.addToBasket(everything)
        const coffee = { SKU: 'COF', quantity: 3 }
        bagelShop.addToBasket(coffee)
        const expected = 10.43
        // execute
        const result = bagelShop.getTotalCost()
        //verify
        expect(result).toEqual(expected)
    })

    it("calculates the cost of 2 onion bagels, 14 Plain bagels, 6 everything bagels and 3 coffees", () => {
        // set up
        const bagelShop = new BagelShop()
        bagelShop.alterBasketCapacity(50)
        const onion = { SKU: 'BGLO', quantity: 2 }
        bagelShop.addToBasket(onion)
        const plain = { SKU: 'BGLP', quantity: 14 }
        bagelShop.addToBasket(plain)
        const everything = { SKU: 'BGLE', quantity: 6 }
        bagelShop.addToBasket(everything)
        const coffee = { SKU: 'COF', quantity: 3 }
        bagelShop.addToBasket(coffee)
        const expected = 10.95
        // execute
        const result = bagelShop.getTotalCost()
        //verify
        expect(result).toEqual(expected)
    })

    it("calculates the cost of 2 onion bagels, 16 Plain bagels, 6 everything bagels and 3 coffees", () => {
        // set up
        const bagelShop = new BagelShop()
        bagelShop.alterBasketCapacity(50)
        const onion = { SKU: 'BGLO', quantity: 2 }
        bagelShop.addToBasket(onion)
        const plain = { SKU: 'BGLP', quantity: 16 }
        bagelShop.addToBasket(plain)
        const everything = { SKU: 'BGLE', quantity: 6 }
        bagelShop.addToBasket(everything)
        const coffee = { SKU: 'COF', quantity: 3 }
        bagelShop.addToBasket(coffee)
        const expected = 11.60
        // execute
        const result = bagelShop.getTotalCost()
        //verify
        expect(result).toEqual(expected)
    })
})