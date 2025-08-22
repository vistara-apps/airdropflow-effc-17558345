
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { AirdropFlow } from '../lib/types'

interface CreateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<AirdropFlow.AirdropCampaign, 'campaignId' | 'createdAt' | 'updatedAt'>) => void
}

export function CreateCampaignModal({ isOpen, onClose, onSubmit }: CreateCampaignModalProps) {
  const [formData, setFormData] = useState({
    projectName: '',
    tokenAddress: '',
    totalTokens: '',
    distributionType: 'claim' as 'direct' | 'claim',
    criteriaForClaim: '',
    referralBonusPercentage: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const campaignData = {
      projectName: formData.projectName,
      tokenAddress: formData.tokenAddress,
      totalTokens: parseInt(formData.totalTokens),
      distributionType: formData.distributionType,
      claimPageUrl: `/claim/${Date.now()}`,
      criteriaForClaim: formData.criteriaForClaim,
      referralBonusPercentage: parseInt(formData.referralBonusPercentage),
      isActive: true,
    }

    onSubmit(campaignData)
    setFormData({
      projectName: '',
      tokenAddress: '',
      totalTokens: '',
      distributionType: 'claim',
      criteriaForClaim: '',
      referralBonusPercentage: '',
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-xl">
          <div className="flex justify-between items-center mb-xl">
            <h2 className="text-heading">Create Airdrop Campaign</h2>
            <button
              onClick={onClose}
              className="p-sm hover:bg-gray-100 rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-lg">
            <div className="space-y-md">
              <label className="block text-sm font-medium text-text-primary">
                Project Name
              </label>
              <input
                type="text"
                required
                className="input-field w-full"
                placeholder="e.g., Base Creator Rewards"
                value={formData.projectName}
                onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
              />
            </div>

            <div className="space-y-md">
              <label className="block text-sm font-medium text-text-primary">
                Token Address
              </label>
              <input
                type="text"
                required
                className="input-field w-full"
                placeholder="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
                value={formData.tokenAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, tokenAddress: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="space-y-md">
                <label className="block text-sm font-medium text-text-primary">
                  Total Tokens
                </label>
                <input
                  type="number"
                  required
                  className="input-field w-full"
                  placeholder="100000"
                  value={formData.totalTokens}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalTokens: e.target.value }))}
                />
              </div>

              <div className="space-y-md">
                <label className="block text-sm font-medium text-text-primary">
                  Referral Bonus %
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="50"
                  className="input-field w-full"
                  placeholder="10"
                  value={formData.referralBonusPercentage}
                  onChange={(e) => setFormData(prev => ({ ...prev, referralBonusPercentage: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-md">
              <label className="block text-sm font-medium text-text-primary">
                Distribution Type
              </label>
              <select
                className="input-field w-full"
                value={formData.distributionType}
                onChange={(e) => setFormData(prev => ({ ...prev, distributionType: e.target.value as 'direct' | 'claim' }))}
              >
                <option value="claim">Claim Page</option>
                <option value="direct">Direct Distribution</option>
              </select>
            </div>

            <div className="space-y-md">
              <label className="block text-sm font-medium text-text-primary">
                Claim Criteria
              </label>
              <textarea
                required
                rows={3}
                className="input-field w-full resize-none"
                placeholder="e.g., Hold at least 1 Base NFT or Follow on Farcaster"
                value={formData.criteriaForClaim}
                onChange={(e) => setFormData(prev => ({ ...prev, criteriaForClaim: e.target.value }))}
              />
            </div>

            <div className="flex space-x-md pt-lg">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
