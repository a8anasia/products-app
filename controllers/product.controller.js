const Product = require('../model/product.model')

const logger = require('../logger/logger')


exports.findAll = async(req, res) => {
    try{
    const result = await Product.find()
      .collation({ locale: 'en', strength: 2 })
    res.status(200).json({data: result})
    logger.debug("Success in reading all products")
    } catch(err){
        logger.error("Problem in reading all products")
    }
}



exports.findOne = async(req, res) => {
    console.log("Find a product")
    const product = req.params.product 
    try{
        const result = await Product.findOne({product:product})
          .collation({ locale: 'en', strength: 2 })
        res.status(200).json({data: result})
    } catch(err) {
        console.log(`Problem in reading product, ${err}`)
    }
}



exports.create = async(req, res) => {
    console.log("Insert product")
  
    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity

    });
  
    try {
      const result = await newProduct.save();
      res.status(200).json({data: result});
      console.log("Product saved");
    } catch(err) {
      res.status(400).json({data: err})
      console.log("Problem in saving product", err);
    }
  }

  exports.update = async(req, res) => {
    const product = req.params.product;
  
    console.log("Update product with name:", product);
  
    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }
  
    try {
      const result = await Product.findOneAndUpdate(
        {product: product},
        updateProduct,
        {new: true}
      )
      res.status(200).json({data: result});
      console.log("Success in updating product: ", product)
    } catch(err){
      res.status(400).json({data: err})
      console.log("Problem in updating product: ", product);
    }
  }

  exports.delete = async(req, res) => {
    const product = req.params.product;
  
    console.log("Delete product with name:", product);

    try {
        const result = await Product.findOneAndDelete({product: product})
        res.status(200).json({data: result});
        console.log("Success in deleting product: ", product)
      } catch(err){
        res.json({data: err})
        console.log("Problem in deleting product: ", product);
      }
  }