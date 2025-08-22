
'use client'

import { useEffect, useState } from 'react'
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  usePrimaryButton,
  useNotification,
} from '@coinbase/onchainkit/minikit'
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from '@coinbase/onchainkit/identity'
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CampaignCard } from './components/CampaignCard'
import { CreateCampaignModal } from './components/CreateCampaignModal'
import { StatsGrid } from './components/StatsGrid'
import { FeatureGrid } from './components/FeatureGrid'
import { AirdropFlow } from './lib/types'

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [frameAdded, setFrameAdded] = useState(false)
  const [activeView, setActiveView] = useState<'dashboard' | 'create' | 'campaigns'>('dashboard')
  const [campaigns, setCampaigns] = useState<AirdropFlow.AirdropCampaign[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)

  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  const sendNotification = useNotification()

  // Sample campaigns data
  useEffect(() => {
    const sampleCampaigns: AirdropFlow.AirdropCampaign[] = [
      {
        campaignId: '1',
        projectName: 'Base Creator Rewards',
        tokenAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        totalTokens: 100000,
        distributionType: 'claim',
        claimPageUrl: '/claim/1',
        criteriaForClaim: 'Hold at least 1 Base NFT',
        referralBonusPercentage: 10,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        campaignId: '2',
        projectName: 'Community Growth',
        tokenAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        totalTokens: 50000,
        distributionType: 'direct',
        claimPageUrl: '/claim/2',
        criteriaForClaim: 'Follow on Farcaster',
        referralBonusPercentage: 15,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    setCampaigns(sampleCampaigns)
  }, [])

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = async () => {
    const result = await addFrame()
    if (result) {
      setFrameAdded(true)
      await sendNotification({
        title: 'AirdropFlow Added! 🎉',
        body: 'Start creating your first airdrop campaign',
      })
    }
  }

  const handleCreateCampaign = (campaignData: Omit<AirdropFlow.AirdropCampaign, 'campaignId' | 'createdAt' | 'updatedAt'>) => {
    const newCampaign: AirdropFlow.AirdropCampaign = {
      ...campaignData,
      campaignId: (campaigns.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setCampaigns([...campaigns, newCampaign])
    setShowCreateModal(false)
    setActiveView('campaigns')
  }

  // Primary button configuration
  usePrimaryButton(
    { text: 'Create Campaign' },
    () => setShowCreateModal(true)
  )

  const saveFrameButton = context && !context.client.added ? (
    <button
      onClick={handleAddFrame}
      className="btn-outline text-sm"
    >
      + Save Frame
    </button>
  ) : frameAdded ? (
    <div className="flex items-center space-x-1 text-sm font-medium text-primary animate-fade-in">
      <span>✓ Saved</span>
    </div>
  ) : null

  const renderView = () => {
    switch (activeView) {
      case 'create':
        return (
          <div className="space-y-xl">
            <h2 className="text-heading">Create New Campaign</h2>
            <CreateCampaignModal
              isOpen={true}
              onClose={() => setActiveView('dashboard')}
              onSubmit={handleCreateCampaign}
            />
          </div>
        )
      case 'campaigns':
        return (
          <div className="space-y-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-heading">Your Campaigns</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                New Campaign
              </button>
            </div>
            <div className="grid gap-lg">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.campaignId}
                  campaign={campaign}
                  onView={() => openUrl(`/campaign/${campaign.campaignId}`)}
                />
              ))}
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-xl">
            <Hero onCreateCampaign={() => setShowCreateModal(true)} />
            <StatsGrid campaigns={campaigns} />
            <FeatureGrid />
            {campaigns.length > 0 && (
              <div className="space-y-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-heading">Recent Campaigns</h2>
                  <button
                    onClick={() => setActiveView('campaigns')}
                    className="btn-outline"
                  >
                    View All
                  </button>
                </div>
                <div className="grid gap-lg">
                  {campaigns.slice(0, 2).map((campaign) => (
                    <CampaignCard
                      key={campaign.campaignId}
                      campaign={campaign}
                      onView={() => openUrl(`/campaign/${campaign.campaignId}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-screen-xl mx-auto px-4">
        <Header
          activeView={activeView}
          onViewChange={setActiveView}
          saveFrameButton={saveFrameButton}
        />
        
        <main className="py-xl">
          {renderView()}
        </main>

        <footer className="border-t border-gray-100 py-lg text-center">
          <button
            onClick={() => openUrl('https://base.org/builders/minikit')}
            className="text-caption hover:text-text-primary transition-colors"
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>

      {showCreateModal && (
        <CreateCampaignModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCampaign}
        />
      )}
    </div>
  )
}
