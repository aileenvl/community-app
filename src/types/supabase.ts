export type Platform = 'twitter' | 'linkedin' | 'bluesky';

export interface UserConnections {
  id: string;
  user_id: string;
  twitter_token: string | null;
  linkedin_token: string | null;
  bluesky_token: string | null;
  linkedin_company: string | null;
  created_at: string;
  updated_at: string;
}
