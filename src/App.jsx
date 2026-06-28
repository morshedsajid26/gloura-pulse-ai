import React from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CallRecordings from './pages/CallRecordings';
import CallAnalytics from './pages/CallAnalytics';
import AISummaries from './pages/AISummaries';
import Agents from './pages/Agents';
import TeamAccess from './pages/TeamAccess';
import AccountSettings from './pages/AccountSettings';
import SplashScreen from './components/SplashScreen';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import OTPVerify from './pages/auth/OTPVerify';
import SetNewPassword from './pages/auth/SetNewPassword';

const AuthenticatedApp = () => {
  const [splashDone, setSplashDone] = React.useState(false);
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (!splashDone) return <SplashScreen onDone={() => setSplashDone(true)} />;

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recordings" element={<CallRecordings />} />
        <Route path="/analytics" element={<CallAnalytics />} />
        <Route path="/summaries" element={<AISummaries />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/team" element={<TeamAccess />} />
        <Route path="/settings" element={<AccountSettings />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verify" element={<OTPVerify />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="*" element={<AuthenticatedApp />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App