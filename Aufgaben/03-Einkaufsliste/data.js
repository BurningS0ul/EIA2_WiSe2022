"use strict";
/* Aufgabe: 04-Data Structs
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 03.11.2022
Quellen: -
*/
var shoppingList;
(function (shoppingList) {
    shoppingList.data = {
        fruits: [
            { name: "Apples", amount: 3, comment: "Royal" }
        ],
        milk: [
            { name: "Yoghurt", amount: 1, comment: "Greek" }
        ],
        vegetables: [
            { name: "Broccoli", amount: 2, comment: "Fresh" }
        ],
        pastries: [
            { name: "Bread", amount: 5, comment: "Whole Wheat" }
        ],
        meat: [
            { name: "Chicken", amount: 4, comment: "Breast" }
        ],
        fish: [
            { name: "Salmon", amount: 6, comment: "Saltwater" }
        ],
        ingredients: [
            { name: "Flour", amount: 20, comment: "Too Much" }
        ],
        spices: [
            { name: "Thyme", amount: 23, comment: "Leaf" }
        ],
        convenience: [
            { name: "Sandwich", amount: 7, comment: "Packed" }
        ],
        snacks: [
            { name: "Chips", amount: 255, comment: "Salty" }
        ],
        beverages: [
            { name: "RedBull", amount: 8, comment: "Cans" }
        ],
        household: [
            { name: "Desinfectant", amount: 34, comment: "A Lot" }
        ],
        care: [
            { name: "Deodorant", amount: 24, comment: "Dove" }
        ],
        pet: [
            { name: "Dog Food", amount: 44, comment: "Petshop" }
        ],
        home: [
            { name: "Carpet", amount: 56, comment: "Welcome" }
        ],
        etc: [
            { name: "Shoes", amount: 48, comment: "Tennis" }
        ]
    };
})(shoppingList || (shoppingList = {}));
//# sourceMappingURL=data.js.map