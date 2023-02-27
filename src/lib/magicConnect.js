import { Magic } from 'magic-sdk';
import { ConnectExtension } from "@magic-ext/connect";

const customNodeOptions = {
  rpcUrl: 'https://rpc.testnet.sep.io', // Your own node URL
  chainId: 11155111, // Your own node's chainId
};

// Create client-side Magic instance
const createMagic = (key) => {
  return (
    typeof window != 'undefined' &&
    new Magic(key, {
        network: 'goerli',
        locale: "en_US",
        extensions: [new ConnectExtension()]
    })
  );
}

export const magic = createMagic(process.env.REACT_APP_MAGIC_CONNECT_PUB_KEY);