
import React from 'react';
import { DealBoosterCanvas } from '@/components/dealbooster/DealBoosterCanvas';
import { DealBoosterHeader } from '@/components/dealbooster/DealBoosterHeader';

const DealBooster = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <DealBoosterHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              DealBooster AI
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create stunning sales offers with professional image overlays and text effects
            </p>
          </div>
          <DealBoosterCanvas />
        </div>
      </main>
    </div>
  );
};

export default DealBooster;
