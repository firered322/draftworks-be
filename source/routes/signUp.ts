import express from "express";
import controller from '../controllers/userAuth/signUp/signUp'

const router = express.Router();

router.post('/signUp', controller.signUp)

export = router;