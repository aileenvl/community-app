import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export type Platform = 'twitter' | 'linkedin' | 'bluesky';

export function usePlatformConnection(platform: Platform) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkConnection();
    
    // Subscribe to changes
    const channel = supabase
      .channel('user_connections_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_connections'
        },
        () => {
          checkConnection();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [platform]);

  const checkConnection = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsConnected(false);
        return;
      }

      const { data: connections } = await supabase
        .from('user_connections')
        .select(`${platform}_token`)
        .eq('user_id', user.id)
        .single();

      setIsConnected(!!connections?.[`${platform}_token`]);
    } catch (error) {
      console.error(`Error checking ${platform} connection:`, error);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('user_connections')
        .update({ [`${platform}_token`]: null })
        .eq('user_id', user.id);

      if (error) throw error;
      await checkConnection();
      return { success: true };
    } catch (error) {
      console.error(`Error disconnecting ${platform}:`, error);
      return { success: false, error };
    }
  };

  return {
    isConnected,
    isLoading,
    disconnect,
    checkConnection
  };
}
