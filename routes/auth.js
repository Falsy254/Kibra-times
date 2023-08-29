const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {model,models} =require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const user = require("../models/user")
router.post(
  "/signup",
  [
    check("email", "please enter a valid email").isEmail(),
    check(
      "password",
      "please use alphabets and numbers in the password"
    ).isAlphanumeric(),
    check("password", "password should be six characters or more ").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({ error: errors.array() });
      }

      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          error: [
            {
              msg: "User already exists",
            },
          ],
        });
      }
      const hashedpassword = await bcrypt.hash(password, 10);
      console.log(hashedpassword);
      const newUser = new User({
        name,
        email,
        password: hashedpassword,
      });

      const savedUser = await newUser.save();
      res.status(200).json(savedUser);

      const token = await jwt.sign(
        {
          id: savedUser._id,
          email: savedUser.email,
        },
        process.env.JWT_SIGN,
        {
          expiresIn: "3d",
        }
      );
      console.log(token);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
router.post("signin",[check("email","please enter a valid email").isEmail(),
], async (req,res)=>{
  try {
    const {email,password}=req.body
    const errors=validationResult(req)
    if (!errors.isEmpty()){
      return res.status(408).json({errors.array()})
    }
    const user=await User.findOne({email})
    if(!user){
      return res.status(400).json({
        "error":[
          {
            "msg": "Invald Credentials"
          }
        ]
      })
    }
const checkpassword=await bcrypt.compare(password,user.password)
if(!checkpassword){
  return res.status(400).json({
    "error":[
      {
        "msg":"Wrong credentials"
      }
    ]
  })
}
const token=await jwt.sign(
  {id:user._id,
    email:user.email
  },
  process.env.JWT_SIGN,
  {expiresIn:"3rd"}
  console.log(token)
  const {password:userpassword,...othres} =user.$getPopulatedDocs;
  res.status(200).json({...othres, token})
)
  } catch (error) {
    res.status(400).json(error)
  }
})
module.exports = router;
