import '@rainbow-me/rainbowkit/styles.css';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Home from './components/home';
import { config } from './config';
import { StakingProvider } from './contexts/StakingProvider';
import AppLayout from './layout/AppLayout';
import "./App.css";


const queryClient = new QueryClient();

const App = () => {


  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({ accentColor: '#00B0C3', accentColorForeground: 'white' })}>
          <StakingProvider>
            <AppLayout>
              <Home />
            </AppLayout>
          </StakingProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
export default App
