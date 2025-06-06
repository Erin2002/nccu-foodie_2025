// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <div>Home</div>
//     </div>
//   );
// }

// import GameBoard from '../component/gameBoard';

// export default function Home() {
//   return (
//     <main>
//       <GameBoard />
//     </main>
//   );

// }

// src/app/page.js
'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: "url('/BG.png') center center / cover no-repeat"
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 32 }}>
        <Image
          src="/icon.svg"
          alt="NCCU Foodie Logo"
          width={160}
          height={160}
        />
      </div>
      {/* 規則說明文字區塊 */}
      <section
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 16px #0001',
          padding: '32px 40px',
          maxWidth: 440,
          textAlign: 'center',
          fontSize: 20,
          color: '#222',
          marginBottom: 40
        }}
      >
        <h2
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 20,
            letterSpacing: 1,
            color: '#895129',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <span role="img" aria-label="rule">📜</span>
          遊戲規則
        </h2>
        <ol
          style={{
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: 400,
            lineHeight: 2,
            fontSize: 18,
            paddingLeft: 24,
            color: '#222'
          }}
        >
          <li>

            點擊<span style={{ fontWeight: 'bold', color: '#895129' }}>「Start」</span>進入遊戲
          </li>
          <li>
            將政大周邊店家與他們特色料理配對
          </li>
          <li>

            點擊卡牌翻開，配對成功則保持翻開
          </li>
          <li>

            30 秒內全部配對成功即勝利
            <br></br>快來驗證自己認不認識這些政大美食吧
          </li>
        </ol>

      </section>
      {/* Start 按鈕 */}
      <button
        className="click-btn"
        onClick={() => router.push('/game')}
        style={{
          fontSize: 28,
          padding: '18px 60px',
          borderRadius: 12,
          background: '#895129',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 12px #4f8cff44'
        }}
      >
        Start
      </button>
    </main>
  );
}



