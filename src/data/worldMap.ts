import { Province } from '@/types/game';

export const WORLD_MAP: Omit<Province, 'owner' | 'army'>[] = [
  { id: 0, name: 'Британия', continent: 'europe', income: 5, terrain: 'coast', x: 2, y: 1, neighbors: [1, 5], isCapital: true },
  { id: 1, name: 'Франция', continent: 'europe', income: 6, terrain: 'plains', x: 3, y: 2, neighbors: [0, 2, 5, 6] },
  { id: 2, name: 'Испания', continent: 'europe', income: 5, terrain: 'coast', x: 2, y: 3, neighbors: [1, 14] },
  { id: 3, name: 'Германия', continent: 'europe', income: 7, terrain: 'plains', x: 4, y: 1, neighbors: [4, 5, 6] },
  { id: 4, name: 'Скандинавия', continent: 'europe', income: 4, terrain: 'forest', x: 5, y: 0, neighbors: [3, 7] },
  { id: 5, name: 'Бенилюкс', continent: 'europe', income: 5, terrain: 'coast', x: 3, y: 1, neighbors: [0, 1, 3] },
  { id: 6, name: 'Италия', continent: 'europe', income: 6, terrain: 'coast', x: 4, y: 3, neighbors: [1, 3, 15] },
  { id: 7, name: 'Польша', continent: 'europe', income: 5, terrain: 'plains', x: 6, y: 1, neighbors: [4, 8, 9] },
  { id: 8, name: 'Россия Запад', continent: 'europe', income: 8, terrain: 'forest', x: 7, y: 1, neighbors: [7, 9, 20] },
  { id: 9, name: 'Украина', continent: 'europe', income: 6, terrain: 'plains', x: 7, y: 2, neighbors: [7, 8, 10] },
  { id: 10, name: 'Турция', continent: 'europe', income: 6, terrain: 'mountains', x: 7, y: 3, neighbors: [9, 15, 21] },
  
  { id: 11, name: 'Египет', continent: 'africa', income: 5, terrain: 'desert', x: 6, y: 5, neighbors: [15, 12, 16] },
  { id: 12, name: 'Судан', continent: 'africa', income: 3, terrain: 'desert', x: 6, y: 6, neighbors: [11, 13, 16] },
  { id: 13, name: 'Эфиопия', continent: 'africa', income: 4, terrain: 'mountains', x: 7, y: 6, neighbors: [12, 17] },
  { id: 14, name: 'Марокко', continent: 'africa', income: 4, terrain: 'desert', x: 2, y: 5, neighbors: [2, 15, 16] },
  { id: 15, name: 'Ливия', continent: 'africa', income: 4, terrain: 'desert', x: 5, y: 4, neighbors: [6, 10, 11, 14] },
  { id: 16, name: 'Западная Африка', continent: 'africa', income: 5, terrain: 'forest', x: 4, y: 6, neighbors: [11, 12, 14, 17] },
  { id: 17, name: 'Центральная Африка', continent: 'africa', income: 6, terrain: 'forest', x: 5, y: 7, neighbors: [13, 16, 18] },
  { id: 18, name: 'Южная Африка', continent: 'africa', income: 6, terrain: 'plains', x: 5, y: 9, neighbors: [17], isCapital: true },
  
  { id: 19, name: 'Аляска', continent: 'americas', income: 3, terrain: 'forest', x: 0, y: 0, neighbors: [23, 27] },
  { id: 20, name: 'Сибирь', continent: 'asia', income: 7, terrain: 'forest', x: 9, y: 0, neighbors: [8, 21, 27] },
  { id: 21, name: 'Ближний Восток', continent: 'asia', income: 7, terrain: 'desert', x: 8, y: 4, neighbors: [10, 20, 22] },
  { id: 22, name: 'Индия', continent: 'asia', income: 8, terrain: 'plains', x: 10, y: 5, neighbors: [21, 23, 25], isCapital: true },
  { id: 23, name: 'Китай', continent: 'asia', income: 9, terrain: 'mountains', x: 11, y: 3, neighbors: [19, 22, 24, 27] },
  { id: 24, name: 'Япония', continent: 'asia', income: 7, terrain: 'coast', x: 13, y: 2, neighbors: [23, 25] },
  { id: 25, name: 'Юго-Восточная Азия', continent: 'asia', income: 6, terrain: 'forest', x: 11, y: 6, neighbors: [22, 24, 26] },
  { id: 26, name: 'Австралия', continent: 'oceania', income: 6, terrain: 'desert', x: 13, y: 8, neighbors: [25], isCapital: true },
  
  { id: 27, name: 'Камчатка', continent: 'asia', income: 4, terrain: 'coast', x: 14, y: 0, neighbors: [19, 20, 23] },
  { id: 28, name: 'Канада', continent: 'americas', income: 6, terrain: 'forest', x: 1, y: 1, neighbors: [19, 29, 30] },
  { id: 29, name: 'США Запад', continent: 'americas', income: 7, terrain: 'plains', x: 1, y: 3, neighbors: [28, 30, 31] },
  { id: 30, name: 'США Восток', continent: 'americas', income: 8, terrain: 'coast', x: 2, y: 4, neighbors: [28, 29, 31], isCapital: true },
  { id: 31, name: 'Мексика', continent: 'americas', income: 5, terrain: 'desert', x: 1, y: 5, neighbors: [29, 30, 32] },
  { id: 32, name: 'Центральная Америка', continent: 'americas', income: 4, terrain: 'forest', x: 2, y: 6, neighbors: [31, 33] },
  { id: 33, name: 'Южная Америка Север', continent: 'americas', income: 6, terrain: 'forest', x: 3, y: 8, neighbors: [32, 34] },
  { id: 34, name: 'Бразилия', continent: 'americas', income: 7, terrain: 'plains', x: 4, y: 9, neighbors: [33, 35] },
  { id: 35, name: 'Аргентина', continent: 'americas', income: 6, terrain: 'plains', x: 3, y: 10, neighbors: [34] },
];

export const CONTINENT_BONUS = {
  europe: { name: 'Европа', bonus: 5, color: '#9b87f5' },
  asia: { name: 'Азия', bonus: 7, color: '#ea384c' },
  africa: { name: 'Африка', bonus: 3, color: '#F2FCE2' },
  americas: { name: 'Америки', bonus: 5, color: '#0EA5E9' },
  oceania: { name: 'Океания', bonus: 2, color: '#FEC6A1' },
} as const;

export const TERRAIN_BONUS = {
  plains: { defense: 0, income: 0 },
  mountains: { defense: 2, income: -1 },
  desert: { defense: -1, income: 1 },
  forest: { defense: 1, income: 0 },
  coast: { defense: 0, income: 1 },
} as const;
