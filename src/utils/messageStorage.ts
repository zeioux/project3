import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

interface MessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
  userInfo: {
    ip?: string;
    userAgent?: string;
    language?: string;
    screenResolution?: string;
    timeZone?: string;
    platform?: string;
  };
  timestamp: string;
  referrer: string;
  url: string;
}

const MESSAGES_FILE = join(process.cwd(), 'data', 'messages.json');

export async function saveMessage(messageData: MessageData): Promise<void> {
  try {
    // Get existing messages
    const existingMessages = await getMessages();
    
    // Add new message
    existingMessages.push(messageData);
    
    // Ensure the data directory exists
    await mkdir(join(process.cwd(), 'data'), { recursive: true });
    
    // Save to file
    await writeFile(MESSAGES_FILE, JSON.stringify(existingMessages, null, 2));
  } catch (error) {
    console.error('Error saving message:', error);
    throw new Error('Failed to save message');
  }
}

export async function getMessages(): Promise<MessageData[]> {
  try {
    const data = await readFile(MESSAGES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return [];
  }
}