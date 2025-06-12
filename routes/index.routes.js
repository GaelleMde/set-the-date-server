const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middlewares")

// ℹ️ Test Route. Can be left and used for waking up the server if idle
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const eventRouter = require("./event.routes")
router.use("/event", eventRouter)

const commentRouter = require("./comment.routes")
router.use("/comment", commentRouter)

const userRouter = require("./comment.routes")
router.use("/user", userRouter)

module.exports = router;
