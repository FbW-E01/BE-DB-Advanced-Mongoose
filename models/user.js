import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    age: Number,
    role: String
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