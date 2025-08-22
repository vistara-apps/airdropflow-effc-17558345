
'use client'

import { Shield, Users, Zap, BarChart3, Link, Gift } from 'lucide-react'

export function FeatureGrid() {
  const features = [
    {
      icon: Zap,
      title: 'Automated Distribution',
      description: 'Smart contracts handle token distribution automatically to verified participants.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Shield,
      title: 'Gated Claim Pages',
      description: 'Create custom criteria like NFT ownership or social engagement for token claims.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Users,
      title: 'Referral System',
      description: 'Reward users for bringing new participants with configurable bonus percentages.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track campaign performance, participant growth, and distribution metrics.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Link,
      title: 'Base Chain Integration',
      description: 'Built on Base for low fees, fast transactions, and seamless wallet connectivity.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: Gift,
      title: 'Flexible Campaigns',
      description: 'Support for both direct airdrops and claim-based distribution models.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
  ]

  return (
    <div className="space-y-lg">
      <div className="text-center space-y-md">
        <h2 className="text-heading">Powerful Features for Growing Communities</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Everything you need to create engaging airdrop campaigns that drive growth and reward your community.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="card">
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-lg`}>
                <Icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <div className="space-y-md">
                <h3 className="text-lg font-semibold text-text-primary">{feature.title}</h3>
                <p className="text-caption leading-relaxed">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
