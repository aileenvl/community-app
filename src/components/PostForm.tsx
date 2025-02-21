import React, { useState } from 'react';
import { Calendar, Image as ImageIcon } from 'lucide-react';

interface PostFormProps {
  type: 'quick' | 'full' | 'campaign';
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export function PostForm({ type, onSubmit, onClose }: PostFormProps) {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [campaignId, setCampaignId] = useState('');

  const platforms = [
    { id: 'twitter', name: 'Twitter' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'instagram', name: 'Instagram' },
  ];

  const campaigns = [
    { id: '1', name: 'Spring Collection Launch' },
    { id: '2', name: 'Summer Sale Campaign' },
    { id: '3', name: 'Product Launch 2025' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      content,
      platforms: selectedPlatforms,
      scheduleDate,
      scheduleTime,
      campaignId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="What would you like to share?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {type !== 'quick' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platforms
          </label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                type="button"
                onClick={() => {
                  setSelectedPlatforms((prev) =>
                    prev.includes(platform.id)
                      ? prev.filter((id) => id !== platform.id)
                      : [...prev, platform.id]
                  );
                }}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  selectedPlatforms.includes(platform.id)
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {type === 'campaign' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
          >
            <option value="">Select a campaign</option>
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ImageIcon className="h-5 w-5 mr-2" />
          Add Media
        </button>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {type === 'quick' ? 'Post Now' : 'Schedule Post'}
        </button>
      </div>
    </form>
  );
}