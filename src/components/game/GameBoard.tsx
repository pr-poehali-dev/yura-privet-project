import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Territory {
  id: number;
  owner: 'player' | 'ai' | 'neutral';
  army: number;
  income: number;
}

interface GameBoardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onExit: () => void;
}

const GRID_SIZE = 10;
const INITIAL_ARMIES = 5;

const GameBoard = ({ difficulty, onExit }: GameBoardProps) => {
  const { toast } = useToast();
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [selectedTerritory, setSelectedTerritory] = useState<number | null>(null);
  const [playerGold, setPlayerGold] = useState(100);
  const [aiGold, setAiGold] = useState(100);
  const [turn, setTurn] = useState<'player' | 'ai'>('player');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (territories.length === 0) {
      initializeGame();
    }
  }, []);

  useEffect(() => {
    if (turn === 'ai' && !isProcessing && territories.length > 0) {
      const timer = setTimeout(() => aiTurn(), 1000);
      return () => clearTimeout(timer);
    }
  }, [turn, isProcessing, territories.length]);

  useEffect(() => {
    const income = setInterval(() => {
      if (turn === 'player') {
        const playerIncome = territories
          .filter(t => t.owner === 'player')
          .reduce((sum, t) => sum + t.income, 0);
        setPlayerGold(prev => prev + playerIncome);
      }
    }, 5000);
    return () => clearInterval(income);
  }, [territories, turn]);

  const initializeGame = () => {
    const newTerritories: Territory[] = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      let owner: 'player' | 'ai' | 'neutral' = 'neutral';
      if (i === 0) owner = 'player';
      else if (i === GRID_SIZE * GRID_SIZE - 1) owner = 'ai';
      
      newTerritories.push({
        id: i,
        owner,
        army: owner === 'neutral' ? 2 : INITIAL_ARMIES,
        income: Math.floor(Math.random() * 3) + 1,
      });
    }
    setTerritories(newTerritories);
  };

  const getNeighbors = (id: number): number[] => {
    const neighbors: number[] = [];
    const row = Math.floor(id / GRID_SIZE);
    const col = id % GRID_SIZE;

    if (col > 0) neighbors.push(id - 1);
    if (col < GRID_SIZE - 1) neighbors.push(id + 1);
    if (row > 0) neighbors.push(id - GRID_SIZE);
    if (row < GRID_SIZE - 1) neighbors.push(id + GRID_SIZE);

    return neighbors;
  };

  const attackTerritory = (from: number, to: number) => {
    const fromTerr = territories[from];
    const toTerr = territories[to];

    if (fromTerr.army <= 1) {
      toast({
        title: "Недостаточно войск",
        description: "Нужно минимум 2 армии для атаки",
        variant: "destructive",
      });
      return;
    }

    const attackPower = fromTerr.army - 1;
    const defensePower = toTerr.army;

    const newTerritories = [...territories];
    
    if (attackPower > defensePower) {
      newTerritories[to] = {
        ...toTerr,
        owner: fromTerr.owner,
        army: attackPower - defensePower,
      };
      newTerritories[from] = { ...fromTerr, army: 1 };
      
      toast({
        title: "Победа! 🎉",
        description: `Территория ${to} захвачена`,
      });
    } else {
      newTerritories[to] = { ...toTerr, army: defensePower - attackPower };
      newTerritories[from] = { ...fromTerr, army: 1 };
      
      toast({
        title: "Поражение",
        description: "Атака отбита",
        variant: "destructive",
      });
    }

    setTerritories(newTerritories);
    setSelectedTerritory(null);
  };

  const aiTurn = () => {
    setIsProcessing(true);
    
    const aiTerritories = territories
      .map((t, idx) => ({ ...t, id: idx }))
      .filter(t => t.owner === 'ai' && t.army > 1);

    if (aiTerritories.length === 0) {
      setTurn('player');
      setIsProcessing(false);
      return;
    }

    const targets: { from: number; to: number; priority: number }[] = [];

    aiTerritories.forEach(terr => {
      const neighbors = getNeighbors(terr.id);
      neighbors.forEach(nId => {
        const neighbor = territories[nId];
        if (neighbor.owner !== 'ai') {
          let priority = 0;
          
          if (neighbor.owner === 'player') priority += 10;
          priority += neighbor.income * 2;
          priority += terr.army - neighbor.army;
          
          if (difficulty === 'hard') priority += neighbor.income * 3;
          if (difficulty === 'easy') priority -= 5;

          if (terr.army > neighbor.army) {
            targets.push({ from: terr.id, to: nId, priority });
          }
        }
      });
    });

    if (targets.length > 0) {
      targets.sort((a, b) => b.priority - a.priority);
      const bestTarget = targets[0];
      setTimeout(() => {
        attackTerritory(bestTarget.from, bestTarget.to);
        setTurn('player');
        setIsProcessing(false);
      }, 500);
    } else {
      setTurn('player');
      setIsProcessing(false);
    }
  };

  const handleTerritoryClick = (id: number) => {
    if (turn !== 'player' || isProcessing) return;

    const territory = territories[id];

    if (selectedTerritory === null) {
      if (territory.owner === 'player' && territory.army > 1) {
        setSelectedTerritory(id);
      }
    } else {
      const neighbors = getNeighbors(selectedTerritory);
      if (neighbors.includes(id) && territory.owner !== 'player') {
        attackTerritory(selectedTerritory, id);
      } else {
        setSelectedTerritory(null);
      }
    }
  };

  const endTurn = () => {
    if (turn === 'player') {
      setTurn('ai');
    }
  };

  const getTerritoryColor = (territory: Territory) => {
    if (territory.owner === 'player') return 'bg-primary';
    if (territory.owner === 'ai') return 'bg-destructive';
    return 'bg-secondary/40';
  };

  const playerTerritories = territories.filter(t => t.owner === 'player').length;
  const aiTerritories = territories.filter(t => t.owner === 'ai').length;

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex justify-between items-center bg-card border-4 border-border p-4">
        <Button
          onClick={onExit}
          variant="ghost"
          size="sm"
          className="text-foreground"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          ВЫХОД
        </Button>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">ХОД</div>
          <div className={`text-lg font-bold ${turn === 'player' ? 'text-primary' : 'text-destructive'}`}>
            {turn === 'player' ? 'ВАШ' : 'ИИ'}
          </div>
        </div>
        <Button
          onClick={endTurn}
          disabled={turn !== 'player' || isProcessing}
          className="bg-accent hover:bg-accent/90"
          size="sm"
        >
          ЗАВЕРШИТЬ
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-card border-4 border-border p-4">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">ЗОЛОТО</div>
          <div className="text-lg text-primary font-bold">{playerGold}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">ТЕРРИТОРИИ</div>
          <div className="text-lg font-bold">
            <span className="text-primary">{playerTerritories}</span>
            <span className="text-muted-foreground mx-1">:</span>
            <span className="text-destructive">{aiTerritories}</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">НЕЙТРАЛЬНЫЕ</div>
          <div className="text-lg text-secondary font-bold">
            {territories.filter(t => t.owner === 'neutral').length}
          </div>
        </div>
      </div>

      <div className="bg-card border-4 border-border p-4">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {territories.map((territory) => (
            <button
              key={territory.id}
              onClick={() => handleTerritoryClick(territory.id)}
              className={`
                aspect-square ${getTerritoryColor(territory)}
                border-2 border-border
                flex items-center justify-center
                text-xs font-bold text-white
                transition-all hover:scale-110
                ${selectedTerritory === territory.id ? 'ring-4 ring-foreground scale-110' : ''}
                ${turn !== 'player' ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
              `}
              disabled={turn !== 'player'}
            >
              {territory.army}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border-4 border-border p-4 text-xs text-center text-muted-foreground">
        {selectedTerritory !== null
          ? '⚔️ Выберите соседнюю территорию для атаки'
          : '🎯 Выберите свою территорию с армией > 1'}
      </div>
    </div>
  );
};

export default GameBoard;