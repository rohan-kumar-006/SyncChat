import express from 'express'
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { getMessage, sendMessage } from '../controllers/message.controller.js';

const router=express.Router()

router.post("/send/:receiverId",isAuthenticated,sendMessage);
router.get("/get-messages/:otherParticipantId", isAuthenticated, getMessage);

export default router;