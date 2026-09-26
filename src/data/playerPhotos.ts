/** Reusable pool of Black African footballer photos (Wikimedia Commons). Repeats across squads. */
export const PLAYER_PHOTOS = [
  '/images/players/photos/p01.jpg',
  '/images/players/photos/p02.jpg',
  '/images/players/photos/p03.jpg',
  '/images/players/photos/p04.jpg',
  '/images/players/photos/p05.jpg',
  '/images/players/photos/p06.jpg',
  '/images/players/photos/p07.jpg',
  '/images/players/photos/p08.jpg',
  '/images/players/photos/p09.jpg',
  '/images/players/photos/p10.jpg',
  '/images/players/photos/p11.jpg',
  '/images/players/photos/p12.jpg',
  '/images/players/photos/p13.jpg',
  '/images/players/photos/p15.jpg',
  '/images/players/photos/p16.jpg',
] as const

export function playerPhotoUrl(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return PLAYER_PHOTOS[h % PLAYER_PHOTOS.length]
}
