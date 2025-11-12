import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Province } from '@/types/game';
import { TERRAIN_BONUS } from '@/data/worldMap';

interface WorldMapProps {
  provinces: Province[];
  selectedProvince: number | null;
  onProvinceClick: (id: number) => void;
  onBuyArmy: (id: number) => void;
  playerGold: number;
  armyCost: number;
  isPlayerTurn: boolean;
}

const WorldMap = ({
  provinces,
  selectedProvince,
  onProvinceClick,
  onBuyArmy,
  playerGold,
  armyCost,
  isPlayerTurn,
}: WorldMapProps) => {
  const getProvinceColor = (province: Province) => {
    if (province.owner === 'player') return 'bg-primary hover:bg-primary/80';
    if (province.owner === 'ai') return 'bg-destructive hover:bg-destructive/80';
    return 'bg-secondary/50 hover:bg-secondary/70';
  };

  const getTerrainIcon = (terrain: Province['terrain']) => {
    switch (terrain) {
      case 'mountains': return '⛰️';
      case 'desert': return '🏜️';
      case 'forest': return '🌲';
      case 'coast': return '🌊';
      default: return '🌾';
    }
  };

  const selectedProv = provinces.find(p => p.id === selectedProvince);

  return (
    <div className="space-y-4">
      <div className="bg-card border-4 border-border p-6 relative">
        <div className="relative w-full" style={{ height: '500px' }}>
          {provinces.map((province) => {
            const isSelected = selectedProvince === province.id;
            const isNeighbor = selectedProv?.neighbors.includes(province.id);
            
            return (
              <button
                key={province.id}
                onClick={() => onProvinceClick(province.id)}
                disabled={!isPlayerTurn}
                className={`
                  absolute ${getProvinceColor(province)}
                  border-2 border-border
                  rounded-sm
                  transition-all duration-200
                  ${isSelected ? 'ring-4 ring-foreground scale-110 z-20' : ''}
                  ${isNeighbor && province.owner !== 'player' ? 'ring-2 ring-accent animate-pulse' : ''}
                  ${!isPlayerTurn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110 hover:z-10'}
                  ${province.isCapital ? 'border-4 border-yellow-400' : ''}
                `}
                style={{
                  left: `${province.x * 6.5}%`,
                  top: `${province.y * 9}%`,
                  width: '60px',
                  height: '60px',
                }}
                title={`${province.name} - ${province.army} армий, +${province.income} золота`}
              >
                <div className="flex flex-col items-center justify-center h-full text-xs">
                  <div className="font-bold text-white drop-shadow-lg">{province.army}</div>
                  <div className="text-[8px]">{getTerrainIcon(province.terrain)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedProvince !== null && (
        <div className="bg-card border-4 border-border p-4 space-y-3 animate-fade-in">
          {selectedProv && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                    {selectedProv.name}
                    {selectedProv.isCapital && <span className="text-yellow-400">👑</span>}
                  </h3>
                  <div className="text-xs text-muted-foreground space-y-1 mt-1">
                    <div>Армия: {selectedProv.army} | Доход: +{selectedProv.income} 💰</div>
                    <div>
                      Местность: {getTerrainIcon(selectedProv.terrain)} 
                      {TERRAIN_BONUS[selectedProv.terrain].defense > 0 && 
                        ` (+${TERRAIN_BONUS[selectedProv.terrain].defense} защита)`}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedProvince(null)}
                  variant="ghost"
                  size="sm"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              {selectedProv.owner === 'player' && (
                <Button
                  onClick={() => onBuyArmy(selectedProv.id)}
                  disabled={playerGold < armyCost}
                  className="w-full bg-accent hover:bg-accent/90 text-sm"
                  size="sm"
                >
                  <Icon name="Plus" size={14} className="mr-2" />
                  КУПИТЬ АРМИЮ ({armyCost} 💰)
                </Button>
              )}

              {selectedProv.owner === 'player' && selectedProv.army > 1 && (
                <div className="text-xs text-center text-foreground bg-background p-2 border-2 border-border">
                  ⚔️ Выберите соседнюю провинцию для атаки
                </div>
              )}
            </>
          )}
        </div>
      )}

      {selectedProvince === null && (
        <div className="bg-card border-4 border-border p-3 text-xs text-center text-muted-foreground">
          🎯 Выберите свою провинцию для действий | 💰 Покупка армии: {armyCost} золота
        </div>
      )}
    </div>
  );
};

export default WorldMap;
