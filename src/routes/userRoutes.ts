

import { Router } from 'express';
import { loginUser, registerUser ,logoutUser} from '../controllers/UserController';

const router = Router();

router.post('/login', loginUser);
router.post('/register',registerUser);
router.post('/logout',logoutUser);

export default router;
