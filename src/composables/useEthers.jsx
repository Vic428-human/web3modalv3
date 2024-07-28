import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalState,
  useWeb3ModalTheme,
} from "@web3modal/wagmi/react";

export default function Component() {
  const { open, close } = useWeb3Modal();
  const web3State = useWeb3ModalState();
  const { walletInfo } = useWalletInfo();

  //   Wallet Connect Theme
  const { setThemeMode, setThemeVariables, themeMode, themeVariables } =
    useWeb3ModalTheme();

  setThemeMode("dark");

  setThemeVariables({
    "--w3m-color-mix": "#000000",
    "--w3m-color-mix-strength": 20,
  });

  const openAccount = () => {
    open({ view: "Account" });
  };

  function selectNetwork() {
    open({ view: "Networks" });
  }

  function selectedNetworkId() {
    console.log("selected network:", web3State.selectedNetworkId);
    return web3State.selectedNetworkId;
  }

  return {
    open,
    close,
    openAccount,
    selectNetwork,
    web3State,
    walletInfo,
    selectedNetworkId,
  };
}
