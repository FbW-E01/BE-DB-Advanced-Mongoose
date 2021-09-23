import mongoose from 'mongoose';
import faker from 'faker';
import User from './models/user.js';

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
mongoose.connection.on('error',         e => console.log(">> Error!", e) || process.exit(0));
mongoose.connection.on('connecting',    () => console.log(">> Connecting"));
mongoose.connection.on('disconnecting', () => console.log(">> Disconnecting"));
mongoose.connection.on('disconnected',  () => console.log(">> Disconnected"));

try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(connectionString);

    // Purge (delete) ALL old users!
    await User.deleteMany({}).exec();

    // Create array of fake user objects
    const fakes = [];
    for (let i = 50; i > 0; i--) {
        fakes.push({
            username: faker.fake("{{internet.userName}}"),
            password: faker.fake("{{internet.password}}"),
            age: faker.datatype.number(),
            role: "User"
        });
    }

    // Use fake user objects to create data into Mongo
    await User.create(fakes);

    // Create custom admin user
    const adminUser = new User({
        username: "Artholomew",
        password: "Hippopotpourri",
        age: 999,
        role: "Admin"
    })
    await adminUser.save();

    // We are now able to run methods on our admin user
    // adminUser.buyBeer();

    // We could also run static User methods
    // User.findByName("Artholomew");

    // Seeding done! Print how many users we now have!
    const count = await User.count().exec();
    console.log(`User seeding done! Current user count is ${count}`);

    // Don't forget to close the connection :)
    mongoose.connection.close();
} catch (e) {}