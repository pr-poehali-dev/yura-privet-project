import { GameStats, Province } from '@/types/game';
import Icon from '@/components/ui/icon';

interface StatisticsProps {
  stats: GameStats;
  provinces: Province[];
  continentBonus: Record<string, { name: string; bonus: number; color: string }>;
}

const Statistics = ({ stats, provinces, continentBonus }: StatisticsProps) => {
  const getContinentControl = () => {
    const continents = Object.keys(continentBonus);
    return continents.map(continent => {
      const total = provinces.filter(p => p.continent === continent).length;
      const player = provinces.filter(p => p.continent === continent && p.owner === 'player').length;
      const ai = provinces.filter(p => p.continent === continent && p.owner === 'ai').length;
      const neutral = total - player - ai;
      
      return {
        name: continentBonus[continent as keyof typeof continentBonus].name,
        total,
        player,
        ai,
        neutral,
        bonus: continentBonus[continent as keyof typeof continentBonus].bonus,
        controlled: player === total ? 'player' : ai === total ? 'ai' : 'none',
      };
    });
  };

  const continentData = getContinentControl();
  const playerArmies = provinces.filter(p => p.owner === 'player').reduce((sum, p) => sum + p.army, 0);
  const aiArmies = provinces.filter(p => p.owner === 'ai').reduce((sum, p) => sum + p.army, 0);

  return (
    <div className="space-y-4">
      <div className="bg-card border-4 border-border p-6 space-y-4">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          <Icon name="Target" size={20} />
          БОЕВАЯ СТАТИСТИКА
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background p-3 border-2 border-border">
            <div className="text-xs text-muted-foreground">Ходов сыграно</div>
            <div className="text-2xl font-bold text-foreground">{stats.turn}</div>
          </div>
          <div className="bg-background p-3 border-2 border-border">
            <div className="text-xs text-muted-foreground">Всего армий</div>
            <div className="text-2xl font-bold text-primary">{playerArmies}</div>
          </div>
          <div className="bg-background p-3 border-2 border-border">
            <div className="text-xs text-muted-foreground">Битв выиграно</div>
            <div className="text-2xl font-bold text-primary">{stats.battlesWon}</div>
          </div>
          <div className="bg-background p-3 border-2 border-border">
            <div className="text-xs text-muted-foreground">Битв проиграно</div>
            <div className="text-2xl font-bold text-destructive">{stats.battlesLost}</div>
          </div>
        </div>
      </div>

      <div className="bg-card border-4 border-border p-6 space-y-4">
        <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
          <Icon name="TrendingUp" size={20} />
          ЭКОНОМИКА
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background p-3 border-2 border-border">
            <div className="text-xs text-muted-foreground">Захвачено</div>
            <div className="text-2xl font-bold text-primary">{stats.territoriesConquered}</div>
          </div>
          <div className="bg-background p-3 border-2 border-border">
            <div className="text-xs text-muted-foreground">Потеряно</div>
            <div className="text-2xl font-bold text-destructive">{stats.territoriesLost}</div>
          </div>
          <div className="bg-background p-3 border-2 border-border">
            <div className="text-xs text-muted-foreground">Золота заработано</div>
            <div className="text-2xl font-bold text-secondary">{stats.goldEarned} 💰</div>
          </div>
          <div className="bg-background p-3 border-2 border-border">
            <div className="text-xs text-muted-foreground">Золота потрачено</div>
            <div className="text-2xl font-bold text-foreground">{stats.goldSpent} 💰</div>
          </div>
        </div>
      </div>

      <div className="bg-card border-4 border-border p-6 space-y-4">
        <h3 className="text-lg font-bold text-accent flex items-center gap-2">
          <Icon name="Globe" size={20} />
          КОНТРОЛЬ КОНТИНЕНТОВ
        </h3>
        
        <div className="space-y-3">
          {continentData.map((continent) => (
            <div key={continent.name} className="bg-background p-3 border-2 border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-sm text-foreground">
                  {continent.name}
                  {continent.controlled !== 'none' && (
                    <span className="ml-2 text-xs">
                      +{continent.bonus} 💰 бонус
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {continent.player + continent.ai + continent.neutral} провинций
                </div>
              </div>
              <div className="flex gap-1 h-4">
                <div
                  className="bg-primary transition-all"
                  style={{ width: `${(continent.player / continent.total) * 100}%` }}
                  title={`Вы: ${continent.player}`}
                />
                <div
                  className="bg-destructive transition-all"
                  style={{ width: `${(continent.ai / continent.total) * 100}%` }}
                  title={`ИИ: ${continent.ai}`}
                />
                <div
                  className="bg-secondary/50 transition-all"
                  style={{ width: `${(continent.neutral / continent.total) * 100}%` }}
                  title={`Нейтральные: ${continent.neutral}`}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span className="text-primary">Вы: {continent.player}</span>
                <span className="text-destructive">ИИ: {continent.ai}</span>
                <span className="text-muted-foreground">Нейтр: {continent.neutral}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border-4 border-border p-6">
        <h3 className="text-lg font-bold text-destructive flex items-center gap-2 mb-4">
          <Icon name="Swords" size={20} />
          ВОЕННАЯ МОЩЬ
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-primary">Ваши армии: {playerArmies}</span>
              <span className="text-destructive">Армии ИИ: {aiArmies}</span>
            </div>
            <div className="flex gap-1 h-6">
              <div
                className="bg-primary flex items-center justify-center text-xs font-bold text-white"
                style={{ width: `${(playerArmies / (playerArmies + aiArmies)) * 100}%` }}
              >
                {playerArmies}
              </div>
              <div
                className="bg-destructive flex items-center justify-center text-xs font-bold text-white"
                style={{ width: `${(aiArmies / (playerArmies + aiArmies)) * 100}%` }}
              >
                {aiArmies}
              </div>
            </div>
          </div>
          <div className="text-xs text-center text-muted-foreground bg-background p-2 border-2 border-border">
            {playerArmies > aiArmies
              ? '💪 У вас военное превосходство!'
              : playerArmies < aiArmies
              ? '⚠️ ИИ сильнее в военном плане'
              : '⚖️ Военный паритет'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
