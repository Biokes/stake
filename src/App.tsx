import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Home from './components/home';
import { config } from './config';
import { StakingProvider } from './contexts/StakingProvider';
import AppLayout from './layout/AppLayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from '@/components/landingPage';
import Four04 from '@/components/four04';
import { Toaster } from "@/components/ui/sonner";
import Profile from '@/components/profile';
import { ThemeProvider } from './contexts/theme-provider';
const queryClient = new QueryClient();

const App = () => {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({ accentColor: '#045d67', accentColorForeground: 'white' })}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <StakingProvider>
              <Router>
                <Routes>
                  <Route path="*" element={<Four04 />} />
                  <Route element={<AppLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>

                  <Route path="/" element={<LandingPage />} />
                </Routes>
              </Router>
              <Toaster />
            </StakingProvider>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
export default App
