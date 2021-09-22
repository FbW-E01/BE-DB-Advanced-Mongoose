import mongoose from 'mongoose';

// First, let's create a pet schema
// this helps mongoose connect our Pets to the documents in our collection
const petSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Then, let's create our Pet model based on the schema
// Here we also define which MongoDB collection to use
const petCollection = "pets";
const Pet = mongoose.model(petCollection, petSchema);

export default Pet;