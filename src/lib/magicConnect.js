import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';

// Choose your desired L2 network: 'optimism', 'arbitrum', or 'custom'
const L2_NETWORK = 'optimism';

const networkOptions = {
  optimism: {
    rpcUrl: `https://opt-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
    chainId: 420,
  },
  arbitrum: {
    rpcUrl: 'https://goerli.arbitrum.io/rpc',
    chainId: 79377087078960,
  },
  custom: {
    rpcUrl: 'https://rpc.testnet.sep.io',
    chainId: 11155111,
  },
};

// Create client-side Magic instance
const createMagic = (key) => {
  const selectedNetwork = networkOptions[L2_NETWORK];

  return (
    typeof window !== 'undefined'
    && new Magic(key, {
      // network: 'goerli',
      network: {
        rpcUrl: selectedNetwork.rpcUrl,
        chainId: selectedNetwork.chainId,
      },
      locale: 'en_US',
      extensions: [new ConnectExtension()],
    })
  );
};

export const magic = createMagic(process.env.REACT_APP_MAGIC_CONNECT_PUB_KEY);
