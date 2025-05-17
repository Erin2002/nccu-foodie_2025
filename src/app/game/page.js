// src/app/game/page.js
import GameBoard from '../../component/gameBoard';

export default function GamePage() {
  return (
    <main style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <GameBoard />
    </main>
  );
}
