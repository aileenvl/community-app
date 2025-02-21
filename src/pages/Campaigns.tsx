import React from 'react';
import { Calendar, Plus } from 'lucide-react';

export function Campaigns() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((campaign) => (
          <div key={campaign} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Spring Collection Launch
                  </h3>
                  <p className="text-sm text-gray-500">
                    Mar 15, 2025 - Apr 15, 2025
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium text-indigo-600">45%</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((member) => (
                    <img
                      key={member}
                      className="h-8 w-8 rounded-full border-2 border-white"
                      src={`https://source.unsplash.com/random/100x100?face&sig=${member}`}
                      alt=""
                    />
                  ))}
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}