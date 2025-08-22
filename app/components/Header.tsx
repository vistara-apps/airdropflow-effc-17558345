
'use client'

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
import { Home, Plus, List } from 'lucide-react'

interface HeaderProps {
  activeView: 'dashboard' | 'create' | 'campaigns'
  onViewChange: (view: 'dashboard' | 'create' | 'campaigns') => void
  saveFrameButton?: React.ReactNode
}

export function Header({ activeView, onViewChange, saveFrameButton }: HeaderProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'campaigns', label: 'Campaigns', icon: List },
  ]

  return (
    <header className="border-b border-gray-100 bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex justify-between items-center py-lg">
        <div className="flex items-center space-x-xl">
          <div className="flex items-center space-x-md">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
            <h1 className="text-xl font-bold text-text-primary">AirdropFlow</h1>
          </div>
          
          <nav className="hidden md:flex space-x-md">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id as any)}
                  className={`flex items-center space-x-2 px-md py-sm rounded-md transition-colors ${
                    activeView === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-md">
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
                <EthBalance />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
          
          {saveFrameButton}
        </div>
      </div>
    </header>
  )
}
