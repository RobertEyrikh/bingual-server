const Router = require("express").Router;
const validators = require("../validators/validators");
const authMiddleware = require("../middlewares/auth-middleware")
const userController = require("../controllers/user-controller");
const cardController = require("../controllers/card-controller");
const router = new Router();

router.post("/registration", validators.registration, userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

router.post("/addCard", validators.addCard, authMiddleware, cardController.addCard)
router.get("/getCardsByUser", authMiddleware, cardController.getCardsByUser);
router.post("/getCardById", authMiddleware, cardController.getCardById);
router.post("/deleteCard", authMiddleware, cardController.deleteCard);
router.post("/changeCardTitle", validators.changeCardTitle, authMiddleware, cardController.changeCardTitle)
router.post("/deleteWord", authMiddleware, cardController.deleteWord)
router.post("/changeWordInCard", validators.changeWordInCard, authMiddleware, cardController.changeWordInCard)
router.post("/createNewWord", validators.createNewWord, authMiddleware, cardController.createNewWord)

module.exports = router;
