import artistsData from './data/artists.json'
import type { ArtistContentEntry } from './schema'

export const artistsContent: ArtistContentEntry[] = (artistsData as { artists: ArtistContentEntry[] }).artists
