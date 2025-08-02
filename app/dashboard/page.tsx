'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  History,
  Brain,
  BarChart3,
  LogOut,
  Settings,
  UserCircle
} from 'lucide-react';
import MoodTracker from '@/components/MoodTracker';
import MoodHistory from '@/components/MoodHistory';
import AIInsights from '@/components/AIInsights';
import DashboardStats from '@/components/DashboardStats';

const tabs = [
  { id: 'track', label: 'Track Mood', icon: TrendingUp },
  { id: 'history', label: 'History', icon: History },
  { id: 'insights', label: 'AI Insights', icon: Brain },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('track');

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r flex flex-col p-4 space-y-6">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-primary-600" />
          <h1 className="text-xl font-bold text-gray-900">Mental Health</h1>
        </div>

        <nav className="flex-1 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full px-4 py-2 rounded-lg transition duration-200 text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700 shadow-inner'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t">
          <button className="flex items-center text-gray-600 hover:text-gray-900 w-full px-4 py-2 rounded-lg transition">
            <UserCircle className="w-5 h-5 mr-2" /> Profile
          </button>
          <button className="flex items-center text-gray-600 hover:text-gray-900 w-full px-4 py-2 rounded-lg transition">
            <Settings className="w-5 h-5 mr-2" /> Settings
          </button>
          <button className="flex items-center text-red-600 hover:text-red-800 w-full px-4 py-2 rounded-lg transition">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 px-6 py-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {activeTab === 'track' && <MoodTracker />}
            {activeTab === 'history' && <MoodHistory />}
            {activeTab === 'insights' && (
              <AIInsights userId="user-123" currentMood={7} />
            )}
            {activeTab === 'analytics' && (
              <DashboardStats
                stats={{
                  current_streak: 5,
                  total_entries: 23,
                  average_mood: 7.2,
                  most_common_activities: ['exercise', 'social', 'work'],
                  weekly_trend: [
                    { date: '2024-01-01', average_mood: 7.5, entry_count: 1 },
                    { date: '2024-01-02', average_mood: 6.8, entry_count: 1 },
                    { date: '2024-01-03', average_mood: 8.2, entry_count: 1 },
                    { date: '2024-01-04', average_mood: 7.0, entry_count: 1 },
                    { date: '2024-01-05', average_mood: 7.8, entry_count: 1 },
                    { date: '2024-01-06', average_mood: 8.5, entry_count: 1 },
                    { date: '2024-01-07', average_mood: 7.2, entry_count: 1 },
                  ]
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
