import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    _id: false,
    street: String,
    postal: String,
    country: String
});

const skillsSchema = new mongoose.Schema({
    _id: false,
    name: { type: String, required: true, unique: true },
    level: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
    username: String,
    password: { type: String },
    age:      { type: Number, required: true },
    role:     { type: String, required: true, default: "User" },
    email:    { type: String, required: true, unique: true },
    address:  addressSchema,
    skills:   [ skillsSchema ]
});

// Our user methods
userSchema.methods.canEdit = function() {
    return this.role === "Admin" || this.role === "Editor";
}
userSchema.methods.buyBeer = function() {
    if (this.age < 18) {
        console.log("No beer, underage!");
        return;
    }
    console.log("Beer bought");
} 

// Our user static methods
userSchema.statics.findByName = function(name) {
    return this.findOne({ name }).exec();
}
userSchema.statics.findAdmins = function() {
    return this.find({ role: "Admin" }).exec();
}

const User = mongoose.model("testusers", userSchema);

export default User;