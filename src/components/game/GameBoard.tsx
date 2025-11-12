import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Province, GameStats, HistoryEvent } from '@/types/game';
import { WORLD_MAP, CONTINENT_BONUS, TERRAIN_BONUS } from '@/data/worldMap';
import WorldMap from './WorldMap';
import Statistics from './Statistics';
import History from './History';

interface GameBoardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onExit: () => void;
}

const INITIAL_ARMIES = 10;
const ARMY_COST = 15;

const GameBoard = ({ difficulty, onExit }: GameBoardProps) => {
  const { toast } = useToast();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [playerGold, setPlayerGold] = useState(150);
  const [aiGold, setAiGold] = useState(150);
  const [turn, setTurn] = useState<'player' | 'ai'>('player');
  const [isProcessing, setIsProcessing] = useState(false);
  const [turnNumber, setTurnNumber] = useState(1);
  const [stats, setStats] = useState<GameStats>({
    turn: 1,
    territoriesConquered: 0,
    territoriesLost: 0,
    battlesWon: 0,
    battlesLost: 0,
    goldSpent: 0,
    goldEarned: 0,
  });
  const [history, setHistory] = useState<HistoryEvent[]>([]);

  useEffect(() => {
    if (provinces.length === 0) {
      initializeGame();
    }
  }, []);

  useEffect(() => {
    if (turn === 'ai' && !isProcessing && provinces.length > 0) {
      const timer = setTimeout(() => aiTurn(), 1500);
      return () => clearTimeout(timer);
    }
  }, [turn, isProcessing, provinces.length]);

  useEffect(() => {
    const income = setInterval(() => {
      if (turn === 'player') {
        const playerIncome = calculateIncome('player');
        setPlayerGold(prev => prev + playerIncome);
        setStats(prev => ({ ...prev, goldEarned: prev.goldEarned + playerIncome }));
      }
    }, 8000);
    return () => clearInterval(income);
  }, [provinces, turn]);

  const initializeGame = () => {
    const newProvinces: Province[] = WORLD_MAP.map((template, idx) => ({
      ...template,
      owner: idx === 0 ? 'player' : idx === WORLD_MAP.length - 1 ? 'ai' : 'neutral',
      army: idx === 0 || idx === WORLD_MAP.length - 1 ? INITIAL_ARMIES : Math.floor(Math.random() * 4) + 2,
    }));
    setProvinces(newProvinces);
    addHistoryEvent('diplomacy', 'Игра начата! Захватите мир!');
  };

  const calculateIncome = (owner: 'player' | 'ai'): number => {
    const ownedProvinces = provinces.filter(p => p.owner === owner);
    let income = ownedProvinces.reduce((sum, p) => sum + p.income, 0);

    Object.entries(CONTINENT_BONUS).forEach(([continent, data]) => {
      const continentProvinces = provinces.filter(p => p.continent === continent);
      const ownedInContinent = continentProvinces.filter(p => p.owner === owner);
      if (continentProvinces.length === ownedInContinent.length) {
        income += data.bonus;
      }
    });

    return income;
  };

  const addHistoryEvent = (type: HistoryEvent['type'], description: string) => {
    setHistory(prev => [
      { turn: turnNumber, type, description, timestamp: Date.now() },
      ...prev,
    ].slice(0, 50));
  };

  const attackProvince = (from: number, to: number) => {
    const fromProv = provinces.find(p => p.id === from);
    const toProv = provinces.find(p => p.id === to);
    if (!fromProv || !toProv) return;

    if (fromProv.army <= 1) {
      toast({
        title: "Недостаточно войск",
        description: "Нужно минимум 2 армии для атаки",
        variant: "destructive",
      });
      return;
    }

    const attackPower = fromProv.army - 1;
    const defenseBonus = TERRAIN_BONUS[toProv.terrain].defense;
    const defensePower = toProv.army + defenseBonus;

    const newProvinces = provinces.map(p => {
      if (p.id === to) {
        if (attackPower > defensePower) {
          const isPlayer = fromProv.owner === 'player';
          setStats(prev => ({
            ...prev,
            battlesWon: isPlayer ? prev.battlesWon + 1 : prev.battlesWon,
            territoriesConquered: isPlayer ? prev.territoriesConquered + 1 : prev.territoriesConquered,
          }));
          addHistoryEvent('conquest', `${fromProv.name} захватил ${toProv.name}`);
          toast({
            title: "Победа! 🎉",
            description: `${toProv.name} захвачена`,
          });
          return { ...p, owner: fromProv.owner, army: attackPower - defensePower };
        } else {
          const isPlayer = fromProv.owner === 'player';
          setStats(prev => ({
            ...prev,
            battlesLost: isPlayer ? prev.battlesLost + 1 : prev.battlesLost,
          }));
          addHistoryEvent('defense', `${toProv.name} отбил атаку из ${fromProv.name}`);
          toast({
            title: "Поражение",
            description: `${toProv.name} устояла`,
            variant: "destructive",
          });
          return { ...p, army: defensePower - attackPower };
        }
      }
      if (p.id === from) {
        return { ...p, army: 1 };
      }
      return p;
    });

    setProvinces(newProvinces);
    setSelectedProvince(null);
  };

  const buyArmy = (provinceId: number) => {
    if (playerGold < ARMY_COST) {
      toast({
        title: "Недостаточно золота",
        description: `Нужно ${ARMY_COST} золота`,
        variant: "destructive",
      });
      return;
    }

    const province = provinces.find(p => p.id === provinceId);
    if (!province || province.owner !== 'player') return;

    setPlayerGold(prev => prev - ARMY_COST);
    setStats(prev => ({ ...prev, goldSpent: prev.goldSpent + ARMY_COST }));
    setProvinces(provinces.map(p =>
      p.id === provinceId ? { ...p, army: p.army + 1 } : p
    ));
    addHistoryEvent('purchase', `Куплена армия в ${province.name}`);
    toast({
      title: "Армия куплена",
      description: `+1 армия в ${province.name}`,
    });
  };

  const aiTurn = () => {
    setIsProcessing(true);
    
    const aiProvinces = provinces.filter(p => p.owner === 'ai' && p.army > 1);

    if (aiProvinces.length === 0) {
      endAiTurn();
      return;
    }

    const targets: { from: number; to: number; priority: number }[] = [];

    aiProvinces.forEach(prov => {
      prov.neighbors.forEach(nId => {
        const neighbor = provinces.find(p => p.id === nId);
        if (!neighbor || neighbor.owner === 'ai') return;

        let priority = 0;
        
        if (neighbor.owner === 'player') priority += 15;
        priority += neighbor.income * 3;
        priority += prov.army - neighbor.army;
        if (neighbor.isCapital) priority += 20;
        
        if (difficulty === 'hard') priority += neighbor.income * 4;
        if (difficulty === 'easy') priority -= 8;

        const defenseBonus = TERRAIN_BONUS[neighbor.terrain].defense;
        if (prov.army > neighbor.army + defenseBonus) {
          targets.push({ from: prov.id, to: nId, priority });
        }
      });
    });

    if (aiGold >= ARMY_COST && Math.random() > 0.6) {
      const strongestAi = aiProvinces.sort((a, b) => b.army - a.army)[0];
      if (strongestAi) {
        setAiGold(prev => prev - ARMY_COST);
        setProvinces(provinces.map(p =>
          p.id === strongestAi.id ? { ...p, army: p.army + 1 } : p
        ));
      }
    }

    if (targets.length > 0) {
      targets.sort((a, b) => b.priority - a.priority);
      const bestTarget = targets[0];
      setTimeout(() => {
        attackProvince(bestTarget.from, bestTarget.to);
        endAiTurn();
      }, 800);
    } else {
      endAiTurn();
    }
  };

  const endAiTurn = () => {
    const aiIncome = calculateIncome('ai');
    setAiGold(prev => prev + aiIncome);
    setTurn('player');
    setIsProcessing(false);
    setTurnNumber(prev => prev + 1);
    setStats(prev => ({ ...prev, turn: prev.turn + 1 }));
  };

  const endPlayerTurn = () => {
    if (turn === 'player') {
      setTurn('ai');
    }
  };

  const playerProvinces = useMemo(() => provinces.filter(p => p.owner === 'player'), [provinces]);
  const aiProvinces = useMemo(() => provinces.filter(p => p.owner === 'ai'), [provinces]);
  const playerIncome = useMemo(() => calculateIncome('player'), [provinces]);

  return (
    <div className="w-full max-w-6xl space-y-4">
      <div className="flex justify-between items-center bg-card border-4 border-border p-3">
        <Button
          onClick={onExit}
          variant="ghost"
          size="sm"
          className="text-foreground"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          МЕНЮ
        </Button>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">ХОД {turnNumber}</div>
          <div className={`text-base font-bold ${turn === 'player' ? 'text-primary' : 'text-destructive'}`}>
            {turn === 'player' ? 'ВАШ ХОД' : 'ХОД ИИ'}
          </div>
        </div>
        <Button
          onClick={endPlayerTurn}
          disabled={turn !== 'player' || isProcessing}
          className="bg-accent hover:bg-accent/90"
          size="sm"
        >
          ЗАВЕРШИТЬ
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-card border-4 border-border p-3">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">ЗОЛОТО</div>
          <div className="text-base text-primary font-bold">{playerGold} 💰</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">ДОХОД</div>
          <div className="text-base text-secondary font-bold">+{playerIncome}/ход</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">ПРОВИНЦИИ</div>
          <div className="text-base font-bold">
            <span className="text-primary">{playerProvinces.length}</span>
            <span className="text-muted-foreground mx-1">:</span>
            <span className="text-destructive">{aiProvinces.length}</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">НЕЙТРАЛЬНЫЕ</div>
          <div className="text-base text-foreground font-bold">
            {provinces.filter(p => p.owner === 'neutral').length}
          </div>
        </div>
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card border-4 border-border">
          <TabsTrigger value="map" className="text-xs">
            <Icon name="Map" size={14} className="mr-1" />
            КАРТА
          </TabsTrigger>
          <TabsTrigger value="stats" className="text-xs">
            <Icon name="BarChart3" size={14} className="mr-1" />
            СТАТИСТИКА
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs">
            <Icon name="History" size={14} className="mr-1" />
            ИСТОРИЯ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-4">
          <WorldMap
            provinces={provinces}
            selectedProvince={selectedProvince}
            onProvinceClick={(id) => {
              if (turn !== 'player' || isProcessing) return;

              const province = provinces.find(p => p.id === id);
              if (!province) return;

              if (selectedProvince === null) {
                if (province.owner === 'player' && province.army > 1) {
                  setSelectedProvince(id);
                }
              } else {
                const selected = provinces.find(p => p.id === selectedProvince);
                if (selected?.neighbors.includes(id) && province.owner !== 'player') {
                  attackProvince(selectedProvince, id);
                } else {
                  setSelectedProvince(null);
                }
              }
            }}
            onBuyArmy={buyArmy}
            playerGold={playerGold}
            armyCost={ARMY_COST}
            isPlayerTurn={turn === 'player' && !isProcessing}
          />
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <Statistics stats={stats} provinces={provinces} continentBonus={CONTINENT_BONUS} />
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <History events={history} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameBoard;
