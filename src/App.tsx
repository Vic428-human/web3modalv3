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
// import { useWallet } from "./hooks/useWallet";

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
  allWallets: "SHOW",
  featuredWalletIds: [
    "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
    "b642ab6de0fe5c7d1e4a2b2821c9c807a81d0f6fd42ee3a75e513ea16e91151c",
    "42d72b6b34411dfacdf5364c027979908f971fc60251a817622b7bdb44a03106",
  ],
});

export default function App({}) {
  // 1. polygon amoy: 80002 networkID
  // 2. sepolia: 11155111
  const web3State = useWeb3ModalState();

  function GameStart() {
    return (
      <>
        {/* <button onClick={handlePublishProposalClick}></button> */}
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

export interface IUseWallet {
  connectorName: string;
  isConnected: boolean;
  status: "connecting" | "reconnecting" | "connected" | "disconnected";
  address: string | null;
  chainId: number;
}
export const useWallet = (): IUseWallet => {
  const {
    address,
    status: wagmiStatus,
    isConnected,
    connector,
    chain,
  } = useAccount();
  const chainId = chain?.id || 0;

  return {
    connectorName: connector?.name || "",
    isConnected,
    status: wagmiStatus,
    address: address as string,
    chainId,
  };
};
