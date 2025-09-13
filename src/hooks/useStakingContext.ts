import { useContext } from 'react'
import { StakingContext } from '../contexts/StakingContext'

export const useStakingContext = () => {
  const ctx = useContext(StakingContext)
  if (!ctx) throw new Error("useStakingContext must be used inside StakingProvider")
  return ctx
}
