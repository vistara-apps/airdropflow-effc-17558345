
'use client'

import { Zap, Users, Gift, Shield } from 'lucide-react'

interface HeroProps {
  onCreateCampaign: () => void
}

export function Hero({ onCreateCampaign }: HeroProps) {
  return (
    <div className="text-center space-y-xl">
      <div className="space-y-lg">
        <h1 className="text-display bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Streamline Your Crypto Airdrops
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Create engaging airdrop campaigns with gated claim pages, referral systems, 
          and automated token distribution on Base chain.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-md justify-center">
        <button onClick={onCreateCampaign} className="btn-primary text-lg px-xl py-lg">
          Create Your First Campaign
        </button>
        <button className="btn-outline text-lg px-xl py-lg">
          View Examples
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-lg mt-xl">
        {[
          { icon: Zap, title: 'Instant Distribution', desc: 'Automated token sending' },
          { icon: Shield, title: 'Gated Access', desc: 'Criteria-based claiming' },
          { icon: Users, title: 'Viral Growth', desc: 'Referral bonus system' },
          { icon: Gift, title: 'Base Chain', desc: 'Low fees, fast txns' },
        ].map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="text-center space-y-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{feature.title}</h3>
                <p className="text-caption">{feature.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
