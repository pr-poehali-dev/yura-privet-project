import { HistoryEvent } from '@/types/game';
import Icon from '@/components/ui/icon';

interface HistoryProps {
  events: HistoryEvent[];
}

const History = ({ events }: HistoryProps) => {
  const getEventIcon = (type: HistoryEvent['type']) => {
    switch (type) {
      case 'conquest':
        return <Icon name="Sword" size={16} className="text-primary" />;
      case 'defense':
        return <Icon name="Shield" size={16} className="text-destructive" />;
      case 'purchase':
        return <Icon name="ShoppingCart" size={16} className="text-secondary" />;
      case 'diplomacy':
        return <Icon name="MessageSquare" size={16} className="text-accent" />;
    }
  };

  const getEventColor = (type: HistoryEvent['type']) => {
    switch (type) {
      case 'conquest':
        return 'border-primary/50 bg-primary/5';
      case 'defense':
        return 'border-destructive/50 bg-destructive/5';
      case 'purchase':
        return 'border-secondary/50 bg-secondary/5';
      case 'diplomacy':
        return 'border-accent/50 bg-accent/5';
    }
  };

  if (events.length === 0) {
    return (
      <div className="bg-card border-4 border-border p-12 text-center">
        <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">История пуста</p>
        <p className="text-xs text-muted-foreground mt-2">
          Начните игру, чтобы увидеть события
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border-4 border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          <Icon name="Clock" size={20} />
          ИСТОРИЯ СОБЫТИЙ
        </h3>
        <div className="text-xs text-muted-foreground">
          {events.length} событий
        </div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
        {events.map((event, idx) => (
          <div
            key={`${event.timestamp}-${idx}`}
            className={`p-3 border-2 ${getEventColor(event.type)} animate-fade-in`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getEventIcon(event.type)}</div>
              <div className="flex-1">
                <div className="text-sm text-foreground leading-relaxed">
                  {event.description}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ход {event.turn}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t-2 border-border">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="Sword" size={12} className="text-primary" />
            <span className="text-muted-foreground">Захват</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={12} className="text-destructive" />
            <span className="text-muted-foreground">Защита</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={12} className="text-secondary" />
            <span className="text-muted-foreground">Покупка</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="MessageSquare" size={12} className="text-accent" />
            <span className="text-muted-foreground">Событие</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
