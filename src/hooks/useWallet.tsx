import { useAccount } from "wagmi";

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
