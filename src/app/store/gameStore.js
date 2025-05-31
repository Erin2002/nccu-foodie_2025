// store/useGameStore.js
import { create } from 'zustand';

// 1. 簡化卡牌定義 (只保留必要屬性)
const PAIRS = [
  {
    id: 1,
    frontA: '/cards/curry.svg',
    frontB: '/cards/curryS.svg'
  },
  {
    id: 2,
    frontA: '/cards/hamburger.svg',
    frontB: '/cards/hamburgerS.svg'
  },
  {
    id: 3,
    frontA: '/cards/hotPot.svg',
    frontB: '/cards/hotPotS.svg'
  },
  {
    id: 4,
    frontA: '/cards/milkTea.svg',
    frontB: '/cards/milkTeaS.svg'
  },
  {
    id: 5,
    frontA: '/cards/pasta.svg',
    frontB: '/cards/pastaS.svg'
  }
];

// 2. 洗牌工具函式
function shuffle(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

// 3. 產生卡牌組 (已移除 name/description)
function getInitDeck() {
  return shuffle(
    PAIRS.flatMap(pair => ([
      {
        id: `${pair.id}-A`,
        pairId: pair.id,
        front: pair.frontA,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `${pair.id}-B`,
        pairId: pair.id,
        front: pair.frontB,
        isFlipped: false,
        isMatched: false,
      }
    ]))
  );
}

// 4. Zustand Store (主要邏輯保持不變)
export const useGameStore = create((set, get) => ({
  cards: getInitDeck(),
  flipped: [],
  matched: [],
  timeLeft: 30,
  isGameOver: false,
  isSuccess: false,

  reset: () => {
    set({
      cards: getInitDeck(),
      flipped: [],
      matched: [],
      timeLeft: 30,
      isGameOver: false,
      isSuccess: false,
    });
  },

  flipCard: (index) => {
    const { cards, flipped, isGameOver } = get();
    if (isGameOver || cards[index].isFlipped || cards[index].isMatched || flipped.length === 2) return;

    const newCards = cards.slice();
    newCards[index].isFlipped = true;
    const newFlipped = [...flipped, index];
    set({ cards: newCards, flipped: newFlipped });

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [i, j] = newFlipped;
        if (newCards[i].pairId === newCards[j].pairId) {
          newCards[i].isMatched = true;
          newCards[j].isMatched = true;
          set({ 
            cards: newCards, 
            matched: [...get().matched, i, j], 
            flipped: [] 
          });
          if (newCards.every((c) => c.isMatched)) {
            set({ isGameOver: true, isSuccess: true });
          }
        } else {
          newCards[i].isFlipped = false;
          newCards[j].isFlipped = false;
          set({ cards: newCards, flipped: [] });
        }
      }, 800);
    }
  },

  tick: () => {
    const { timeLeft, isGameOver, isSuccess } = get();
    if (isGameOver || isSuccess) return;
    if (timeLeft <= 1) {
      set({ timeLeft: 0, isGameOver: true, isSuccess: false });
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },
}));


// import { create } from 'zustand';

// function shuffle(array) {
//   return array
//     .map((item) => ({ item, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ item }) => item);
// }

// const PAIRS = 5;
// const CARDS = Array.from({ length: PAIRS }, (_, i) => i + 1);
// const INIT_DECK = shuffle([...CARDS, ...CARDS]).map((num, idx) => ({
//   id: idx,
//   value: num,
//   isFlipped: false,
//   isMatched: false,
// }));

// export const useGameStore = create((set, get) => ({
//   cards: INIT_DECK,
//   flipped: [],
//   matched: [],
//   timeLeft: 30,
//   isGameOver: false,
//   isSuccess: false,
//   timer: null,

//   reset: () => {
//     const deck = shuffle([...CARDS, ...CARDS]).map((num, idx) => ({
//       id: idx,
//       value: num,
//       isFlipped: false,
//       isMatched: false,
//     }));
//     set({
//       cards: deck,
//       flipped: [],
//       matched: [],
//       timeLeft: 30,
//       isGameOver: false,
//       isSuccess: false,
//     });
//   },

//   flipCard: (index) => {
//     const { cards, flipped, isGameOver } = get();
//     if (isGameOver || cards[index].isFlipped || cards[index].isMatched || flipped.length === 2) return;

//     const newCards = cards.slice();
//     newCards[index].isFlipped = true;
//     const newFlipped = [...flipped, index];
//     set({ cards: newCards, flipped: newFlipped });

//     if (newFlipped.length === 2) {
//       setTimeout(() => {
//         const [i, j] = newFlipped;
//         if (newCards[i].value === newCards[j].value) {
//           newCards[i].isMatched = true;
//           newCards[j].isMatched = true;
//           set({ cards: newCards, matched: [...get().matched, i, j], flipped: [] });
//           // 檢查是否全部配對成功
//           if (newCards.every((c) => c.isMatched)) {
//             set({ isGameOver: true, isSuccess: true });
//           }
//         } else {
//           newCards[i].isFlipped = false;
//           newCards[j].isFlipped = false;
//           set({ cards: newCards, flipped: [] });
//         }
//       }, 800);
//     }
//   },

//   tick: () => {
//     const { timeLeft, isGameOver, isSuccess } = get();
//     if (isGameOver || isSuccess) return;
//     if (timeLeft <= 1) {
//       set({ timeLeft: 0, isGameOver: true, isSuccess: false });
//     } else {
//       set({ timeLeft: timeLeft - 1 });
//     }
//   },
// }));
