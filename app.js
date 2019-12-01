// Require all necessary modules
// =======================================================================
const   express       = require("express"),
        bodyParser    = require("body-parser"),
        mongoose      = require("mongoose"),
        session       = require("express-session"),
        flash         = require("connect-flash"),
        cookieParser  = require("cookie-parser"),
        Visitor       = require("./models/visitor"),
        Host          = require("./models/host"),
        Feedback       = require("./models/feedback"),
        seedDB        = require("./seeds"),
        sendText      = require("./helper/sendText"),
        sendEmail     = require("./helper/sendEmail"),
        sendFbEmail   = require("./helper/sendFbEmail"),
        getOTP        = require("./helper/genOTP"),
        tConvert      = require("./helper/tConvert"),
        app           = express(),
        port          = parseInt(process.env.PORT, 10) || 3000;

// Connect to database
// =======================================================================
const mongoDB_URI = 'mongodb://localhost/evtManagement';
mongoose.connect(mongoDB_URI, 
                {
                    useNewUrlParser: true, 
                    useUnifiedTopology: true,
                    useFindAndModify: true
                })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

// =======================================================================
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname+"/public"));
console.log(__dirname);
app.use(session({
    secret: 'secret123',
    saveUninitialized: false,
    resave: false
}));
app.use(flash());
app.set("view engine","ejs");

// Seed the database (Remove existing hosts,visitors and add few hosts)
// =======================================================================
seedDB();

// Routes
// =======================================================================
app.get("/", async (req,res)=>{
    const hosts = await Host.find({active: true});
    try {
            res.render("home",{hosts: hosts, message: req.flash("msg")});
    } 
    catch(err){
        console.log(err);
    }
});

app.post("/", (req,res)=>{
    let d = new Date();
    let time = tConvert(d.getHours(),d.getMinutes());
    let params = {
                    name: req.body.name, 
                    email: req.body.email,
                    contact: req.body.contact,
                    checkIn: time,
                    hostId: req.body.hostId 
                }
    if (params.hostId === undefined){
        req.flash("msg","Please select host");
        res.redirect('/');
    }
    else{
        let visitor = new Visitor(params);
        visitor.save((err,visitor)=>{
                if(err)  {
                    req.flash("msg","Someone with this email or contact is checked in");
                    res.redirect("/");
                }
                else{
                    req.flash("msg","Successfully checked in");
                    res.redirect("/meeting");
                }
            });
        Host.findOne({'_id': params.hostId},(err,host)=>{
            if(err) return console.log(err);
            else {
                // sendEmail(host.email,params);
                // sendText(host.contact,params);
            }
        });
    }
});

// Host page routing
// =======================================================================
app.get("/newHost",(req,res)=>{
    res.render("newHost",{message: req.flash("msg")});
});

app.post("/newHost",(req,res)=>{
    let params = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address
    }
    params = getOTP(params);
    let host = new Host(params);
    host.save((err,host)=>{
        if(err){
            req.flash("msg","Someone with same email or contact exists !");
            res.redirect("/newHost");
        }
        else if(!params.active){
            // sendEmail(host.email,host,true);
            req.flash("msg","An email has been sent, please enter OTP");
            res.redirect("/verify");
        }
        else{
            req.flash("msg","Successfully added host");
            res.redirect("/");
        }        
    });
});

// In a meeting route
// =======================================================================
app.get("/meeting", async (req,res)=>{
    const visitors = await Visitor.find({});
    try {   
            res.render("meeting",{visitors: visitors,message: req.flash("msg")});
    } 
    catch(err){
        console.log(err);
    }
});

app.post("/meeting",async (req,res)=>{
    let d = new Date();
    let time = tConvert(d.getHours(),d.getMinutes());
    
    if(req.body.userId === undefined){
        req.flash("msg","Please make a selection");
        res.redirect("/meeting");
    }
    else{
        let v = await Visitor.findOne({"_id": req.body.userId});
        await Host.findOne({"_id": v.hostId},(err,h)=>{
            v = getOTP(v);
            v.hostName = h.name;
            v.address  = h.address;
            v.checkOut = time;
        });
        let visitor = new Visitor(v);
        visitor.save((err,visitor)=>{
            if(err){
                req.flash("msg","Something went wrong :(");
                res.redirect("/meeting");
            }
            if(!visitor.active){
                // sendEmail(visitor.email,visitor,true);
                req.flash("msg","An email has been sent, please enter OTP");
                res.redirect("/verify");
            }
        });
    }
});

// OTP Route
// =======================================================================
app.get("/verify",(req,res)=>{
    res.render("verify",{message: req.flash("msg")});
})

app.post("/verify",async (req,res)=>{
    const {secretToken} = req.body;
    const user1 = await Visitor.findOne({'secretToken': secretToken});
    const user2 = await Host.findOne({'secretToken': secretToken});
    try{
            if(!user1 && !user2){
                req.flash("msg","OTP verification failed");
                res.redirect("/verify");
            }
            else if(user1 && !user2){
                req.flash("msg","Successfully checked out");
                user1.remove((err,host)=>{
                    if(err){console.log(err);}
                    else{
                        // sendEmail(user1.email,user1);
                        // sendText(user1.contact,user1);
                        req.session.message = host;
                        res.redirect("/feedBack");
                    }
                });
            }
            else if(!user1 && user2){
                req.flash("msg","OTP verification complete");
                user2.active = true;
                user2.secretToken = '';
                user2.save(()=>{
                    res.redirect("/");
                });
            }
    }catch(err){console.log(err);}
});

// Feedback Routing
// =======================================================================
app.get("/feedBack",(req,res)=>{
    res.render("feedback",{visitor: req.session.message, message: req.flash("msg")});
});

app.post("/feedBack", async(req,res)=>{
        const feedback = {
            name: req.body.name,
            hostName: req.body.hostName,
            email: req.body.email,
            fullFill: req.body.fullFill,
            attitudeHost: req.body.attitudeHost,
            timing: req.body.timing,
            other: req.body.other
        }
        let fb = new Feedback(feedback);
        fb.save((err,fb)=>{
            if(err){
                req.flash("msg","Please fill the table");
                res.redirect("/feedBack");
            } 
            else{
                sendFbEmail(fb.email,fb);
                req.flash("msg","Thank you for your feedback, an copy has been sent via email");
                res.redirect("/meeting");
                req.session.destroy();
            }
        })
});

// Catch all route
// =======================================================================
app.get("*",(req,res)=>{
    res.send("Oops !! wrong link ");
})


// =======================================================================
app.listen(port, ()=>{
    console.log("Server started on port:",port);
});
