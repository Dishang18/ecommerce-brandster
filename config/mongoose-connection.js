const mongoose=require('mongoose');
const config=require('config');
const dbgr=require('debug')("develoment:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/Brandster`)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    dbgr(err);   
})

module.exports=mongoose.connection;