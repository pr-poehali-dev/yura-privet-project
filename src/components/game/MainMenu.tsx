import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MainMenuProps {
  onPlay: () => void;
  onTutorial: () => void;
  onSettings: () => void;
}

const MainMenu = ({ onPlay, onTutorial, onSettings }: MainMenuProps) => {
  return (
    <div className="w-full max-w-md space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl text-primary leading-relaxed tracking-wider">
          ЗАХВАТ
          <br />
          ТЕРРИТОРИЙ
        </h1>
        <div className="flex justify-center gap-2 text-2xl">
          <span className="inline-block w-3 h-3 bg-primary rounded-sm animate-pulse"></span>
          <span className="inline-block w-3 h-3 bg-secondary rounded-sm animate-pulse delay-100"></span>
          <span className="inline-block w-3 h-3 bg-destructive rounded-sm animate-pulse delay-200"></span>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={onPlay}
          className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground border-4 border-primary/50 shadow-lg hover:scale-105 transition-transform"
        >
          <Icon name="Play" size={20} className="mr-2" />
          ИГРАТЬ
        </Button>

        <Button
          onClick={onTutorial}
          className="w-full h-14 text-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground border-4 border-secondary/50 shadow-lg hover:scale-105 transition-transform"
        >
          <Icon name="BookOpen" size={20} className="mr-2" />
          ОБУЧЕНИЕ
        </Button>

        <Button
          onClick={onSettings}
          className="w-full h-14 text-lg bg-muted hover:bg-muted/90 text-foreground border-4 border-muted/50 shadow-lg hover:scale-105 transition-transform"
        >
          <Icon name="Settings" size={20} className="mr-2" />
          НАСТРОЙКИ
        </Button>
      </div>

      <div className="text-center text-xs text-muted-foreground mt-8">
        v1.0.0 | © 2025
      </div>
    </div>
  );
};

export default MainMenu;
