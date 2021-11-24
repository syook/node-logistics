# node-logistics

Problem Statement

 - I own a logistics company that has vehicles to deliver orders. Each order is given a
number starting at 0001 and increasing but not reusable. 
 - I want to create an automated logistics management system that allows me to add vehicles, items, orders, customers.
 - When the order is placed in my warehouse, I want to have the order issued to the customer with a price. 

 - The ordering process includes:
    - Checking the availability of the fleet of vehicles.
    - Documenting the order number.
    - Creating the customer record if they do not already exist in the system and allocating the vehicle to the said order using its registration number (number plate) before actually creating the order.
    - Creating the order with price and delivery location.




Collections required:

Items
schema:
 - name
 - price

Customers
schema:
 - name
 - city

DeliveryVehicles
schema:
 - registrationNumber: unique, alphanumeric
 - vehicleType: enum(bike,truck)
 - city (location serving)
 - activeOrdersCount (default zero, max two) // make sure the value is not updated/set in create & update API





Order

schema:
 - orderNumber: incremental & unique starting from 0001 (mongoose pre hooks)
 - itemId - foreign key
 - price - price stored in item at the time of creation
 - customerId - foreign key
 - deliveryVehicleId - foreign key
 - isDelivered - default false, once delivered change this to true & decrement delivery vehicles activeOrdersCount field

           

Functionality Flow:
  - Create, read, update API for the items.
  - Create, read, update for delivery vehicles. // activeOrdersCount should be sanitized
  - Create orders for the items & assign the order to the delivery vehicle, assign the delivery vehicle by matching delivery vehicle city & customer city. If no match can't place an order
  - A delivery vehicle can have max 2 orders, if no truck is available can't place an order.
  - Order delivered API for delivery agents to mark the order as delivered.
  - Once isDelivered is changed to true, decrement delivery vehicles activeOrdersCount field.
  - Have proper error handling for routes.

Good to have
  - All the requests should be authenticated via token, pass the token in the headers. Store the token in the constants & use that in route middleware
  - Proper Logging


Time stretch (optional)
  - generate an invoice with customer name, item name & price. store invoiceId in order
  - Unit Tests




