
export namespace AirdropFlow {
  export interface AirdropCampaign {
    campaignId: string
    projectName: string
    tokenAddress: string
    totalTokens: number
    distributionType: 'direct' | 'claim'
    claimPageUrl: string
    criteriaForClaim: string
    referralBonusPercentage: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
  }

  export interface Participant {
    participantId: string
    campaignId: string
    walletAddress: string
    claimedAmount: number
    referredByParticipantId?: string
    joinedAt: Date
  }

  export interface CampaignStats {
    totalCampaigns: number
    totalDistributed: number
    totalParticipants: number
    totalReferrals: number
  }

  export interface CreateCampaignData {
    projectName: string
    tokenAddress: string
    totalTokens: number
    distributionType: 'direct' | 'claim'
    criteriaForClaim: string
    referralBonusPercentage: number
  }
}
