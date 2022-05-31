class BagelShop
- Properties
  - this.basket:[]
  - this.basketCapacity: 5(@Number)

- Method: addToBasket(item)
  - Input: item(@Object), properties: name(@String), price(@Number), quantity(@Number)
  - Scenario 1: If adding the new item does not exceed current basket capacity
    - Scenario 1a: If the same item is already in the basket
    - Output 1a: this.basket(@item[])
    - Scenario 1b: If the same item is not in the basket
    - Output 1b: this.basket(@item[])
  - Scenario 2: If adding the new item will cause to exceed current basket capacity
  - Output: (@string, "Basket is full. Cannot add to basket.")

- Method: removeFromBasket(item)
  - Input: item(@Object), properties: name(@String), price(@Number), quantity(@Number)
  - Scenario 1: If item to be removed exists in the basket
  - Output 1: this.basket(@item[])
  - Scenario 2: If item to be removed exists in the basket
  - Output 2: (@string, "Item not found in the basket")

- Method: alterBasketCapacity(newBasketCapacity)
  - Input: newBasketCapacity(@Number)
  - Output: this.basketCapacity(@Number)

- Method: checkItemPrice(item)
  - Input: item(@Object), properties: name(@String), price(@Number), quantity(@Number)
  - Output: price(@Number)

- Method: getSumOfItems()
  - Input: empty
  - Output: sum(@Number)