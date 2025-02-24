import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { platform } = req.params;
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    let tokenResponse;

    if (platform === 'twitter') {
      tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${process.env.VITE_TWITTER_CLIENT_ID}:${process.env.VITE_TWITTER_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.VITE_TWITTER_REDIRECT_URI,
          code_verifier: 'challenge',
        }),
      });
    } else if (platform === 'linkedin') {
      tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: process.env.VITE_LINKEDIN_CLIENT_ID,
          client_secret: process.env.VITE_LINKEDIN_CLIENT_SECRET,
          redirect_uri: process.env.VITE_LINKEDIN_REDIRECT_URI,
        }),
      });
    } else {
      return res.status(400).json({ error: 'Invalid platform' });
    }

    if (!tokenResponse.ok) {
      throw new Error(`Failed to exchange code for token: ${tokenResponse.statusText}`);
    }

    const data = await tokenResponse.json();
    return res.status(200).json({ access_token: data.access_token });
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return res.status(500).json({ error: 'Failed to exchange code for token' });
  }
}
