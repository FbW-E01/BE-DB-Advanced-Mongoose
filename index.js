import mongoose from 'mongoose';
import Pet from './models/pet.js';

// We need a user to exist in the target database so we can connect :)
// $ mongo
// > use exampledb;
// > db.createUser({ user:"jimmy", pwd: "passw0rd", roles: ["readWrite"] });

const username = "jimmy";
const password = "passw0rd";
const db = "exampledb";

// The connection string defines exactly how to connect to our database
const connectionString = `mongodb://${username}:${password}@localhost:27017/${db}`;

// These event handlers are helpful for logging!
mongoose.connection.on('error',         (e) => console.log(">> Error!", e) || process.exit(0));
mongoose.connection.on('connecting',    () => console.log(">> Connecting"));
mongoose.connection.on('disconnecting', () => console.log(">> Disconnecting"));
mongoose.connection.on('disconnected',  () => console.log(">> Disconnected"));

try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(connectionString);

    // If we got this far, the connection was successful!
    console.log("Connected, inserting Rauli! :D");

    // Let's create a new pet for insertion
    const rauli = new Pet({ name: 42, age: "asd" });
    
    // Inerting an object based on a model with .save() is asynchronous!
    rauli.save()
        .then(() => console.log("Rauli saved!!!"))
        .catch(e => console.log("Unable to save Rauli!!!", e))
        .finally(() => mongoose.connection.close());
} catch (e) {}