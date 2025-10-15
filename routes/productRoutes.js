//Import what you need
const express= require('express');
const router=express.Router();
const Product=require('../models/Product')

//Implement the following RESTful routes:
//GET /api/products: List all products

router.get("/", async (req,res)=>{
    try {
        const products=await Product.find();
        res.json(products)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});


//GET /api/products/:id: Get a specific product by ID

router.get("/:id", async (req,res)=>{
    try {
        const product= await Product.findById(
            req.params.id
        );
        res.json(product)
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
});

//POST /api/products: Create a new product

router.post("/",async (req,res)=>{

    const {name,description,price,category,inStock}=req.body  //Info from the front end to be saved

    try {
        const product= new Product({name,description,price,category,inStock});
        //waiting for the information to be saved
        const saved= await product.save();
        res.status(201).json(saved); //response to the front end
    } catch (error) {
        res.status(400).json({message:error.message})
    }
});
//PUT /api/products/:id: Update an existing product

router.put("/:id" ,async(req,res)=>{
    try {
        //Finding the product by Id and deleting

        const product=await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(product); //Response to the front end
    } catch (error) {
        res.status(400).json({message:error.message});  //If an error occurs message to pass
    }

});
//DELETE /api/products/:id: Delete a product

router.delete("/:id", async (req,res)=>{
    try {
        await Product.findByIdAndDelete(
            req.params.id
        );
        res.json({message:"Product deleted"})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

//Advanced Features


// Filtering + Pagination
//(Implement query parameters for filtering products by category)
//(Add pagination support for the product listing endpoint)
router.get("/", async (req, res) => {
  try {
    const { category, page = 1, limit = 5 } = req.query;
    const filter = category ? { category } : {};

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search-(Create a search endpoint that allows searching products by name)
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name)
      return res.status(400).json({ message: "Please provide a search term" });

    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Statistics-(Implement route for getting product statistics (e.g., count by category))
router.get("/stats", async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports= router;