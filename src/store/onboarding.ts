import { OnboardingStep } from '@/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface Store {
  currentOnboardingPage: OnboardingStep
  isOnboardingCompleted: boolean
  langSpeak: string[]
  location: string
}

interface Actions {
  setCurrentOnboardingPage: (step: OnboardingStep) => void
  setIsOnboardingCompleted: (value: boolean) => void
  setLangSpeak: (value: string[]) => void
  setLocation: (value: string) => void
}

export const useOnboardingStore = create<Store & Actions>()(
  persist(
    (set) => ({
      currentOnboardingPage: OnboardingStep.AppLanguage,
      isOnboardingCompleted: false,
      langSpeak: [],
      location: '',
      setCurrentOnboardingPage: (step: OnboardingStep) =>
        set({ currentOnboardingPage: step }),
      setIsOnboardingCompleted: (value: boolean) =>
        set({ isOnboardingCompleted: value }),
      setLangSpeak: (value: string[]) => set({ langSpeak: value }),
      setLocation: (value: string) => set({ location: value }),
    }),
    { name: 'onboarding', storage: createJSONStorage(() => localStorage) },
  ),
)
