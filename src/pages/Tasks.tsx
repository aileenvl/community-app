import React from 'react';
import { CheckSquare, Clock, Plus } from 'lucide-react';

export function Tasks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          Add Task
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((task) => (
            <div key={task} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckSquare className={`h-6 w-6 ${task === 2 ? 'text-green-500' : 'text-gray-400'}`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      Create social media content for spring campaign
                    </h3>
                    <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>Due Mar 15, 2025</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        High Priority
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex items-center space-x-4">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`https://source.unsplash.com/random/100x100?face&sig=${task}`}
                    alt=""
                  />
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task === 2 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {task === 2 ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}