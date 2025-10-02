import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Home from './components/home';
import { config } from './config';
import { StakingProvider } from './contexts/StakingProvider';
import AppLayout from './layout/AppLayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Four04 from "./components/four04";
const queryClient = new QueryClient();

const App = () => {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <StakingProvider>
            <Router>
              <Routes>
                <Route path="*" element={Four04} />
                <Route path="/" element={
                  <AppLayout>
                    <Home />
                  </AppLayout>
                } />
                {/* <Route path="/chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} /> */}
              </Routes>
            </Router>
          </StakingProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
export default App
