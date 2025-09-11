import { useStakingContext } from "@/hooks/useStakingContext"

export const useFetchUserInfo = () => {
  const { userDetails } = useStakingContext()
  return { userDetails }
};