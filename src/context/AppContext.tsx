import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { FanUser, NotificationPrefs } from '../types'

interface AppContextValue {
  favouriteTeamIds: string[]
  favouriteCompetitionIds: string[]
  toggleFavourite: (teamId: string) => void
  toggleFavouriteCompetition: (id: string) => void
  isFavourite: (teamId: string) => boolean
  darkMode: boolean
  toggleDarkMode: () => void
  genderFilter: 'all' | 'men' | 'women'
  setGenderFilter: (g: 'all' | 'men' | 'women') => void
  divisionFilter: 'all' | '1st' | '2nd' | '3rd'
  setDivisionFilter: (d: 'all' | '1st' | '2nd' | '3rd') => void
  onboardingDone: boolean
  completeOnboarding: (teamIds: string[], competitionIds: string[]) => void
  notificationPrefs: NotificationPrefs
  setNotificationPrefs: (p: NotificationPrefs) => void
  fanUser: FanUser
  setFanUser: (u: FanUser) => void
  language: 'en' | 'wo'
  setLanguage: (l: 'en' | 'wo') => void
}

const AppContext = createContext<AppContextValue | null>(null)

const FAV_KEY = 'goal-gm-favourites'
const FAV_COMP_KEY = 'goal-gm-fav-comps'
const THEME_KEY = 'goal-gm-theme'
const ONBOARD_KEY = 'goal-gm-onboarded'
const NOTIF_KEY = 'goal-gm-notifs'
const USER_KEY = 'goal-gm-fan'
const LANG_KEY = 'goal-gm-lang'

const defaultNotifs: NotificationPrefs = {
  matchStart: true,
  goals: true,
  halfTime: true,
  fullTime: true,
  lineups: true,
  breakingNews: true,
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [favouriteTeamIds, setFavouriteTeamIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY)
      return raw ? (JSON.parse(raw) as string[]) : ['rdb', 'queen-c']
    } catch {
      return ['rdb', 'queen-c']
    }
  })

  const [favouriteCompetitionIds, setFavouriteCompetitionIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(FAV_COMP_KEY)
      return raw ? (JSON.parse(raw) as string[]) : ['gff-men-1']
    } catch {
      return ['gff-men-1']
    }
  })

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(THEME_KEY) === 'dark')
  const [onboardingDone, setOnboardingDone] = useState(
    () => localStorage.getItem(ONBOARD_KEY) === '1',
  )
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>('all')
  const [divisionFilter, setDivisionFilter] = useState<'all' | '1st' | '2nd' | '3rd'>('all')
  const [notificationPrefs, setNotificationPrefsState] = useState<NotificationPrefs>(() => {
    try {
      const raw = localStorage.getItem(NOTIF_KEY)
      return raw ? { ...defaultNotifs, ...(JSON.parse(raw) as NotificationPrefs) } : defaultNotifs
    } catch {
      return defaultNotifs
    }
  })
  const [fanUser, setFanUserState] = useState<FanUser>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY)
      return raw ? (JSON.parse(raw) as FanUser) : null
    } catch {
      return null
    }
  })
  const [language, setLanguageState] = useState<'en' | 'wo'>(
    () => (localStorage.getItem(LANG_KEY) as 'en' | 'wo') || 'en',
  )

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favouriteTeamIds))
  }, [favouriteTeamIds])

  useEffect(() => {
    localStorage.setItem(FAV_COMP_KEY, JSON.stringify(favouriteCompetitionIds))
  }, [favouriteCompetitionIds])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark-theme', darkMode)
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notificationPrefs))
  }, [notificationPrefs])

  const toggleFavourite = useCallback((teamId: string) => {
    setFavouriteTeamIds((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId],
    )
  }, [])

  const toggleFavouriteCompetition = useCallback((id: string) => {
    setFavouriteCompetitionIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const isFavourite = useCallback(
    (teamId: string) => favouriteTeamIds.includes(teamId),
    [favouriteTeamIds],
  )

  const toggleDarkMode = useCallback(() => setDarkMode((d) => !d), [])

  const completeOnboarding = useCallback((teamIds: string[], competitionIds: string[]) => {
    setFavouriteTeamIds(teamIds)
    setFavouriteCompetitionIds(competitionIds)
    setOnboardingDone(true)
    localStorage.setItem(ONBOARD_KEY, '1')
  }, [])

  const setNotificationPrefs = useCallback((p: NotificationPrefs) => {
    setNotificationPrefsState(p)
  }, [])

  const setFanUser = useCallback((u: FanUser) => {
    setFanUserState(u)
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u))
    else localStorage.removeItem(USER_KEY)
  }, [])

  const setLanguage = useCallback((l: 'en' | 'wo') => {
    setLanguageState(l)
    localStorage.setItem(LANG_KEY, l)
  }, [])

  const value = useMemo(
    () => ({
      favouriteTeamIds,
      favouriteCompetitionIds,
      toggleFavourite,
      toggleFavouriteCompetition,
      isFavourite,
      darkMode,
      toggleDarkMode,
      genderFilter,
      setGenderFilter,
      divisionFilter,
      setDivisionFilter,
      onboardingDone,
      completeOnboarding,
      notificationPrefs,
      setNotificationPrefs,
      fanUser,
      setFanUser,
      language,
      setLanguage,
    }),
    [
      favouriteTeamIds,
      favouriteCompetitionIds,
      toggleFavourite,
      toggleFavouriteCompetition,
      isFavourite,
      darkMode,
      toggleDarkMode,
      genderFilter,
      divisionFilter,
      onboardingDone,
      completeOnboarding,
      notificationPrefs,
      setNotificationPrefs,
      fanUser,
      setFanUser,
      language,
      setLanguage,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
