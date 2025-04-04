import express from 'express';
import { mkdir } from 'fs/promises';
import { saveMessage } from '../utils/messageStorage';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    // Ensure data directory exists
    await mkdir('data', { recursive: true });
    
    // Save the message
    await saveMessage(req.body);
    
    res.status(200).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

export default router;