# Bun Drop application

Created with ReactJS + vite.

To run, first start the JSON database in a console with this command:

`npm run json-server`

When DB is up and running, simply start the app in a second console with following command:

`npm run dev`

and ctrl + click on the link in the console.

# About the application

This is the webshop for a mock company called Bun Drop. Their business plan is to take burger orders and deliver
with the help of drones. Environmentally a nice alternative to having a fossil fueled vehicle drive to your home,
and also eliminating traffic accident risks.

# More and how to use the application

There are two modes for the app user to enjoy Bun Drop. Either as a guest or as a signed in user.
The signed in option gives the user the possibility to save favorite products and also stores previous orders.
Everyone can order burgers though!

If the user is currently on a desktop device ( > 768px ) the navigation menu will be visible at the top.
Should the screen be smaller the menu will instead be presented as a Hamburger menu because it´s very fun!
This is pressed and the same elements from the top menu is a drop down menu.

The menu page will display a grid of products. Three per row on larger screens and one per row on smaller screens.
At the top of the menu page there is a search bar for products with a dynamic display.

To register a user go to the Login page, click register, and follow instructions. If all inputs checks through the user now has an account and is logged in, as seen in the menu (Logga in changes to Logga ut).

The control for sign in is stored by local storage on the browser to avoid further api requests.
While on that topic, I am implementing a custom useFetch hook to clean up code in the components. The other
hook I´m using is to display a countdown timer for the estimated delivery time ( this is set to 30 seconds ATM for all orders ).

Also in the local storage I am saving products as cart items - for the shopping cart. I simply select the product,
and add a quantity property. This way I can easily display in the shopping cart the amount for each product.
This quantity also gets saved to the receipt and helps me to calculate the total cost.
