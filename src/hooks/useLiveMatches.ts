import { useData } from '../context/DataContext'
import type { Match } from '../types'

/** Live matches from shared store (admin edits appear here too) */
export function useLiveMatches(): Match[] {
  return useData().matches
}
