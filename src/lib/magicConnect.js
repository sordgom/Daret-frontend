import { Magic } from 'magic-sdk';
import { ConnectExtension } from "@magic-ext/connect";

// Create client-side Magic instance
const createMagic = (key) => {
  return (
    typeof window != 'undefined' &&
    new Magic(key, {
        network: "goerli",
        locale: "en_US",
        extensions: [new ConnectExtension()]
    })
  );
}

export const magic = createMagic(process.env.REACT_APP_MAGIC_CONNECT_PUB_KEY);