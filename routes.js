const  express =  require("express");
const router = express.Router();

const User = require("./src/controllers/user.controller");


router.post("/onboard", User.onboard);
router.post("/login", User.login);
router.get("/user/:id", User.currentUser);
router.put("/update/:id", User.updateUser);
router.delete("/delete/:id", User.deleteUser);

module.exports =  router;