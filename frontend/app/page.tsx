"use client";
import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function Home() {

  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  return (
    <main className="min-h-screen flex flex-col p-4">
      <div className="w-[300px] mx-auto py-4 px-2">
        <h1 className="text-2xl font-bold text-center mb-4">Frames for FHE based private nft metadata</h1>
      </div>
    </main>
  );
}
