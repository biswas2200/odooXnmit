import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-body">
            <p className="text-gray-600 dark:text-gray-400">
              Dashboard component will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
