import React from 'react';
import { Upload, Image as ImageIcon, Film, Plus } from 'lucide-react';

export function Media() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          Upload Media
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Drag and drop your media files here, or{' '}
              <button className="font-medium text-indigo-600 hover:text-indigo-500">
                browse
              </button>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="group relative bg-white rounded-lg shadow overflow-hidden">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={`https://source.unsplash.com/random/400x300?sig=${item}`}
                alt=""
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 flex items-center justify-center space-x-4">
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                    <ImageIcon className="h-5 w-5 text-gray-700" />
                  </button>
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                    <Film className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                spring-campaign-{item}.jpg
              </h3>
              <p className="mt-1 text-sm text-gray-500">Added Mar 10, 2025</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}