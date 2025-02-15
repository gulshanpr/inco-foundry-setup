import { BrowserProvider } from "ethers";
import { createInstance, initFhevm } from "fhevmjs";

declare global {
  interface Window {
    ethereum: any;
  }
}

let fhevmInstance: any = null;

export const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new BrowserProvider(window.ethereum);
  }
  return null;
};

export const createFhevmInstance = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  if (!fhevmInstance) {
    await initFhevm();
    fhevmInstance = await createInstance({
      chainId: 21097,
      networkUrl: "https://validator.rivest.inco.org/",
      gatewayUrl: "https://gateway.rivest.inco.org/",
      aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
    });
  }
  return fhevmInstance;
};

export const getFhevmInstance = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  if (!fhevmInstance) {
    fhevmInstance = await createFhevmInstance();
  }
  return fhevmInstance;
};