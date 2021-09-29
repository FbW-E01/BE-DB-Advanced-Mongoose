import mongoose from 'mongoose';

// class Animal {

//     constructor(animalName) {
//         console.log("Creating a new Animal!!!");
//         this.id = Math.random();
//         this.name = animalName;
//     }

//     speak() {
//         console.log("Yarrrrrr, I am " + this.name);
//     }

// }

// // const parrot = new Animal("Polly");
// // parrot.speak();


const animalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    ownerId: mongoose.Types.ObjectId
});

animalSchema.methods.speak = function() {
    console.log("ROAR I am " + this.age);
}
animalSchema.statics.random = function () {
    return new Animal({
        name: "Rando",
        age: Math.round(Math.random()*9999)
    })
}
const Animal = mongoose.model("animals", animalSchema);

// const rauli = new Animal({ name: "Rawli", age: 999 });
// rauli.speak();

const randomAnimal = Animal.random();
randomAnimal.speak();