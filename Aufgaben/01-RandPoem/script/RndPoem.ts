console.log("working");

let sub = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
let act = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
let obj = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];

let counter = 6;

console.log(sub, act, obj);
for (obj.length > counter; counter > 0; counter--) {
    console.log(counter);
    console.log(obj[counter - 1]);
}