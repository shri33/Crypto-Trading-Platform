/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
  isMetaMask?: boolean;
}

interface WalletContextType {
  account: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  showConnectModal: boolean;
  setShowConnectModal: (show: boolean) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const handleAccountsChanged = (accounts: unknown) => {
    const accountArray = accounts as string[];
    if (accountArray.length === 0) {
      setAccount(null);
      toast.info("Wallet disconnected");
    } else if (accountArray[0] !== account) {
      setAccount(accountArray[0]);
      toast.success("Account switched successfully");
    }
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if (!window.ethereum) return;
        const accounts = (await window.ethereum.request({ method: "eth_accounts" })) as string[];
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };

    checkIfWalletIsConnected();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not detected", {
        description: "Please install MetaMask to connect your wallet",
        action: {
          label: "Install MetaMask",
          onClick: () => window.open("https://metamask.io/download/", "_blank"),
        },
      });
      return;
    }

    setIsConnecting(true);

    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setShowConnectModal(false);
        toast.success("Wallet connected successfully", {
          description: `Connected to ${formatAddress(accounts[0])}`,
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      const err = error as { code?: number; message?: string };

      if (err.code === 4001) {
        toast.error("Connection rejected", {
          description: "You rejected the wallet connection request",
        });
      } else if (err.code === -32002) {
        toast.warning("Connection pending", {
          description: "Please check MetaMask for a pending connection request",
        });
      } else {
        toast.error("Failed to connect wallet", {
          description: err.message || "An unexpected error occurred",
        });
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    toast.info("Wallet disconnected");
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const value = {
    account,
    isConnecting,
    connectWallet,
    disconnectWallet,
    showConnectModal,
    setShowConnectModal,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
