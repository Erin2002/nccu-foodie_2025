'use client';
import { useEffect } from 'react';
import { useGameStore } from '../app/store/gameStore';
import Image from 'next/image';

export default function GameBoard() {
  const {
    cards,
    flipped,
    timeLeft,
    isGameOver,
    isSuccess,
    reset,
    flipCard,
    tick,
  } = useGameStore();

  useEffect(() => {
    reset();
    const timer = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: 32 }}>
        剩餘時間：{timeLeft} 秒
      </h2>
      <div className="card-board">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            onClick={() => flipCard(idx)}
            className={card.isFlipped || card.isMatched ? 'flipped' : ''}
          >
            {(card.isFlipped || card.isMatched) ? (
              <Image src={card.front} alt="card" fill style={{ objectFit: 'contain' }} draggable={false} />
            ) : (
              <Image src="/cards/back.svg" alt="card back" fill style={{ objectFit: 'contain' }} draggable={false} />
            )}
          </div>
        ))}
      </div>
      {isGameOver && (
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '32px 0' }}>
            {isSuccess ? '🎉 全部配對成功！' : '💥 遊戲失敗！'}
          </h2>
          <button
            onClick={reset}
            style={{
              fontSize: 24,
              padding: '12px 48px',
              marginTop: 24,
              borderRadius: 8,
              background: '#4f8cff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            再玩一次
          </button>
        </div>
      )}
    </div>
  );
}


// 'use client';
// import { useEffect } from 'react';
// import { useGameStore } from '../app/store/gameStore';

// export default function GameBoard() {
//   const {
//     cards,
//     flipped,
//     timeLeft,
//     isGameOver,
//     isSuccess,
//     reset,
//     flipCard,
//     tick,
//   } = useGameStore();

//   useEffect(() => {
//     reset();
//     const timer = setInterval(() => {
//       tick();
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
//       <h2>剩餘時間：{timeLeft} 秒</h2>
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(5, 80px)',
//         gridGap: 16,
//         justifyContent: 'center',
//         margin: '32px 0'
//       }}>
//         {cards.map((card, idx) => (
//           <div
//             key={card.id}
//             onClick={() => flipCard(idx)}
//             style={{
//               width: 80,
//               height: 120,
//               background: card.isFlipped || card.isMatched ? '#eee' : '#888',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: 32,
//               borderRadius: 8,
//               cursor: card.isFlipped || card.isMatched ? 'default' : 'pointer',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
//             }}
//           >
//             {(card.isFlipped || card.isMatched) ? card.value : ''}
//           </div>
//         ))}
//       </div>
//       {isGameOver && (
//         <div>
//           <h2>{isSuccess ? '🎉 全部配對成功！' : '💥 遊戲失敗！'}</h2>
//           <button onClick={reset} style={{ fontSize: 20, padding: '8px 32px', marginTop: 24 }}>再玩一次</button>
//         </div>
//       )}
//     </div>
//   );
// }
