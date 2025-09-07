import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';


function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return;
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {

    const errorMessage = `
      CRITICAL ERROR: One or more Firebase Admin credentials are missing in your .env.local file.
      Please check the following variables:
      - FIREBASE_PROJECT_ID: ${projectId ? 'FOUND' : 'MISSING'}
      - FIREBASE_CLIENT_EMAIL: ${clientEmail ? 'FOUND' : 'MISSING'}
      - FIREBASE_PRIVATE_KEY: ${privateKey ? 'FOUND' : 'MISSING'}
    `;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'), 
      }),
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error: any) {
    console.error("Firebase Admin SDK initialization failed:", error.message);
    throw new Error(`Firebase Admin initialization failed: ${error.message}`);
  }
}

/**
 * Verifies a Firebase ID token. Ensures the admin app is initialized before use.
 * @param {string} token - The Firebase ID token from the client.
 * @returns {Promise<DecodedIdToken | null>} The decoded token, or null if invalid.
 */
export const verifyFirebaseToken = async (token: string): Promise<DecodedIdToken | null> => {
  if (!token) {
    return null;
  }

  try {
    initializeFirebaseAdmin();
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error during token verification:', error);
    return null;
  }
};
