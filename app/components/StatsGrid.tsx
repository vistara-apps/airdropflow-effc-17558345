
'use client'

import { TrendingUp, Users, Gift, Zap } from 'lucide-react'
import { AirdropFlow } from '../lib/types'

interface StatsGridProps {
  campaigns: AirdropFlow.AirdropCampaign[]
}

export function StatsGrid({ campaigns }: StatsGridProps) {
  const stats = [
    {
      icon: Gift,
      label: 'Total Campaigns',
      value: campaigns.length,
      change: '+2 this week',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      label: 'Tokens Distributed',
      value: campaigns.reduce((sum, c) => sum + c.totalTokens, 0).toLocaleString(),
      change: '+12.5%',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Users,
      label: 'Total Participants',
      value: '1,247',
      change: '+8.1%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Zap,
      label: 'Referral Rate',
      value: '23.4%',
      change: '+4.2%',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="card">
            <div className="flex items-center justify-between mb-md">
              <div className={`p-sm rounded-md ${stat.bgColor}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <div className="space-y-sm">
              <p className="text-caption">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
