const User = require('../model/user.model')

const logger = require('../logger/logger')


exports.findAll = async(req, res) => {
    console.log("Find all users")
    try{
    const result = await User.find()
    res.status(200).json({data: result})
    logger.debug("Success in reading all users")
    } catch(err){
        logger.error("Problem in reading all users")
    }
}



exports.findOne = async(req, res) => {
    console.log("Find a user")
    const username = req.params.username 
    try{
        const result = await User.findOne({username:username})
        res.status(200).json({data: result})
    } catch(err) {
        console.log(`Problem in reading user, ${err}`)
    }
}



exports.create = async(req, res) => {
    console.log("Insert user")
  
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      products: req.body.products
    });
  
    try {
      const result = await newUser.save();
      res.status(200).json({data: result});
      console.log("User saved");
    } catch(err) {
      res.status(400).json({data: err})
      console.log("Problem in saving user", err);
    }
  }

  exports.update = async(req, res) => {
    const username = req.params.username;
  
    console.log("Update user with username:", username);
  
    const updateUser = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone
    }
  
    try {
      const result = await User.findOneAndUpdate(
        {username: username},
        updateUser,
        {new: true}
      )
      res.status(200).json({data: result});
      console.log("Success in updating user: ", username)
    } catch(err){
      res.status(400).json({data: err})
      console.log("Problem in updating user: ", username);
    }
  }

  exports.delete = async(req, res) => {
    const username = req.params.username;
  
    console.log("Delete user with username:", username);

    try {
        const result = await User.findOneAndDelete({username: username})
        res.status(200).json({data: result});
        console.log("Success in deleting user: ", username)
      } catch(err){
        res.json({data: err})
        console.log("Problem in deleting user: ", username);
      }
  }