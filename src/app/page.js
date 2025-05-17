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

export default function Home() {
  const router = useRouter();
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: 40 }}>NCCU Foodie</h1>
      <button
        onClick={() => router.push('/game')}
        style={{
          fontSize: 28,
          padding: '20px 60px',
          borderRadius: 12,
          background: '#4f8cff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Start
      </button>
    </main>
  );
}


