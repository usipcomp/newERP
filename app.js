if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
  }
  const express = require("express");
  const mongoose = require("mongoose");
  const { auth } = require("./middleware/auth");
  const studentRoutes = require('./routes/student');
  const adminRoutes = require('./routes/admin');
  //const teacherRoutes = require('./routes/teacher');
  //const adminRoutes = require('./routes/admin');
  //const Teacher = require("./models/teacher");
  const expressLayouts = require('express-ejs-layouts');

  const path = require("path");
  const jwt = require("jsonwebtoken");
  const cookieParser = require("cookie-parser");
  const dbUrl = process.env.DB_URL;
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const session = require("express-session");
  const flash = require("connect-flash");
  const ejsMate = require("ejs-mate");
  const methodOverride = require("method-override");
  const { type } = require("os");
  
  const app = express();
  //app.use(expressLayouts);

  app.use(cookieParser());
  app.engine("ejs", ejsMate);
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));
  app.use(express.static(path.join(__dirname, "public")));
  const sessionOptions = {
    secret: "thisisAsecret",
    resave: false,
    saveUninitialized: false,
  };
  app.use(session(sessionOptions));
  app.use(flash());
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database connected");
  });
  
  
  
  
  
  const seedDB = async () => {
    await Subject.deleteMany({});
    for (let subject of subjectData) {
        const {subjectName,subjectCode,subjectCoordinator,subjectType}=subject;
        const temp = new Subject
        ({
            //YOUR USER ID
            subjectName,subjectCode,subjectCoordinator,subjectType
        })
        console.log(temp);
        await temp.save();
        // console.log(subject);
        // console.log("*************************************");
    }
  }
  
  
  const branchSeed = async () => {
    await Branch.deleteMany({});
    for (let branch of branchData) {
        const {branchName,branchCode,subjects}=branch;
        const temp = new Branch
        ({
            //YOUR USER ID
            branchName,branchCode,subjects
        })
        console.log(temp);
        await temp.save();
        // console.log(subject);
        // console.log("*************************************");
    }
  }
  
  //*********************************************************************************************** */
  //*********************************************************************************************** */
  
  
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  })
  
  app.get(('/seed',async (req,res)=>{
    //await seedDB();
    res.send("Done");
  }))
  //*********************************************************************************************** */
  //*********************************************************************************************** */
  
  
  
  
  app.use('/student', studentRoutes);
  // app.use('/spots', teacherRoutes);
  app.use('/admin', adminRoutes);
  



  app.get('/branchSeed',async(req,res)=>{
    await branchSeed();
    res.send("BRANCH SEEDING COMPLETED");
  })
  app.get('/', async (req,res)=>{
    // await seedDB();
    res.render('index');
  })
  
  
  //*********************************************************************************************** */
  //*********************************************************************************************** */
  
  
  //*********************************************************************************************** */
  
  
  
  
  
  //*********************************************************************************************** */
  
  app.listen(3000, () => {
    console.log("Live on port 3000");
  });
  