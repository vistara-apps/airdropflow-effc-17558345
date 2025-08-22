
import { NextRequest, NextResponse } from 'next/server'
import { AirdropFlow } from '../../lib/types'

// Mock database - in production, use a real database
let participants: AirdropFlow.Participant[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const campaignId = searchParams.get('campaignId')

  if (campaignId) {
    const campaignParticipants = participants.filter(p => p.campaignId === campaignId)
    return NextResponse.json({ participants: campaignParticipants })
  }

  return NextResponse.json({ participants })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newParticipant: AirdropFlow.Participant = {
      participantId: Date.now().toString(),
      campaignId: body.campaignId,
      walletAddress: body.walletAddress,
      claimedAmount: body.claimedAmount,
      referredByParticipantId: body.referredByParticipantId,
      joinedAt: new Date(),
    }

    participants.push(newParticipant)

    return NextResponse.json({ 
      success: true, 
      participant: newParticipant 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add participant' },
      { status: 500 }
    )
  }
}
