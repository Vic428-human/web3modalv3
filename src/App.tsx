import { useState, useEffect } from "react";
import { createWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider, useAccount } from "wagmi";
import {
  arbitrum,
  mainnet,
  polygonAmoy,
  ancient8Sepolia,
  holesky,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Component 不曉得為什麼畫面會卡死 預計棄用
// import Component from "./composables/useEthers";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.REACT_APP_PROJECT_ID as string;
if (!projectId) {
  throw new Error("Please Provide project ID");
}

// 2. Create wagmiConfig
const metadata = {
  name: "My Awesome Dapp",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [
  mainnet,
  arbitrum,
  polygonAmoy,
  ancient8Sepolia,
  holesky,
] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  themeMode: "light",
});

export default function App({}) {
  // 1. polygon amoy: 80002 networkID
  // 2. sepolia: 11155111
  const web3State = useWeb3ModalState();

  function GameStart() {
    return (
      <>
        {/* 這邊不能直接做close，不曉得是不是官方那邊壞掉，chrome會檔 */}
        {/* <p>已經連線 </p> */}
        <w3m-button />
      </>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {web3State.selectedNetworkId ? <GameStart /> : <w3m-button />}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
