const express = require("express");
const router = express.Router();
const User = require("../models/user")
const { NotFoundError } = require("../utils/errors")
const { createUserJwt } = require("../utils/token")
const security = require("../middleware/security")


router.post("/login", async (req, res, next) => {
    try {
        // take the users email and password and attempting to authenticate them

      const user = await User.login(req.body)
      const token = createUserJwt(user)
        return res.status(200).json({ user,token })
      } catch (err) {
        next(err);
      }
})

router.post("/register", async (req, res, next) => {
    try {
        // take the users email, password, rsvp status, and the number of guests
        // and create a new user in our database
      const user = await User.register(req.body)
      const token = createUserJwt(user)

      
        return res.status(201).json({ user, token })
    } catch (err) {
        console.log(err)
        next(err);
      }
})

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user
    const user = await User.fetchUserByEmail(email)
    const publicUser = User.makePublicUser(user)
    return res.status(200).json({user: publicUser})
    
  }
  catch (err){
    next(err)
  }
})

module.exports = router;