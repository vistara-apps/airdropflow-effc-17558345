
'use client'

import { Calendar, Users, Gift, ExternalLink } from 'lucide-react'
import { AirdropFlow } from '../lib/types'

interface CampaignCardProps {
  campaign: AirdropFlow.AirdropCampaign
  onView: () => void
}

export function CampaignCard({ campaign, onView }: CampaignCardProps) {
  const formatTokens = (amount: number) => {
    return new Intl.NumberFormat().format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date)
  }

  return (
    <div className="card-interactive">
      <div className="flex justify-between items-start mb-lg">
        <div className="space-y-sm">
          <h3 className="text-heading">{campaign.projectName}</h3>
          <div className="flex items-center space-x-md text-caption">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              campaign.isActive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {campaign.isActive ? 'Active' : 'Inactive'}
            </span>
            <span className="capitalize">{campaign.distributionType}</span>
          </div>
        </div>
        
        <button
          onClick={onView}
          className="btn-outline p-sm"
          title="View Campaign"
        >
          <ExternalLink size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-lg mb-lg">
        <div className="space-y-sm">
          <div className="flex items-center space-x-2 text-caption">
            <Gift size={14} />
            <span>Total Tokens</span>
          </div>
          <p className="font-semibold text-text-primary">{formatTokens(campaign.totalTokens)}</p>
        </div>

        <div className="space-y-sm">
          <div className="flex items-center space-x-2 text-caption">
            <Users size={14} />
            <span>Referral Bonus</span>
          </div>
          <p className="font-semibold text-text-primary">{campaign.referralBonusPercentage}%</p>
        </div>

        <div className="space-y-sm">
          <div className="flex items-center space-x-2 text-caption">
            <Calendar size={14} />
            <span>Created</span>
          </div>
          <p className="font-semibold text-text-primary">{formatDate(campaign.createdAt)}</p>
        </div>

        <div className="space-y-sm">
          <div className="flex items-center space-x-2 text-caption">
            <span>Status</span>
          </div>
          <p className="font-semibold text-primary">Live</p>
        </div>
      </div>

      <div className="space-y-sm">
        <p className="text-caption">Claim Criteria</p>
        <p className="text-sm text-text-primary">{campaign.criteriaForClaim}</p>
      </div>
    </div>
  )
}
