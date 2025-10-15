//Connecting to MongoDB through mongoose and using dotenv to hide our connection string through a variable 

const mongoose = require ('mongoose');
require('dotenv').config();

const connectDB= async () => {
    //Using try catch for error handling
    try{
        await mongoose.connect(process.env.MONGO_URI,{
         useNewUrlParser : true,
         useUnifiedTopology : true,    
        });
        console.log("MongoDB Connected Succesfully"); //Will be printed if it connects succesfully
    }catch(error){
        console.error(error.message);
        process.exit(1)
    }    
    
};

//Exporting the connectDB function so I can call it/use it in other files
module.exports=connectDB