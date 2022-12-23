const mongoose = require('mongoose');
const data = require('./data');
const Subject = require('../../models/subjectScheme');
const dbUrl = "mongodb+srv://usipcompcentre2022august:usip123p1@cluster0.a82quus.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Database connected");
  });


  const seed = async()=>{
    for(let subject of data){
        //console.log(aprog);
       // console.log(specialization);
        const temp = new Subject(subject);
        console.log(temp);
        await temp.save();
    }

  }
  const edit = async()=>{
    const subjects = await Subject.find({});
    for(let subject of subjects){
      await Subject.findByIdAndUpdate(subject._id,{seats:70});        
    }

  }




  // seed().then(()=>{
  //   mongoose.connection.close();
  // })
  

  edit().then(()=>{
    mongoose.connection.close();
  })
  
