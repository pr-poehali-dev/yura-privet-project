import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface TutorialProps {
  onBack: () => void;
}

const Tutorial = ({ onBack }: TutorialProps) => {
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
        <h1 className="text-2xl text-primary">ОБУЧЕНИЕ</h1>
        <div className="w-20"></div>
      </div>

      <div className="space-y-4">
        <div className="bg-card border-4 border-border p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-lg text-primary mb-2">ЦЕЛЬ ИГРЫ</h3>
              <p className="text-sm text-foreground leading-relaxed">
                Захватите все провинции на карте мира. Контролируйте континенты целиком для бонусов!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border-4 border-border p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-secondary flex items-center justify-center text-white font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-lg text-secondary mb-2">КАК АТАКОВАТЬ</h3>
              <div className="text-sm text-foreground leading-relaxed space-y-2">
                <p>• Нажмите на свою провинцию (с армией больше 1)</p>
                <p>• Выберите соседнюю провинцию врага или нейтральную</p>
                <p>• Атака происходит автоматически</p>
                <p>• Горы дают +2 защиты, учитывайте местность!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border-4 border-border p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent flex items-center justify-center text-white font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg text-accent mb-2">ЭКОНОМИКА</h3>
              <div className="text-sm text-foreground leading-relaxed space-y-2">
                <p>• Каждая провинция приносит доход золотом</p>
                <p>• Золото начисляется каждые 8 секунд</p>
                <p>• Контроль континента = бонус золота!</p>
                <p>• Покупайте армии за 15 золота в своих провинциях</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border-4 border-border p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-destructive flex items-center justify-center text-white font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="text-lg text-destructive mb-2">СТРАТЕГИЯ ИИ</h3>
              <div className="text-sm text-foreground leading-relaxed space-y-2">
                <p>• ИИ анализирует доход территорий</p>
                <p>• Приоритет - атака на ваши земли</p>
                <p>• Атакует только если силы достаточно</p>
                <p>• На высокой сложности ИИ более агрессивен</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border-4 border-border p-6">
          <div className="flex items-center gap-3 justify-center">
            <div className="w-6 h-6 bg-primary"></div>
            <span className="text-sm text-foreground">Ваши территории</span>
          </div>
          <div className="flex items-center gap-3 justify-center mt-3">
            <div className="w-6 h-6 bg-destructive"></div>
            <span className="text-sm text-foreground">Территории ИИ</span>
          </div>
          <div className="flex items-center gap-3 justify-center mt-3">
            <div className="w-6 h-6 bg-secondary/40"></div>
            <span className="text-sm text-foreground">Нейтральные</span>
          </div>
        </div>
      </div>

      <Button
        onClick={onBack}
        className="w-full h-14 text-lg bg-primary hover:bg-primary/90"
      >
        ПОНЯТНО
      </Button>
    </div>
  );
};

export default Tutorial;