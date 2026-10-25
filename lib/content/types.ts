/**
 * Content model shared by the public site, the admin module and the storage layer.
 * Every record is plain JSON so it can live in content/*.json today and in Upstash later.
 *
 * Image fields hold a path relative to /public/assets, e.g.
 * "mountainExpeditions/mt-kenya/mtkenya_thumbnail.png". Use assetUrl() to render them.
 */

export interface BaseRecord {
  id: string;
  slug: string;
  /** Inactive records are never rendered on the public site. */
  active: boolean;
  /** Featured records are the ones surfaced on the homepage. */
  featured: boolean;
  /** Ascending sort key; managed by drag-and-drop in the admin. */
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  day: string;
  title: string;
  elevation: string;
  body: string;
}

export interface Expedition extends BaseRecord {
  name: string;
  country: string;
  /** Short green subtitle on listing cards, e.g. "Satima & the moorlands". */
  region: string;
  altitude: string;
  highestPoint: string;
  route: string;
  duration: string;
  /** Month/year label, e.g. "August 2025". */
  dateLabel: string;
  /** Exact dates shown in the sign-off, e.g. "August 12-16, 2025". */
  dateRange: string;
  difficulty: number;
  /** Homepage tab copy. */
  description: string;
  /** Listing card copy. */
  summary: string;
  intro: string[];
  itinerary: ItineraryDay[];
  /** Italic note shown under "Selected Frames". */
  fieldNote: string;
  heroImage: string;
  heroCaption: string;
  thumbnail: string;
  frames: string[];
}

export interface GalleryItem extends BaseRecord {
  title: string;
  location: string;
  altitude: string;
  image: string;
  size: "small" | "tall";
}

export interface TrailStory extends BaseRecord {
  title: string;
  excerpt: string;
  category: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readTime: string;
  featuredImage: string;
  body: string[];
  images: string[];
}

export interface CollectionMap {
  expeditions: Expedition;
  gallery: GalleryItem;
  trailStories: TrailStory;
}

export type CollectionKey = keyof CollectionMap;
export type AnyRecord = CollectionMap[CollectionKey];
