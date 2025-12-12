import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

const WalletConnectModal = () => {
  const { showConnectModal, setShowConnectModal, connectWallet, isConnecting, account } = useWallet();

  const handleMetaMaskClick = () => {
    console.log("MetaMask button clicked!", { hasEthereum: !!window.ethereum });
    if (!window.ethereum) {
      console.log("No window.ethereum found, opening install page");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    console.log("Calling connectWallet...");
    connectWallet();
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Dialog open={showConnectModal} onOpenChange={setShowConnectModal}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {account ? "Wallet Connected" : "Connect Wallet"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {account 
              ? "Your wallet is successfully connected to CoreX" 
              : "Select a wallet provider to connect to CoreX DeFi platform"}
          </DialogDescription>
        </DialogHeader>

        {account ? (
          <div className="space-y-4 py-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Connected Address</p>
                  <p className="text-lg font-mono font-semibold text-white">
                    {formatAddress(account)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Network</span>
              <span className="text-white font-medium">Ethereum Mainnet</span>
            </div>

            <Button 
              onClick={() => setShowConnectModal(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-3 py-4">
            <Button
              onClick={handleMetaMaskClick}
              disabled={isConnecting}
              className="w-full h-16 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white justify-between group"
              variant="outline"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-6 h-6" fill="white">
                    <path d="M32.8 5.7L22.4 13.5l1.9-4.5z" />
                    <path d="M7.2 5.7l10.3 7.9-1.8-4.6zM28.4 27.2l-2.7 4.1 5.7 1.6 1.6-5.6zM7.1 27.3l1.6 5.6 5.7-1.6-2.7-4.1z" />
                    <path d="M14.1 17.5l-1.6 2.4 5.6.2-.2-6zM25.9 17.5l-4-3.5-.1 6.1 5.6-.2zM14.4 31.3l3.4-1.7-3-2.3zM22.1 29.6l3.5 1.7-.5-4z" />
                    <path d="M25.6 31.3l-3.5-1.7.3 2.2-.1.5zM14.4 31.3l3.3 1-.1-.5.2-2.2z" />
                    <path d="M17.8 24.5l-2.8-.8.2-3.1 3 .9zM22.1 24.5l1.6-2.8 3-.9.2 3.1z" />
                    <path d="M22.1 29.6l.5-4-3.5-2.5h5.1l-3.5 2.5.4 4 3-1.3zM15 25.7l3 1.3.4-4-3.5-2.5h5.1l-3.5 2.5-.5 4 3-1.3z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold">MetaMask</p>
                  <p className="text-xs text-slate-400">
                    {window.ethereum ? "Connect to your MetaMask wallet" : "Install MetaMask extension"}
                  </p>
                </div>
              </div>
              {!window.ethereum && <ExternalLink className="h-4 w-4 text-slate-400" />}
            </Button>

            {!window.ethereum && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <p className="text-sm text-yellow-500/90 flex items-start gap-2">
                  <span className="text-lg">⚠️</span>
                  <span>
                    MetaMask is not installed. Click the button above to install the MetaMask browser extension.
                  </span>
                </p>
              </div>
            )}

            <div className="pt-4 text-center">
              <p className="text-xs text-slate-500">
                By connecting your wallet, you agree to CoreX's Terms of Service
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectModal;
