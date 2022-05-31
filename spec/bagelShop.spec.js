const BagelShop = require('../src/bagelShop.js')

describe("BagelShop", () => {
    it("adds 2 blueberry bagels to the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const blueberry = { name: 'blueberry bagel', price: 2, quantity: 2 }
        const expected = [{ name: 'blueberry bagel', price: 1, quantity: 2 }]
        // execute
        const result = bagelShop.addToBasket(blueberry)
        //verify
        expect(result).toEqual(expected)
    })

    it("cannot add 3 blueberry bagels and 3 salt bagels to the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const blueberry = { name: 'blueberry bagel', price: 2, quantity: 3 }
        bagelShop.addToBasket(blueberry)
        const salt = { name: 'salt bagel', price: 1, quantity: 3 }
        const expected = "Basket is full. Cannot add to basket."
        // execute
        const result = bagelShop.addToBasket(salt)
        //verify
        expect(result).toEqual(expected)
    })

    it("adds 1 more blueberry bagel after adding 3 blueberry bagels to the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const blueberry = { name: 'blueberry bagel', price: 2, quantity: 3 }
        bagelShop.addToBasket(blueberry)
        blueberry.quantity = 1
        const expected = [{ name: 'blueberry bagel', price: 2, quantity: 4 }]
        // execute
        const result = bagelShop.addToBasket(blueberry)
        //verify
        expect(result).toEqual(expected)
    })

    it("cannot add 3 more blueberry bagels after adding 3 blueberry bagels to the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const blueberry = { name: 'blueberry bagel', price: 2, quantity: 3 }
        bagelShop.addToBasket(blueberry)
        blueberry.quantity = 3
        const expected = "Basket is full. Cannot add to basket."
        // execute
        const result = bagelShop.addToBasket(blueberry)
        //verify
        expect(result).toEqual(expected)
    })

    it("removes 1 blueberry bagel from the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const blueberry = { name: 'blueberry bagel', price: 2, quantity: 2 }
        bagelShop.addToBasket(blueberry)
        blueberry.quantity = 1
        const expected = [{ name: 'blueberry bagel', price: 1, quantity: 1 }]
        // execute
        const result = bagelShop.removeFromBasket(blueberry)
        //verify
        expect(result).toEqual(expected)
    })

    it("cannot remove 1 salt bagel from the basket", () => {
        // set up
        const bagelShop = new BagelShop()
        const blueberry = { name: 'blueberry bagel', price: 2, quantity: 2 }
        bagelShop.addToBasket(blueberry)
        const salt = { name: 'salt bagel', price: 1, quantity: 1 }
        const expected = "Item not found in the basket"
        // execute
        const result = bagelShop.removeFromBasket(salt)
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

    it("checks the price of a blueberry bagel", () => {
        // set up
        const bagelShop = new BagelShop()
        const blueberry = { name: 'blueberry bagel', price: 2, quantity: 2 }
        const expected = 2
        // execute
        const result = bagelShop.checkItemPrice(blueberry)
        // verify
        expect(result).toEqual(expected)
    })

    it("calculates the total price of 3 blueberry bagels and 3 salt bagels", () => {
        // set up
        const bagelShop = new BagelShop()
        bagelShop.alterBasketCapacity(8)
        const blueberry = { name: 'blueberry bagel', price: 2, quantity: 3 }
        bagelShop.addToBasket(blueberry)
        const salt = { name: 'salt bagel', price: 1, quantity: 3 }
        bagelShop.addToBasket(salt)
        const expected = 9
        // execute
        const result = bagelShop.getTotalPrice
        //verify
        expect(result).toEqual(expected)
    })
})