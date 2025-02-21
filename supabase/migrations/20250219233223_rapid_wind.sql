/*
  # Social Media Management Platform Schema

  1. New Tables
    - `teams`
      - Team management with roles and permissions
    - `team_members`
      - Junction table for users and teams with roles
    - `social_accounts`
      - Connected social media accounts
    - `campaigns`
      - Marketing campaigns and events
    - `posts`
      - Social media posts with scheduling
    - `tasks`
      - Task management for team collaboration
    - `media_assets`
      - Storage for images, videos, and GIFs
    
  2. Security
    - Enable RLS on all tables
    - Add policies for team-based access
*/

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members junction table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id),
  user_id uuid REFERENCES auth.users(id),
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Social accounts table
CREATE TABLE IF NOT EXISTS social_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id),
  platform text NOT NULL CHECK (platform IN ('linkedin', 'twitter', 'bluesky', 'facebook', 'instagram')),
  account_name text NOT NULL,
  account_id text,
  access_token text,
  refresh_token text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id),
  name text NOT NULL,
  description text,
  start_date timestamptz,
  end_date timestamptz,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id),
  campaign_id uuid REFERENCES campaigns(id),
  content text NOT NULL,
  platforms jsonb NOT NULL DEFAULT '[]',
  schedule_time timestamptz,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id),
  campaign_id uuid REFERENCES campaigns(id),
  assigned_to uuid REFERENCES auth.users(id),
  title text NOT NULL,
  description text,
  due_date timestamptz,
  status text DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Media assets table
CREATE TABLE IF NOT EXISTS media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id),
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Team members can view their teams"
  ON teams
  FOR SELECT
  USING (
    id IN (
      SELECT team_id 
      FROM team_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can view team data"
  ON team_members
  FOR SELECT
  USING (
    team_id IN (
      SELECT team_id 
      FROM team_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can view social accounts"
  ON social_accounts
  FOR SELECT
  USING (
    team_id IN (
      SELECT team_id 
      FROM team_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can view campaigns"
  ON campaigns
  FOR SELECT
  USING (
    team_id IN (
      SELECT team_id 
      FROM team_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can view posts"
  ON posts
  FOR SELECT
  USING (
    team_id IN (
      SELECT team_id 
      FROM team_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can view tasks"
  ON tasks
  FOR SELECT
  USING (
    team_id IN (
      SELECT team_id 
      FROM team_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can view media assets"
  ON media_assets
  FOR SELECT
  USING (
    team_id IN (
      SELECT team_id 
      FROM team_members 
      WHERE user_id = auth.uid()
    )
  );