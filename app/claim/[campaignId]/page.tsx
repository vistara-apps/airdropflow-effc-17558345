
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  useMiniKit,
  usePrimaryButton,
  useNotification,
} from '@coinbase/onchainkit/minikit'
import {
  Name,
  Identity,
  Address,
  Avatar,
} from '@coinbase/onchainkit/identity'
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import { Gift, Users, CheckCircle, ExternalLink } from 'lucide-react'
import { AirdropFlow } from '../../lib/types'

export default function ClaimPage() {
  const params = useParams()
  const campaignId = params.campaignId as string
  const { setFrameReady, isFrameReady } = useMiniKit()
  const sendNotification = useNotification()
  
  const [campaign, setCampaign] = useState<AirdropFlow.AirdropCampaign | null>(null)
  const [isEligible, setIsEligible] = useState(false)
  const [hasClaimed, setHasClaimed] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [claimAmount] = useState(1000) // Mock claim amount

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  // Mock campaign data
  useEffect(() => {
    const mockCampaign: AirdropFlow.AirdropCampaign = {
      campaignId,
      projectName: 'Base Creator Rewards',
      tokenAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      totalTokens: 100000,
      distributionType: 'claim',
      claimPageUrl: `/claim/${campaignId}`,
      criteriaForClaim: 'Hold at least 1 Base NFT',
      referralBonusPercentage: 10,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setCampaign(mockCampaign)
  }, [campaignId])

  const checkEligibility = async () => {
    setIsChecking(true)
    // Mock eligibility check - in production, this would call APIs
    setTimeout(() => {
      setIsEligible(true)
      setIsChecking(false)
    }, 2000)
  }

  const handleClaim = async () => {
    try {
      // Mock claiming process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setHasClaimed(true)
      await sendNotification({
        title: 'Airdrop Claimed! 🎉',
        body: `You've successfully claimed ${claimAmount.toLocaleString()} tokens`,
      })
    } catch (error) {
      console.error('Failed to claim:', error)
    }
  }

  // Primary button configuration
  usePrimaryButton(
    {
      text: hasClaimed 
        ? 'Claimed ✓' 
        : isEligible 
          ? 'Claim Airdrop' 
          : 'Check Eligibility'
    },
    () => {
      if (hasClaimed) return
      if (isEligible) {
        handleClaim()
      } else {
        checkEligibility()
      }
    }
  )

  if (!campaign) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Loading campaign...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-2xl mx-auto px-4 py-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-xl">
          <div className="flex items-center space-x-md">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
            <span className="font-semibold text-text-primary">AirdropFlow</span>
          </div>
          
          <Wallet className="z-10">
            <ConnectWallet>
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6" />
                <Name className="text-sm font-medium" />
              </div>
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>

        {/* Main Content */}
        <div className="space-y-xl">
          {/* Campaign Header */}
          <div className="text-center space-y-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-md">
                {campaign.projectName}
              </h1>
              <p className="text-text-secondary">
                Claim your airdrop tokens by meeting the eligibility criteria
              </p>
            </div>
          </div>

          {/* Status Card */}
          <div className="card">
            {hasClaimed ? (
              <div className="text-center space-y-lg">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-md">
                    Successfully Claimed!
                  </h2>
                  <p className="text-text-secondary mb-lg">
                    You've received {claimAmount.toLocaleString()} tokens in your wallet
                  </p>
                  <button className="btn-outline">
                    <ExternalLink size={16} className="mr-2" />
                    View Transaction
                  </button>
                </div>
              </div>
            ) : isEligible ? (
              <div className="text-center space-y-lg">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                <div>
                  <h2 className="text-xl font-bold text-text-primary mb-md">
                    You're Eligible!
                  </h2>
                  <p className="text-text-secondary mb-lg">
                    You can claim {claimAmount.toLocaleString()} tokens
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-md p-md">
                    <p className="text-sm text-green-700">
                      ✓ Meets criteria: {campaign.criteriaForClaim}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-lg">
                <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-primary mb-md">
                    Check Your Eligibility
                  </h2>
                  <p className="text-text-secondary mb-lg">
                    We'll verify if you meet the campaign requirements
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-md">
                    <p className="text-sm text-blue-700">
                      Required: {campaign.criteriaForClaim}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="card">
              <h3 className="font-semibold text-text-primary mb-md">Campaign Details</h3>
              <div className="space-y-md">
                <div>
                  <p className="text-caption">Total Pool</p>
                  <p className="font-medium text-text-primary">
                    {campaign.totalTokens.toLocaleString()} tokens
                  </p>
                </div>
                <div>
                  <p className="text-caption">Distribution Type</p>
                  <p className="font-medium text-text-primary capitalize">
                    {campaign.distributionType}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-text-primary mb-md">Referral Bonus</h3>
              <div className="space-y-md">
                <div>
                  <p className="text-caption">Bonus Rate</p>
                  <p className="font-medium text-text-primary">
                    {campaign.referralBonusPercentage}%
                  </p>
                </div>
                <div>
                  <p className="text-caption">Share Link</p>
                  <button className="text-sm text-primary hover:underline">
                    Copy referral link
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isChecking && (
            <div className="text-center py-xl">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-md"></div>
              <p className="text-text-secondary">Checking eligibility...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-xl pt-xl border-t border-gray-100">
          <p className="text-caption">
            Powered by AirdropFlow on Base
          </p>
        </div>
      </div>
    </div>
  )
}
