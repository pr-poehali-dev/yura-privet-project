import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';

interface SettingsProps {
  difficulty: 'easy' | 'medium' | 'hard';
  soundEnabled: boolean;
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onSoundToggle: (enabled: boolean) => void;
  onBack: () => void;
}

const Settings = ({
  difficulty,
  soundEnabled,
  onDifficultyChange,
  onSoundToggle,
  onBack,
}: SettingsProps) => {
  return (
    <div className="w-full max-w-2xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between bg-card border-4 border-border p-4">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-foreground"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          НАЗАД
        </Button>
        <h1 className="text-2xl text-primary">НАСТРОЙКИ</h1>
        <div className="w-20"></div>
      </div>

      <div className="bg-card border-4 border-border p-6 space-y-6">
        <div>
          <h3 className="text-lg text-foreground mb-4 flex items-center gap-2">
            <Icon name="Target" size={20} />
            СЛОЖНОСТЬ
          </h3>
          <div className="space-y-3">
            <Button
              onClick={() => onDifficultyChange('easy')}
              className={`w-full h-12 text-base ${
                difficulty === 'easy'
                  ? 'bg-primary text-primary-foreground border-4 border-primary/50'
                  : 'bg-muted text-foreground border-4 border-muted/50'
              }`}
            >
              ЛЕГКО
            </Button>
            <Button
              onClick={() => onDifficultyChange('medium')}
              className={`w-full h-12 text-base ${
                difficulty === 'medium'
                  ? 'bg-secondary text-secondary-foreground border-4 border-secondary/50'
                  : 'bg-muted text-foreground border-4 border-muted/50'
              }`}
            >
              СРЕДНЕ
            </Button>
            <Button
              onClick={() => onDifficultyChange('hard')}
              className={`w-full h-12 text-base ${
                difficulty === 'hard'
                  ? 'bg-destructive text-destructive-foreground border-4 border-destructive/50'
                  : 'bg-muted text-foreground border-4 border-muted/50'
              }`}
            >
              СЛОЖНО
            </Button>
          </div>
        </div>

        <div className="border-t-4 border-border pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Volume2" size={20} className="text-foreground" />
              <span className="text-base text-foreground">ЗВУК</span>
            </div>
            <Switch
              checked={soundEnabled}
              onCheckedChange={onSoundToggle}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        <div className="border-t-4 border-border pt-6">
          <h3 className="text-sm text-muted-foreground mb-3">ОПИСАНИЕ СЛОЖНОСТИ</h3>
          <div className="space-y-3 text-xs text-foreground leading-relaxed">
            <div className="bg-background p-3 border-2 border-border">
              <span className="text-primary font-bold">ЛЕГКО:</span> ИИ делает случайные ходы, не оценивает доход территорий
            </div>
            <div className="bg-background p-3 border-2 border-border">
              <span className="text-secondary font-bold">СРЕДНЕ:</span> ИИ анализирует доход и силу, атакует стратегически
            </div>
            <div className="bg-background p-3 border-2 border-border">
              <span className="text-destructive font-bold">СЛОЖНО:</span> ИИ максимально агрессивен, приоритет на богатые земли
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={onBack}
        className="w-full h-14 text-lg bg-accent hover:bg-accent/90"
      >
        СОХРАНИТЬ
      </Button>
    </div>
  );
};

export default Settings;
