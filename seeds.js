const mongoose = require("mongoose");
let Host   = require("./models/host");
let Visitor   = require("./models/visitor");
let Feedback   = require("./models/feedback");

let data = [
    {
        name: "Shivam", 
        email: "thiswillnotwork@gmail.com",
        contact: "7984563215",
        address: "7th floor LNMIIT",
        active: true
    },
    {
        name: "Aayush", 
        email: "fordemopurposeonly@gmail.com",
        contact: "7946315825",
	    address: "XYZ colony,Jaipur",
        active: true
    },
    {
        name: "Abhay", 
        email: "justforstartercode@gmail.com",
        contact: "2548865975",
	    address: "ABC Colony India",
        active: true
    }
]

function seedDB(){
   //Remove all hosts
   Host.remove({}, (err)=>{
        if(err){
            console.log(err);
        }
        console.log('removed hosts !');
        //add a few hosts
        data.forEach((seed)=>{
            Host.create(seed, (err, host)=>{
                if(err){
                    console.log(err)
                }
            });
        });
        console.log("added hosts");
   });
   //Remove visitors
   Visitor.remove({}, (err)=>{
    if(err){
        console.log(err);
    }
    console.log("removed visitors!");});
    //Remove visitors
   Feedback.remove({}, (err)=>{
    if(err){
        console.log(err);
    }
    console.log("removed feedbacks!");});
}

module.exports = seedDB;