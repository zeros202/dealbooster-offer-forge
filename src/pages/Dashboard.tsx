
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Image, Globe, BarChart3, Plus, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Create Proposal',
      description: 'Generate AI-powered sales proposals',
      icon: FileText,
      to: '/proposal-generator',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      stats: '2x faster'
    },
    {
      title: 'Edit Images',
      description: 'Enhance images with text overlays',
      icon: Image,
      to: '/image-editor',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      stats: 'Pro quality'
    },
    {
      title: 'Build Landing Page',
      description: 'Create high-converting landing pages',
      icon: Globe,
      to: '/landing-builder',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      stats: '300% boost'
    },
    {
      title: 'View Analytics',
      description: 'Track your performance metrics',
      icon: BarChart3,
      to: '/analytics',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      stats: 'Real-time'
    },
  ];

  const recentActivity = [
    { action: 'Created proposal', item: 'Q4 Sales Deck', time: '2 hours ago', status: 'completed' },
    { action: 'Edited image', item: 'Product Hero Banner', time: '4 hours ago', status: 'completed' },
    { action: 'Built landing page', item: 'Holiday Campaign', time: '1 day ago', status: 'in-progress' }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'there'}! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Ready to create some amazing sales content? Let's boost those conversions!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Card key={action.title} className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
            <Link to={action.to}>
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{action.title}</CardTitle>
                <CardDescription className="text-gray-600">{action.description}</CardDescription>
                <div className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full text-xs font-medium">
                  <TrendingUp className="h-3 w-3" />
                  {action.stats}
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium" variant="default">
                  <Plus className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest projects and activities</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      <CheckCircle className={`h-4 w-4 ${
                        activity.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="font-medium">No recent activity yet</p>
                <p className="text-sm">Start creating proposals to see them here</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Performance Stats
            </CardTitle>
            <CardDescription>Overview of your account performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-gray-900">0</span>
                  <p className="text-sm text-gray-600">Proposals Created</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-gray-900">0</span>
                  <p className="text-sm text-gray-600">Images Edited</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Image className="h-6 w-6 text-green-600" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-gray-900">0</span>
                  <p className="text-sm text-gray-600">Landing Pages</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-gray-900">0</span>
                  <p className="text-sm text-gray-600">Total Views</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
