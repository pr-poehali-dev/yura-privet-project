import { useState } from 'react';
import MainMenu from '@/components/game/MainMenu';
import GameBoard from '@/components/game/GameBoard';
import Tutorial from '@/components/game/Tutorial';
import Settings from '@/components/game/Settings';

type Screen = 'menu' | 'game' | 'tutorial' | 'settings';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return (
          <MainMenu
            onPlay={() => setCurrentScreen('game')}
            onTutorial={() => setCurrentScreen('tutorial')}
            onSettings={() => setCurrentScreen('settings')}
          />
        );
      case 'game':
        return (
          <GameBoard
            difficulty={difficulty}
            onExit={() => setCurrentScreen('menu')}
          />
        );
      case 'tutorial':
        return <Tutorial onBack={() => setCurrentScreen('menu')} />;
      case 'settings':
        return (
          <Settings
            difficulty={difficulty}
            soundEnabled={soundEnabled}
            onDifficultyChange={setDifficulty}
            onSoundToggle={setSoundEnabled}
            onBack={() => setCurrentScreen('menu')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {renderScreen()}
    </div>
  );
};

export default Index;
