import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import type { Platform } from '../../../types/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { platform } = useParams<{ platform: Platform }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      
      if (!code) {
        setError('No authorization code received');
        return;
      }

      try {
        // Exchange the code for an access token
        const response = await fetch(`/api/auth/${platform}/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to exchange code for token');
        }

        const { access_token } = await response.json();

        // Get the current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user found');

        // Save the token
        const { error: saveError } = await supabase
          .from('user_connections')
          .upsert({
            user_id: user.id,
            [`${platform}_token`]: access_token,
          });

        if (saveError) throw saveError;

        // Redirect back to settings
        navigate('/settings', { replace: true });
      } catch (err) {
        console.error('Error in auth callback:', err);
        setError(err.message);
      }
    };

    handleCallback();
  }, [platform, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-red-600 text-xl font-semibold mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => navigate('/settings')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Connecting to {platform}...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
      </div>
    </div>
  );
}
