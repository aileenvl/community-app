import React from 'react';
import { User, Lock, Bell, Globe, Shield } from 'lucide-react';
import { usePlatformConnection } from '../hooks/usePlatformConnection';
import type { Platform } from '../types/supabase';

interface PlatformConfig {
  id: Platform;
  name: string;
  icon: React.ReactNode;
  clientId: string;
  redirectUri: string;
}

const platforms: PlatformConfig[] = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: <Shield className="h-5 w-5 text-[#1DA1F2]" />,
    clientId: import.meta.env.VITE_TWITTER_CLIENT_ID,
    redirectUri: import.meta.env.VITE_TWITTER_REDIRECT_URI,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <Shield className="h-5 w-5 text-[#0A66C2]" />,
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    redirectUri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI,
  },
  {
    id: 'bluesky',
    name: 'BlueSky',
    icon: <Shield className="h-5 w-5 text-[#0560FF]" />,
    clientId: '',
    redirectUri: '',
  }
];

export function Settings() {
  const handleConnect = async (platform: PlatformConfig) => {
    if (platform.id === 'bluesky') {
      // Handle BlueSky connection with modal
      return;
    }

    try {
      const authUrl = new URL(
        platform.id === 'twitter'
          ? 'https://twitter.com/i/oauth2/authorize'
          : 'https://www.linkedin.com/oauth/v2/authorization'
      );

      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('client_id', platform.clientId);
      authUrl.searchParams.append('redirect_uri', platform.redirectUri);
      
      if (platform.id === 'twitter') {
        authUrl.searchParams.append('scope', 'tweet.read tweet.write users.read');
        authUrl.searchParams.append('state', 'state');
        authUrl.searchParams.append('code_challenge', 'challenge');
        authUrl.searchParams.append('code_challenge_method', 'plain');
      } else {
        authUrl.searchParams.append('scope', 'w_member_social');
      }

      console.log(`${platform.name} Auth URL:`, authUrl.toString());
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error(`Error connecting to ${platform.name}:`, error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Settings
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Security
            </h2>
            <div className="mt-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Change Password
              </button>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </h2>
            <div className="mt-4 space-y-4">
              {['Email notifications', 'Push notifications', 'SMS notifications'].map((notification) => (
                <div key={notification} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    {notification}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Connected Accounts
            </h2>
            <div className="mt-4 space-y-4">
              {platforms.map((platform) => {
                const { isConnected, disconnect } = usePlatformConnection(platform.id);
                
                return (
                  <div key={platform.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {platform.icon}
                      <span className="ml-3 text-sm text-gray-700">{platform.name}</span>
                    </div>
                    <button
                      onClick={() => isConnected ? disconnect() : handleConnect(platform)}
                      className={`inline-flex items-center px-3 py-1.5 border shadow-sm text-sm font-medium rounded ${
                        isConnected
                          ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                          : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {isConnected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}