const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.signup = (req, res) => {
    User.findOne({email: req.body.email}).exec((err, user)=>{
        if(user){
            return (
                res.status(400).json({
                    msg:"User Exists",
                    is_error:true,
                })
            );
        }
    });

    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;

    const _user = new User({
        email,
        firstName,
        lastName,
        password,
    });

    _user.save((err, data)=>{
        if(err){
            res.status(400).json({
                is_error:true,
                msg:err,
            })
        }else{
            res.status(200).json({
                is_error:false,
                msg:"User Created Successfully!",
            })
        }
    });
}




exports.signin = (req, res) =>{
    User.findOne({email:req.body.email}).exec((err, user)=>{
        if(err || !user){
            res.status(400).json({
                is_error:true,
                msg:"User Not Found"
            })
        }

        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id:user._id, fullName:user.fullName}, process.env.JWT_KEY, {expiresIn:"2d"})
                const {_id, firstName, lastName, email, password, fullName} = user;
                res.status(200).json({
                    token,
                    user:{
                        _id, firstName, lastName, email, password, fullName
                    }
                });
            }else{
                return res.status(400).json({
                    is_error:true,
                    message:"Invalid Password!"
                });
            }
        }else{
            return res.status(400).json({
                is_error:true,
                message:"Something Went Wrong..."
            })
        }
    })
}