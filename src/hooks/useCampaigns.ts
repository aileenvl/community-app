import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Campaign, CreateCampaignInput } from '../types/campaign';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaigns();

    const channel = supabase
      .channel('campaigns_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'campaigns'
        },
        () => {
          fetchCampaigns();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createCampaign = async (input: CreateCampaignInput) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          ...input,
          user_id: user.id,
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;
      await fetchCampaigns();
      return { success: true, campaign: data };
    } catch (err) {
      console.error('Error creating campaign:', err);
      return { success: false, error: err.message };
    }
  };

  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchCampaigns();
      return { success: true };
    } catch (err) {
      console.error('Error updating campaign:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteCampaign = async (id: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchCampaigns();
      return { success: true };
    } catch (err) {
      console.error('Error deleting campaign:', err);
      return { success: false, error: err.message };
    }
  };

  const publishCampaign = async (id: string) => {
    try {
      const campaign = campaigns.find(c => c.id === id);
      if (!campaign) throw new Error('Campaign not found');

      // TODO: Implement actual publishing logic here
      // This would involve calling your API to post to the selected platforms

      const { error } = await supabase
        .from('campaigns')
        .update({ status: 'published' })
        .eq('id', id);

      if (error) throw error;
      await fetchCampaigns();
      return { success: true };
    } catch (err) {
      console.error('Error publishing campaign:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    campaigns,
    isLoading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    publishCampaign,
    refreshCampaigns: fetchCampaigns
  };
}
