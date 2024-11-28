"use client"; // この行を追加

import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

// 型を指定（getProvidersの返り値の型）
type ProvidersType = Awaited<ReturnType<typeof getProviders>>;

export default function SignInClient() {
  const [providers, setProviders] = useState<ProvidersType | null>(null);


  useEffect(() => {
    const fetchProviders = async () => {
        const res = await getProviders();
        setProviders(res); // providersを設定
    };

    void fetchProviders(); // 非同期関数の呼び出し

  }, []); // 空の依存配列でコンポーネントの初回レンダリング時に実行

  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="min-h-screen bg-olive-one p-0 selection:bg-green-two md:py-24 md:px-8">
        <div className="flex flex-col items-center space-y-20 pt-40">

        <div className="text-center">
            <div className="mx-auto max-w-3xl">
              <div className="flexjustify-center"></div>
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="inline-flex w-full cursor-pointer items-center justify-center rounded-md p-4 text-xl font-bold hover:text-green-five"
                    // このボタンを押すと GitHub による認証が行われます
                    // また、認証後のリダイレクト先をルートパスに設定しています
                    onClick={() =>
                      void signIn(provider.id, {
                        callbackUrl: "/",
                      })
                    }
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
      ))}
      </div>
      </div>
      </div>
      </div>
    
  );
}
