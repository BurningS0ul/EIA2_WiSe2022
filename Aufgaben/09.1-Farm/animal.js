"use strict";
/* Aufgabe: 09.1 - Farm
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 10.12.2022
Quellen: EIA 2 Videos, Bastian Aberle
*/
var A091;
(function (A091) {
    window.addEventListener("load", handleLoad);
    let hay = 400;
    let apples = 20;
    let dogfoods = 10;
    let catfoods = 15;
    let fishes = 30;
    class Animal {
        name;
        species;
        food;
        amount;
        sound;
        sounds;
        constructor(_name, _species, _food, _amount, _sound, _sounds) {
            this.name = _name;
            this.species = _species;
            this.food = _food;
            this.amount = _amount;
            this.sound = _sound;
            this.sounds = _sounds;
        }
        sing() {
            let output = document.getElementById("output");
            let newDiv = document.createElement("div");
            newDiv.id = "div";
            if (this.species == "duck") {
                newDiv.innerHTML = "<i>" + this.name + "</i>" + "<br>" + "<br>" + "OldMac Donald had a farm" + "<br>" + "Ee i ee i o" + "<br>" + "And on his farm he had some " + this.species + "s" + "<br>" +
                    "With a " + this.sounds + " here" + "<br>" + "And a " + this.sounds + " there" + "<br>" + "Here a " + this.sound + " there a " + this.sound + "<br>"
                    + "Everywhere a " + this.sounds + "<br>" + "OldMac Donald had a farm" + "<br>" + "Ee i ee i o" + "<br>" + "<br>";
                output.appendChild(newDiv);
            }
            else {
                newDiv.innerHTML = "<i>" + this.name + "</i>" + "<br>" + "<br>" + "OldMac Donald had a farm" + "<br>" + "Ee i ee i o" + "<br>" + "And on his farm he had some " + this.species + "s" + "<br>" +
                    "With a " + this.sounds + " here" + "<br>" + "And a " + this.sounds + " there" + "<br>" + "Here a " + this.sound + " there a " + this.sound + "<br>"
                    + "Everywhere a " + this.sounds + "<br>" + "<br>";
                output.appendChild(newDiv);
            }
        }
        eat() {
            if (this.species == "cow") {
                console.log("eat");
                hay = hay - this.amount;
                let output = document.getElementById("output");
                let newDiv = document.createElement("div");
                newDiv.id = "eat1";
                newDiv.innerHTML = "remaining hay: " + hay.toString();
                output.appendChild(newDiv);
            }
            if (this.species == "horse") {
                apples = apples - this.amount;
                let output = document.getElementById("output");
                let newDiv = document.createElement("div");
                newDiv.id = "eat2";
                newDiv.innerHTML = "remaining apples: " + apples.toString();
                output.appendChild(newDiv);
            }
            if (this.species == "dog") {
                dogfoods = dogfoods - this.amount;
                let output = document.getElementById("output");
                let newDiv = document.createElement("div");
                newDiv.id = "eat3";
                newDiv.innerHTML = "remaining dogfood: " + dogfoods.toString();
                output.appendChild(newDiv);
            }
            if (this.species == "cat") {
                catfoods = catfoods - this.amount;
                let output = document.getElementById("output");
                let newDiv = document.createElement("div");
                newDiv.id = "eat4";
                newDiv.innerHTML = "remaining catfood: " + catfoods.toString();
                output.appendChild(newDiv);
            }
            if (this.species == "duck") {
                fishes = fishes - this.amount;
                let output = document.getElementById("output");
                let newDiv = document.createElement("div");
                newDiv.id = "eat5";
                newDiv.innerHTML = "remaining fishes: " + fishes.toString();
                output.appendChild(newDiv);
            }
        }
    }
    function handleLoad() {
        let animal1 = new Animal("Peter", "cow", "hay", 20, "moo", "moo-moo");
        let animal2 = new Animal("Hans", "horse", "apples", 3, "wieher", "wieh-wieh");
        let animal3 = new Animal("Sabine", "dog", "dogfood", 3, "woof", "woof-woof");
        let animal4 = new Animal("Gertrud", "cat", "catfood", 3, "miau", "miau-miau");
        let animal5 = new Animal("Franzl", "duck", "fish", 2, "quack", "quack-quack");
        let output = document.getElementById("day");
        let newDiv = document.createElement("div");
        newDiv.id = "dayDiv";
        newDiv.innerHTML = "Day 1";
        output.appendChild(newDiv);
        rations();
        animal1.sing();
        animal1.eat();
        animal2.sing();
        animal2.eat();
        animal3.sing();
        animal3.eat();
        animal4.sing();
        animal4.eat();
        animal5.sing();
        animal5.eat();
    }
    function rations() {
        let parent = document.getElementById("foods");
        let newDiv = document.createElement("div");
        newDiv.innerHTML = "hay: " + hay.toString() + "<br>" + "apples: " + apples.toString() + "<br>" + "dogfood: " + dogfoods.toString() + "<br>" + "catfood: " + catfoods.toString() + "<br>" + "fishes: " + fishes.toString();
        newDiv.id = "newStat";
        parent.appendChild(newDiv);
    }
})(A091 || (A091 = {}));
//# sourceMappingURL=animal.js.map