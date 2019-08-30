import express from 'express';
import AccountController from '../modules/account-module/controllers/account.controller';
import AccountValidate from '../modules/account-module/middleware/account.middleware';

const router = express.Router();

// Create use routers
// POST
router.post('/accounts', AccountValidate.createAccountInput, AccountController.create);
router.post('/accounts/login', AccountValidate.logInAccountInput, AccountController.login);
router.post('/accounts/login-with-google', AccountValidate.logInWithGoogleInput, AccountController.logInWithGoogle);
router.post('/accounts/login-with-facebook', AccountValidate.loginWithFacebookInput, AccountController.logInWithFacebook);


// GET
// router.get('/account/me', AccountValidate.meInput, AccountController.me);

export default router;
