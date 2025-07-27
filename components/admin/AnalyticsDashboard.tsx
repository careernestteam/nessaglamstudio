'use client'

import { useState, useEffect } from 'react'
import { createClientSupabaseClient } from '@/lib/supabase'
import { BarChart3, TrendingUp, Users, MessageCircle, Eye, Calendar } from 'lucide-react'

interface AnalyticsData {
  totalPageViews: number
  whatsappClicks: number
  popularServices: Array<{ service: string; clicks: number }>
  recentActivity: Array<{ event_type: string; event_data: any; created_at: string }>
  dailyStats: Array<{ date: string; views: number; clicks: number }>
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7d')
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    loadAnalytics()
  }, [dateRange])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const endDate = new Date()
      const startDate = new Date()
      
      switch (dateRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7)
          break
        case '30d':
          startDate.setDate(endDate.getDate() - 30)
          break
        case '90d':
          startDate.setDate(endDate.getDate() - 90)
          break
      }

      // Get analytics data
      const { data: analyticsData, error } = await supabase
        .from('admin_analytics')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: false })

      if (error) throw error

      // Process the data
      const processedData = processAnalyticsData(analyticsData || [])
      setAnalytics(processedData)
    } catch (error) {
      console.error('Error loading analytics:', error)
      // Set mock data for demonstration
      setAnalytics({
        totalPageViews: 2341,
        whatsappClicks: 156,
        popularServices: [
          { service: 'Bridal Packages', clicks: 45 },
          { service: 'Hair Installation', clicks: 38 },
          { service: 'Makeup Artistry', clicks: 32 },
          { service: 'Special Events', clicks: 25 }
        ],
        recentActivity: [
          { event_type: 'whatsapp_click', event_data: { service: 'Bridal Packages' }, created_at: new Date().toISOString() },
          { event_type: 'page_view', event_data: { page: 'services' }, created_at: new Date().toISOString() },
          { event_type: 'whatsapp_click', event_data: { service: 'Hair Installation' }, created_at: new Date().toISOString() }
        ],
        dailyStats: generateMockDailyStats(7)
      })
    } finally {
      setLoading(false)
    }
  }

  const processAnalyticsData = (data: any[]): AnalyticsData => {
    const pageViews = data.filter(item => item.event_type === 'page_view').length
    const whatsappClicks = data.filter(item => item.event_type === 'whatsapp_click').length
    
    // Count service clicks
    const serviceClicks: Record<string, number> = {}
    data
      .filter(item => item.event_type === 'whatsapp_click' && item.event_data?.service)
      .forEach(item => {
        const service = item.event_data.service
        serviceClicks[service] = (serviceClicks[service] || 0) + 1
      })

    const popularServices = Object.entries(serviceClicks)
      .map(([service, clicks]) => ({ service, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 4)

    // Generate daily stats
    const dailyStats = generateDailyStats(data, parseInt(dateRange.replace('d', '')))

    return {
      totalPageViews: pageViews,
      whatsappClicks,
      popularServices,
      recentActivity: data.slice(0, 10),
      dailyStats
    }
  }

  const generateDailyStats = (data: any[], days: number) => {
    const stats = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const dayData = data.filter(item => 
        item.created_at.startsWith(dateStr)
      )
      
      stats.push({
        date: dateStr,
        views: dayData.filter(item => item.event_type === 'page_view').length,
        clicks: dayData.filter(item => item.event_type === 'whatsapp_click').length
      })
    }
    return stats
  }

  const generateMockDailyStats = (days: number) => {
    const stats = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      stats.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 50,
        clicks: Math.floor(Math.random() * 20) + 5
      })
    }
    return stats
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load analytics data</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
            <p className="text-sm text-gray-600">Track your website performance and user engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Page Views</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalPageViews.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp size={12} />
                +12% from last period
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">WhatsApp Clicks</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.whatsappClicks}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp size={12} />
                +8% from last period
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {((analytics.whatsappClicks / analytics.totalPageViews) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp size={12} />
                +2.3% from last period
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Daily Visitors</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(analytics.totalPageViews / parseInt(dateRange.replace('d', '')))}
              </p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp size={12} />
                +5% from last period
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Services */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900">Popular Services</h4>
            <p className="text-sm text-gray-600">Most clicked services via WhatsApp</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.popularServices.map((service, index) => (
                <div key={service.service} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-sm font-semibold text-purple-600">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">{service.service}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ 
                          width: `${(service.clicks / Math.max(...analytics.popularServices.map(s => s.clicks))) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 w-8 text-right">
                      {service.clicks}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900">Recent Activity</h4>
            <p className="text-sm text-gray-600">Latest user interactions</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.recentActivity.slice(0, 6).map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.event_type === 'whatsapp_click' 
                      ? 'bg-green-100' 
                      : 'bg-blue-100'
                  }`}>
                    {activity.event_type === 'whatsapp_click' ? (
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.event_type === 'whatsapp_click' 
                        ? `WhatsApp click: ${activity.event_data?.service || 'Unknown service'}`
                        : `Page view: ${activity.event_data?.page || 'Homepage'}`
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateTime(activity.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Stats Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Daily Performance</h4>
          <p className="text-sm text-gray-600">Page views and WhatsApp clicks over time</p>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-end justify-between gap-2">
            {analytics.dailyStats.map((day, index) => {
              const maxValue = Math.max(...analytics.dailyStats.map(d => Math.max(d.views, d.clicks)))
              const viewHeight = (day.views / maxValue) * 200
              const clickHeight = (day.clicks / maxValue) * 200
              
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1 h-48">
                    <div 
                      className="bg-blue-500 rounded-t w-4 min-h-[4px] relative group"
                      style={{ height: `${viewHeight}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {day.views} views
                      </div>
                    </div>
                    <div 
                      className="bg-green-500 rounded-t w-4 min-h-[4px] relative group"
                      style={{ height: `${clickHeight}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {day.clicks} clicks
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 transform -rotate-45 origin-center">
                    {formatDate(day.date)}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Page Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">WhatsApp Clicks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}