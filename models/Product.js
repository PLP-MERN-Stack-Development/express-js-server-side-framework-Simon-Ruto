// Importing mongoose so it can be used when defining the product schema and creating the model 
const mongoose=require('mongoose');

const productSchema =new mongoose.Schema({
    name: {type:String, required : true},
    description:{type:String,required:true},
    price: {type:Number, required: true},
    category: {type:String, required:true},
    inStock:{type:Boolean,required:true},
} ,{timestamps:true});

const Product= mongoose.model("Product", productSchema)

//Exporting the model which contains the collection name and the  defined product schema
module.exports=Product;