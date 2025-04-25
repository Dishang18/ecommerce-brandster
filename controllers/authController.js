const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const userModel = require("../models/user-model");
require('dotenv').config();


module.exports.registerUser = async function(req, res) {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({email:email});
        if(user) {
            req.flash( "error","Already have an account!!");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) {
                    return res.status(500).send(err.message);
                }

                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });
                    let token = jwt.sign({email: user.email , id: user._id},"secret");
                    res.cookie("token", token);
                    res.redirect("/");
                } 
            });
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports.loginUser= async function(req,res){

    let {email,password}=req.body;

    let user = await userModel.findOne({email:email});
    if(!user) return res.redirect("/");

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token =jwt.sign({email: user.email , id: user._id},"secret");
            res.cookie("token",token);
            res.redirect("/shop");
        }   
        else
        {
            req.flash("error","Somthing is wrong!");
            return res.redirect("/");
        }
    })
}

module.exports.logout= function(req,res){
    res.cookie("token","");
    res.redirect("/");
}