class BagelShop
- Properties
  - this.basket:[]
  - this.basketCapacity: 5(@Number)
  - this.basketQuantity: 0(@Number)
  - this.inventory: (item[]), item(@Object), properties: SKU(@String), name(@String), variant(@String), price(@Number), offer(@Object, properties: amount(@Number), price(@Number))


- Method: addToBasket(item)
  - Input: item(@Object), properties: SKU(@String), quantity(@Number)
  - Scenario 1: If adding the new item does not exceed current basket capacity
    - Scenario 1a: If the same item is already in the basket
    - Output 1a: this.basket(@item[], item(@Object), properties: SKU(@String), name(@String), variant(@String), price(@Number), offer(@Object, properties: amount(@Number), withBGLP(@Boolean), price(@Number)), quantity(@Number))
  
    - Scenario 1b: If the same item is not in the basket
    - Output 1b: this.basket(@item[], item(@Object), properties: SKU(@String), name(@String), variant(@String), price(@Number), offer(@Object, properties: amount(@Number), withBGLP(@Boolean), price(@Number)), quantity(@Number))
  
  - Scenario 2: If adding the new item will cause to exceed current basket capacity
  - Output: (@string, "Too many! Basket cannot fit.")



- Method: removeFromBasket(item)
  - Input: item(@Object), properties: SKU(@String), quantity(@Number)
  - Scenario 1: If item to be removed exists in the basket
    - Scenario 1a: If the quantity to be removed is less than the quantity exists
    - Output 1a: this.basket(@item[], item(@Object), properties: SKU(@String), name(@String), variant(@String), price(@Number), offer(@Object, properties: amount(@Number), withBGLP(@Boolean), price(@Number)), quantity(@Number))

    - Scenario 1b: If the quantity to be removed is equal to the quantity exists
    - Output 1b: this.basket(@item[], item(@Object), properties: SKU(@String), name(@String), variant(@String), price(@Number), offer(@Object, properties: amount(@Number), withBGLP(@Boolean), price(@Number)), quantity(@Number))
  
    - Scenario 1c: If the quantity to be removed is more than the quantity exists
    - Output 1c: "Cannot remove more than " + currentQuantity + "!"

  - Scenario 2: If item to be removed exists in the basket
  - Output 2: (@string, "Item not found in the basket")



- Method: alterBasketCapacity(newBasketCapacity)
  - Input: newBasketCapacity(@Number)
  - Output: this.basketCapacity(@Number)



- Method: checkItemPrice(item)
  - Input: item(@Object), properties: SKU(@String)
  - Output: price(@Number)



- Method: getSumOfItems()
  - Input: empty
  - Output: sum(@Number)



- Method: getCostOfItem (item)
  - Input: itemInBasket(@Object), properties: SKU(@String), quantity(@Number)
  - Find item price from the inventory

    - Scenario 1: If the item name is bagel
    - Output 1: cost(@Number)
    
    - Scenario 2: If the item name is coffee
    - Output 2: cost(@Number)



- Method: getTotalCost()
  - Input: empty
  - Calculate the cost of bagels in the basket, add to totalCost

  - Scenario: If there is coffee in the basket

    - Check the quantity of remaining plain bagel in the basket
    - combinedOfferQuantity is equal to the lower number between the quantity of coffee and the quantity of remaining plain bagels
    - Minus the cost of plain bagels with the quantity of combinedOfferQuantity from totalCost
    - Calculate the cost of combinedOfffer, add to totalCost
    - Calculate the cost of remaining coffee, if there is any, add to totalCost

  - Output: totalCost(@Number)