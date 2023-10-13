const express = require("express");
const userRoute = express.Router();
const cors = require('cors');
userRoute.use(cors());
const usermodal = require("../modals/user")
const User = require("../modals/user");


userRoute.post("/resister",async(req,res)=>{

    const  name = req.body.name;
    const email = req.body.email;
    const password= req.body.password;


     usermodal.findOne({email:email},(err,user) => {
        if(user){
            res.send({message:"user already resiste"});
            console.log("user already resister");
        }else{
            const mainuser = new usermodal(
                {
                    name,
                    email,
                    password,
                }
            )
            mainuser.save(err =>{
                if(err){
                    console.log(err)
                }else{
                    res.send({message:"resiste successfull"});
                }
            })
        }
     })

})



userRoute.get("/show",async(request,response) =>{
   try{
     const user = await User.find({})
      response.status(200).json(user);
    //   console.log(user)
   }catch(err){
    response.status(400).json(err);
   }
})

userRoute.get("/:id",async(request,response) =>{

    // console.log(request.params.id);
    try{
      const user = await User.findById(request.params.id);
       response.status(200).json(user);
    //    console.log(user)
    }catch(err){
     response.status(400).json(err);
    }
 })

 userRoute.post("/:id",async(req,res) =>{
      let user = req.body;

      const edituser = new User(user);

      try{
          await User.updateOne({_id:req.params.id},edituser)
          res.status(200).json({message:"edit successfully"})
      }catch(err){
        response.status(400).json({error:"not edit"})
      }

    //   console.log(user);
  })

  userRoute.delete("/:id",async(req,res)=>{

    try{
      await User.deleteOne({_id:req.params.id})
      res.status(200).json({message:"deleate successfully"})
  }catch(err){
    response.status(400).json({error:"not edit"})
  }

  })


module.exports = userRoute;
