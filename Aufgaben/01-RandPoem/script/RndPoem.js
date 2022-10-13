"use strict";
/* Aufgabe: 01-Zufallsgedicht
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 13.10.2022
Quellen: -
*/
var randomPoem;
(function (randomPoem) {
    let sub = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let act = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let obj = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    let counter = 6;
    console.log(sub, act, obj);
    for (obj.length > counter; counter > 0; counter--) {
        // let rnd = Math.floor(Math.random());
        // console.log(counter);
        // console.log(obj[counter - 1]);
        let last = getVerse(sub, act, obj);
        console.log(last);
    }
    function getVerse(_sub, _act, _obj) {
        let rndsub = Math.floor(Math.random() * _sub.length);
        let rndact = Math.floor(Math.random() * _act.length);
        let rndobj = Math.floor(Math.random() * _obj.length);
        let verse = _sub[rndsub] + " " + _act[rndact] + " " + _obj[rndobj] + "!";
        _sub.splice(rndsub, 1);
        _act.splice(rndact, 1);
        _obj.splice(rndobj, 1);
        return verse;
    }
})(randomPoem || (randomPoem = {}));
//# sourceMappingURL=RndPoem.js.map