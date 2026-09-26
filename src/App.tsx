import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminDashboard } from './admin/AdminDashboard'
import {
  AdminAuditPage,
  AdminCompetitionsPage,
  AdminNewsPage,
  AdminPlayersPage,
  AdminStreamsPage,
  AdminTeamsPage,
  AdminUsersPage,
} from './admin/AdminDataPages'
import { AdminFixturesPage } from './admin/AdminFixturesPage'
import { AdminLineupsPage } from './admin/AdminLineupsPage'
import { AdminLiveControl, AdminLiveList } from './admin/AdminLiveControl'
import { AdminLoginPage } from './admin/AdminLoginPage'
import { AdminShell } from './admin/AdminShell'
import { AppShell } from './components/AppShell'
import { AppProvider, useApp } from './context/AppContext'
import { DataProvider } from './context/DataContext'
import { ArchivePage } from './pages/ArchivePage'
import { CompetitionDetailPage } from './pages/CompetitionDetailPage'
import { CompetitionsPage } from './pages/CompetitionsPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { MatchDetailPage } from './pages/MatchDetailPage'
import { MorePage } from './pages/MorePage'
import { MyMatchesPage } from './pages/MyMatchesPage'
import { NewsArticlePage } from './pages/NewsArticlePage'
import { NewsPage } from './pages/NewsPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { PlayerProfilePage } from './pages/PlayerProfilePage'
import { SearchPage } from './pages/SearchPage'
import { TeamPage } from './pages/TeamPage'

function FanRoutes() {
  const { onboardingDone } = useApp()

  return (
    <Routes>
      <Route path="onboarding" element={<OnboardingPage />} />
      {!onboardingDone ? (
        <Route path="*" element={<Navigate to="/app/onboarding" replace />} />
      ) : (
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="match/:id" element={<MatchDetailPage />} />
          <Route path="competitions" element={<CompetitionsPage />} />
          <Route path="competitions/:id" element={<CompetitionDetailPage />} />
          <Route path="team/:id" element={<TeamPage />} />
          <Route path="player/:id" element={<PlayerProfilePage />} />
          <Route path="my-matches" element={<MyMatchesPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewsArticlePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="archive" element={<ArchivePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="more" element={<MorePage />} />
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Route>
      )}
    </Routes>
  )
}

export default function App() {
  return (
    <DataProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/app" replace />} />
            <Route path="/app/*" element={<FanRoutes />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminShell />}>
              <Route index element={<AdminDashboard />} />
              <Route path="live" element={<AdminLiveList />} />
              <Route path="live/:id" element={<AdminLiveControl />} />
              <Route path="fixtures" element={<AdminFixturesPage />} />
              <Route path="lineups" element={<AdminLineupsPage />} />
              <Route path="competitions" element={<AdminCompetitionsPage />} />
              <Route path="teams" element={<AdminTeamsPage />} />
              <Route path="players" element={<AdminPlayersPage />} />
              <Route path="news" element={<AdminNewsPage />} />
              <Route path="streams" element={<AdminStreamsPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="audit" element={<AdminAuditPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </DataProvider>
  )
}
