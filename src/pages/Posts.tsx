import React, { useState } from 'react';
import { Calendar, MessageSquare, Heart, Share2, Plus, Briefcase } from 'lucide-react';
import { Modal } from '../components/Modal';
import { PostForm } from '../components/PostForm';

export function Posts() {
  const [createPostModal, setCreatePostModal] = useState(false);
  const [campaignPostModal, setCampaignPostModal] = useState(false);

  const handleCreatePost = (data: any) => {
    console.log('Create post data:', data);
    setCreatePostModal(false);
  };

  const handleCampaignPost = (data: any) => {
    console.log('Campaign post data:', data);
    setCampaignPostModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setCampaignPostModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Briefcase className="h-5 w-5 mr-2" />
            Campaign Post
          </button>
          <button
            onClick={() => setCreatePostModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((post) => (
          <div key={post} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src={`https://source.unsplash.com/random/100x100?face&sig=${post}`}
                  alt=""
                />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Marketing Team</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Scheduled for Mar 15, 2025 10:00 AM</span>
                  </div>
                </div>
                <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Scheduled
                </span>
              </div>
              <div className="mt-4">
                <p className="text-gray-900">
                  Exciting news! Our spring collection launches next week. Stay tuned for exclusive previews and special offers. 🌸 #SpringCollection #Fashion
                </p>
                {post === 1 && (
                  <img
                    className="mt-4 rounded-lg w-full h-64 object-cover"
                    src="https://source.unsplash.com/random/800x600?fashion"
                    alt="Spring Collection"
                  />
                )}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex space-x-4">
                  <span className="inline-flex items-center text-gray-500">
                    <Heart className="h-5 w-5 mr-1" />
                    24
                  </span>
                  <span className="inline-flex items-center text-gray-500">
                    <MessageSquare className="h-5 w-5 mr-1" />
                    12
                  </span>
                  <span className="inline-flex items-center text-gray-500">
                    <Share2 className="h-5 w-5 mr-1" />
                    8
                  </span>
                </div>
                <div className="flex space-x-2">
                  {['Twitter', 'LinkedIn', 'Instagram'].map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={createPostModal}
        onClose={() => setCreatePostModal(false)}
        title="Create Post"
      >
        <PostForm
          type="full"
          onSubmit={handleCreatePost}
          onClose={() => setCreatePostModal(false)}
        />
      </Modal>

      <Modal
        isOpen={campaignPostModal}
        onClose={() => setCampaignPostModal(false)}
        title="Create Campaign Post"
      >
        <PostForm
          type="campaign"
          onSubmit={handleCampaignPost}
          onClose={() => setCampaignPostModal(false)}
        />
      </Modal>
    </div>
  );
}