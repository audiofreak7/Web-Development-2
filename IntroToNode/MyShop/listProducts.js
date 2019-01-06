var faker = require('faker');

console.log("WELCOME TO MY SHOP! 10 Made-Up Product Names and Prices using the 'faker' NPM!");

for(var i = 0; i < 10; i++) {
    var productName = faker.commerce.productName();
    var price = faker.commerce.price();
    console.log(productName + ": $" + price);
}
