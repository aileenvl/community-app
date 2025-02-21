import React from 'react';
import { User, Lock, Bell, Globe, Shield } from 'lucide-react';

export function Settings() {
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
              {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((platform) => (
                <div key={platform} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm text-gray-700">{platform}</span>
                  </div>
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}