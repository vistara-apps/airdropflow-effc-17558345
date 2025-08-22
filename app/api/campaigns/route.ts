
import { NextRequest, NextResponse } from 'next/server'
import { AirdropFlow } from '../../lib/types'

// Mock database - in production, use a real database
let campaigns: AirdropFlow.AirdropCampaign[] = []

export async function GET() {
  return NextResponse.json({ campaigns })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCampaign: AirdropFlow.AirdropCampaign = {
      campaignId: Date.now().toString(),
      projectName: body.projectName,
      tokenAddress: body.tokenAddress,
      totalTokens: body.totalTokens,
      distributionType: body.distributionType,
      claimPageUrl: `/claim/${Date.now()}`,
      criteriaForClaim: body.criteriaForClaim,
      referralBonusPercentage: body.referralBonusPercentage,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    campaigns.push(newCampaign)

    return NextResponse.json({ 
      success: true, 
      campaign: newCampaign 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}
