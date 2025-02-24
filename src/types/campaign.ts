import { Platform } from './supabase';

export type CampaignStatus = 'draft' | 'scheduled' | 'published' | 'failed';
export type ScheduleType = 'now' | 'later';

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  status: CampaignStatus;
  platforms: Platform[];
  schedule_type: ScheduleType;
  scheduled_time?: string;
  content: string;
  media_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateCampaignInput {
  name: string;
  description?: string;
  platforms: Platform[];
  schedule_type: ScheduleType;
  scheduled_time?: string;
  content: string;
  media_urls?: string[];
}
