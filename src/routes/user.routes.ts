import express from 'express';
import { userController } from '../controllers/user.controller';
import { Validator } from '../middlewares/Validator';
import { createUserValidator } from '../validation/user-validation';
import { authController } from '../controllers/auth.controller';
import { userMiddlewares } from '../middlewares/user.middleware';
import { createPostValidator } from '../validation/post-validation';
import { postController } from '../controllers/post.controller';

const router: express.Router = express.Router();

router.param('userId', userMiddlewares.getUserByParamUserId);

router.route('/')
  .post(Validator.validate(createUserValidator),userController.createUser)
  .get(userController.getUsers);

router.get('/top-users', userController.getTopUsersWithLatestComment);

router.get('/:userId/auth-token', authController.getUserAuthToken);
router
  .route('/:userId/posts')
  .post(Validator.validate(createPostValidator), postController.createPost)
  .get(postController.getUserPosts)

export default router;