const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.get("/", authenticateUser, UserController.getUsers);

module.exports = router;
