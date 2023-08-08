import { useOnboardingStore } from '@/store/onboarding'
import { RoutePath } from '@/types'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useEffect } from 'react'

interface IProps {
  children: ReactElement
}

const ProtectedRoute = ({ children }: IProps) => {
  const { isOnboardingCompleted } = useOnboardingStore((state) => state)
  const router = useRouter()

  useEffect(() => {
    if (!isOnboardingCompleted) {
      router.push(RoutePath.Onboarding)
    }
  }, [isOnboardingCompleted, router])

  return children
}

export default ProtectedRoute
