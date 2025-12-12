# Quick Start Guide - MetaMask Integration

## 🚀 Running the App

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev:client
```

**App URL**: http://localhost:8080

## 🧪 Testing the Wallet Connection

### Scenario 1: MetaMask Installed ✅
1. Click "Connect Wallet" button (in nav bar or hero section)
2. Click "MetaMask" in the modal
3. Approve connection in MetaMask popup
4. See your address displayed: `0xabc...123`

### Scenario 2: MetaMask Not Installed ⚠️
1. Click "Connect Wallet" button
2. See warning message in modal
3. Click button to install MetaMask
4. Install extension and retry

### Scenario 3: User Rejects Connection ❌
1. Click "Connect Wallet"
2. Click "MetaMask"
3. Click "Reject" in MetaMask popup
4. See error toast: "Connection rejected"

### Scenario 4: Account Switch 🔄
1. Connect wallet (as above)
2. Open MetaMask and switch accounts
3. App automatically updates to show new address
4. See toast: "Account switched successfully"

## 📂 Key Files

```
src/
├── contexts/
│   └── WalletContext.tsx          # Wallet state management
├── components/
│   ├── WalletConnectModal.tsx     # Connection modal UI
│   ├── Navigation.tsx             # Nav with wallet button
│   └── Hero.tsx                   # Landing page wallet button
└── App.tsx                        # WalletProvider wrapper
```

## 🎯 What to Look For

✅ **Modal opens** when clicking "Connect Wallet"
✅ **MetaMask icon** visible in modal
✅ **Address displayed** after connection (0xabc...123)
✅ **Button text changes** from "Connect Wallet" to address
✅ **Toast notifications** for success/error/switching
✅ **Install link** appears if MetaMask not found
✅ **Auto-reconnect** on page refresh (if previously connected)

## 🔧 Tech Stack

- React 18 + TypeScript
- Vite (dev server)
- Tailwind CSS + Shadcn UI
- window.ethereum API (MetaMask)
- React Context API

## ⚡ No Additional Dependencies Required

The implementation uses the native MetaMask API (`window.ethereum`) without Web3.js or Ethers.js, as requested.

---

**Ready to test!** 🎉
