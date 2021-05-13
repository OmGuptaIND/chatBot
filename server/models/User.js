const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        max:50,
        require:true,
        trim:true,
        min:3,
    },
    lastName: {
        type:String,
        maxlength: 50
    },
    email: {
        type:String,
        trim:true,
        unique: true,
        require:true 
    },
    hash_password: {
        type: String,
        minglength: 5,
        require:true,
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
}, {timestamps: true} );

userSchema.virtual("password").set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}

userSchema.virtual("fullName")
.get(function(){
    return (`${this.firstName} ${this.lastName}`);
});

module.exports = mongoose.model("User", userSchema);
