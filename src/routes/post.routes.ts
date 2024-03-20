import express from "express";
import { userController } from "../controllers/user.controller";
import { Validator } from "../middlewares/Validator";
import { authController } from "../controllers/auth.controller";
import { createPostValidator } from "../validation/post-validation";
import { postController } from "../controllers/post.controller";
import { authenticator } from "../middlewares/authenticator";
import { postMiddlewares } from "../middlewares/post.middleware";
import { commentController } from "../controllers/comment.controller";
import { createCommentValidator } from "../validation/comment.validation";

const router: express.Router = express.Router();

router.param("postId", postMiddlewares.getPostByParamPostId);

router.route("/").get(userController.getUsers);

router
  .route("/:postId/comments")
  .post(
    [Validator.validate(createCommentValidator), authenticator],
    commentController.createComment
  )
  .get(commentController.getPostComments)

export default router;