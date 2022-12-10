/* Aufgabe: 09.1 - Farm
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 10.12.2022
Quellen: EIA 2 Videos, Bastian Aberle
*/

namespace A091 {

    window.addEventListener("load", handleLoad);

    let hay: number = 400;
    let apples: number = 20;
    let dogfoods: number = 10;
    let catfoods: number = 15;
    let fishes: number = 30;

    class Animal {
        name: string;
        species: string;
        food: string;
        amount: number;
        sound: string;
        sounds: string;

        constructor(_name: string, _species: string, _food: string, _amount: number, _sound: string, _sounds: string) {
            this.name = _name;
            this.species = _species;
            this.food = _food;
            this.amount = _amount;
            this.sound = _sound;
            this.sounds = _sounds;
        }

        sing(): void {
            let output: HTMLElement = document.getElementById("output")!;
            let newDiv: HTMLDivElement = document.createElement("div");
            newDiv.id = "div";
        
            if (this.species == "duck") {
                newDiv.innerHTML = "<i>" + this.name + "</i>" + "<br>" + "<br>" + "OldMac Donald had a farm" + "<br>" + "Ee i ee i o" + "<br>" + "And on his farm he had some " + this.species + "s" + "<br>" +
                "With a " + this.sounds + " here" + "<br>" + "And a " + this.sounds + " there" + "<br>" + "Here a " + this.sound + " there a " + this.sound + "<br>"
                + "Everywhere a " + this.sounds + "<br>" + "OldMac Donald had a farm" + "<br>" + "Ee i ee i o" + "<br>" + "<br>";
                output.appendChild(newDiv);
            } else {
                newDiv.innerHTML = "<i>" + this.name + "</i>" + "<br>" + "<br>" + "OldMac Donald had a farm" + "<br>" + "Ee i ee i o" + "<br>" + "And on his farm he had some " + this.species + "s" + "<br>" +
                "With a " + this.sounds + " here" + "<br>" + "And a " + this.sounds + " there" + "<br>" + "Here a " + this.sound + " there a " + this.sound + "<br>"
                + "Everywhere a " + this.sounds + "<br>" + "<br>";
                output.appendChild(newDiv);     

            }
        }

        eat(): void {
            if (this.species == "cow") {
                console.log("eat");
                hay = hay - this.amount;
                let output: HTMLElement = document.getElementById("output")!;
                let newDiv: HTMLDivElement = document.createElement("div");
                newDiv.id = "eat1";
                newDiv.innerHTML = "remaining hay: " + hay.toString();
                output.appendChild(newDiv);
            }
            if (this.species == "horse") {
                apples = apples - this.amount;
                let output: HTMLElement = document.getElementById("output")!;
                let newDiv: HTMLDivElement = document.createElement("div");
                newDiv.id = "eat2";
                newDiv.innerHTML = "remaining apples: " + apples.toString();
                output.appendChild(newDiv);
            }
            if (this.species == "dog") {
                dogfoods = dogfoods - this.amount;
                let output: HTMLElement = document.getElementById("output")!;
                let newDiv: HTMLDivElement = document.createElement("div");
                newDiv.id = "eat3";
                newDiv.innerHTML = "remaining dogfood: " + dogfoods.toString();
                output.appendChild(newDiv);
            }
            if (this.species == "cat") {
                catfoods = catfoods - this.amount;
                let output: HTMLElement = document.getElementById("output")!;
                let newDiv: HTMLDivElement = document.createElement("div");
                newDiv.id = "eat4";
                newDiv.innerHTML = "remaining catfood: " + catfoods.toString();
                output.appendChild(newDiv);
            }
            if (this.species == "duck") {
                fishes = fishes - this.amount;
                let output: HTMLElement = document.getElementById("output")!;
                let newDiv: HTMLDivElement = document.createElement("div");
                newDiv.id = "eat5";
                newDiv.innerHTML = "remaining fishes: " + fishes.toString();
                output.appendChild(newDiv);

            }
        }
    }


    function handleLoad(): void {
        let animal1: Animal = new Animal("Peter", "cow", "hay", 20, "moo", "moo-moo");
        let animal2: Animal = new Animal("Hans", "horse", "apples", 3, "wieher", "wieh-wieh");
        let animal3: Animal = new Animal("Sabine", "dog", "dogfood", 3, "woof", "woof-woof");
        let animal4: Animal = new Animal("Gertrud", "cat", "catfood", 3, "miau", "miau-miau");
        let animal5: Animal = new Animal("Franzl", "duck", "fish", 2, "quack", "quack-quack");
        let output: HTMLElement = document.getElementById("day")!;
        let newDiv: HTMLDivElement = document.createElement("div");
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

    function rations(): void {
        let parent: HTMLElement = document.getElementById("foods")!;
        let newDiv: HTMLDivElement = document.createElement("div");
        newDiv.innerHTML = "hay: " + hay.toString() + "<br>" + "apples: " + apples.toString() + "<br>" + "dogfood: " + dogfoods.toString() + "<br>" + "catfood: " + catfoods.toString() + "<br>" + "fishes: " + fishes.toString(); 
        newDiv.id = "newStat";
        parent.appendChild(newDiv);
    }
}