/**
 * Collection registry: one declarative definition per content type.
 * The admin renders its forms from `fields`, and the API validates against the same definitions,
 * so adding a field here is all it takes to make it editable.
 */
import type { AnyRecord, BaseRecord, CollectionKey } from "./types";
import { DEFAULT_ASSET_FOLDERS } from "@/lib/assets";

type AssetFolder = (typeof DEFAULT_ASSET_FOLDERS)[number];

interface FieldBase {
  name: string;
  label: string;
  help?: string;
  placeholder?: string;
  required?: boolean;
  /** Only required when the record is active, so drafts can be saved incomplete. */
  requiredWhenActive?: boolean;
  /** Span both columns in the admin form grid. */
  wide?: boolean;
}

export type FieldDef =
  | (FieldBase & { type: "text" | "url"; maxLength?: number })
  | (FieldBase & { type: "textarea"; maxLength?: number; rows?: number })
  | (FieldBase & { type: "date" })
  | (FieldBase & { type: "number"; min: number; max: number })
  | (FieldBase & { type: "select"; options: { value: string; label: string }[] })
  | (FieldBase & { type: "image"; defaultFolder: AssetFolder })
  | (FieldBase & { type: "imageList"; defaultFolder: AssetFolder; max?: number })
  | (FieldBase & { type: "paragraphs" })
  | (FieldBase & { type: "repeater"; itemLabel: string; fields: FieldDef[] });

export interface FieldGroup {
  title: string;
  description?: string;
  fields: FieldDef[];
}

export interface CollectionDef {
  key: CollectionKey;
  label: string;
  singular: string;
  description: string;
  /** Field used as the record's display name and slug source. */
  titleField: string;
  /** Field holding the record's main image (used for admin thumbnails). */
  imageField: string;
  groups: FieldGroup[];
  /** Public URL for a record, or null when the collection has no detail page. */
  publicPath: (record: { slug: string }) => string | null;
  /** Homepage limit for featured records (shown as a hint in the admin). */
  featuredLimit?: number;
}

export const collections: Record<CollectionKey, CollectionDef> = {
  expeditions: {
    key: "expeditions",
    label: "Expeditions",
    singular: "Expedition",
    description: "Mountain expeditions shown on the homepage tab, the listing and their own detail page.",
    titleField: "name",
    imageField: "thumbnail",
    publicPath: (r) => `/expeditions/${r.slug}`,
    featuredLimit: 5,
    groups: [
      {
        title: "Basics",
        fields: [
          { name: "name", label: "Name", type: "text", required: true, maxLength: 80, placeholder: "Mount Kenya" },
          { name: "country", label: "Country", type: "text", required: true, maxLength: 40, placeholder: "Kenya" },
          { name: "region", label: "Region subtitle", type: "text", maxLength: 80, placeholder: "Satima & the moorlands", help: "Green subtitle on listing cards." },
          { name: "altitude", label: "Altitude", type: "text", required: true, maxLength: 20, placeholder: "5,199m" },
          { name: "difficulty", label: "Difficulty (1–5)", type: "number", min: 1, max: 5, required: true },
          { name: "highestPoint", label: "Highest point", type: "text", maxLength: 80, placeholder: "4,985m (Point Lenana)" },
          { name: "route", label: "Route", type: "text", maxLength: 80, placeholder: "Sirimon → Chogoria" },
          { name: "duration", label: "Duration", type: "text", maxLength: 40, placeholder: "4 days" },
          { name: "dateLabel", label: "Month label", type: "text", maxLength: 40, placeholder: "August 2025" },
          { name: "dateRange", label: "Exact dates", type: "text", maxLength: 60, placeholder: "August 12-16, 2025" },
        ],
      },
      {
        title: "Copy",
        fields: [
          { name: "description", label: "Homepage description", type: "textarea", requiredWhenActive: true, maxLength: 320, rows: 3, wide: true },
          { name: "summary", label: "Listing card summary", type: "textarea", maxLength: 220, rows: 2, wide: true },
          { name: "intro", label: "Detail page introduction", type: "paragraphs", wide: true, help: "One box per paragraph." },
          {
            name: "itinerary",
            label: "Itinerary",
            type: "repeater",
            itemLabel: "Day",
            wide: true,
            fields: [
              { name: "day", label: "Day label", type: "text", required: true, placeholder: "Day 1" },
              { name: "elevation", label: "Elevation", type: "text", placeholder: "2,650m → 3,300m" },
              { name: "title", label: "Title", type: "text", required: true, wide: true, placeholder: "Sirimon Gate to Old Moses" },
              { name: "body", label: "Story", type: "textarea", rows: 3, wide: true },
            ],
          },
          { name: "fieldNote", label: "Field note", type: "textarea", maxLength: 400, rows: 2, wide: true, help: "Italic note under the selected frames." },
        ],
      },
      {
        title: "Images",
        description: "Pick a base folder, then type or browse the rest of the path inside public/assets.",
        fields: [
          { name: "heroImage", label: "Hero image", type: "image", defaultFolder: "mountainExpeditions", requiredWhenActive: true, wide: true },
          { name: "heroCaption", label: "Hero caption", type: "text", maxLength: 80, wide: true, placeholder: "Between the clouds and the quiet" },
          { name: "thumbnail", label: "Thumbnail", type: "image", defaultFolder: "mountainExpeditions", requiredWhenActive: true, wide: true, help: "Square-ish image for the homepage selector and listing card." },
          { name: "frames", label: "Selected frames", type: "imageList", defaultFolder: "mountainExpeditions", max: 3, wide: true, help: "Up to 3 images for the fanned 'Selected Frames' block." },
        ],
      },
    ],
  },
  gallery: {
    key: "gallery",
    label: "Gallery",
    singular: "Gallery photo",
    description: "Photos in the Trail Gallery. Featured photos appear on the homepage.",
    titleField: "title",
    imageField: "image",
    publicPath: () => "/gallery",
    featuredLimit: 5,
    groups: [
      {
        title: "Photo",
        fields: [
          { name: "title", label: "Title", type: "text", required: true, maxLength: 80 },
          { name: "location", label: "Location", type: "text", required: true, maxLength: 60, placeholder: "Mt Kenya, Kenya" },
          { name: "altitude", label: "Altitude", type: "text", maxLength: 20, placeholder: "5,199m" },
          {
            name: "size",
            label: "Tile size",
            type: "select",
            options: [
              { value: "small", label: "Small" },
              { value: "tall", label: "Tall (spans two rows)" },
            ],
          },
          { name: "image", label: "Image", type: "image", defaultFolder: "gallery", requiredWhenActive: true, wide: true },
        ],
      },
    ],
  },
  trailStories: {
    key: "trailStories",
    label: "Trail Notes",
    singular: "Trail note",
    description: "Stories from the Trails. Featured notes appear on the homepage.",
    titleField: "title",
    imageField: "featuredImage",
    publicPath: (r) => `/trail-notes/${r.slug}`,
    featuredLimit: 2,
    groups: [
      {
        title: "Story",
        fields: [
          { name: "title", label: "Title", type: "text", required: true, maxLength: 100, wide: true },
          { name: "category", label: "Category", type: "text", maxLength: 40, placeholder: "Mountain Stories" },
          { name: "date", label: "Date", type: "date" },
          { name: "readTime", label: "Read time", type: "text", maxLength: 20, placeholder: "5 min read" },
          { name: "excerpt", label: "Excerpt", type: "textarea", requiredWhenActive: true, maxLength: 260, rows: 2, wide: true },
          { name: "body", label: "Body", type: "paragraphs", wide: true, help: "One box per paragraph." },
        ],
      },
      {
        title: "Images",
        fields: [
          { name: "featuredImage", label: "Featured image", type: "image", defaultFolder: "storiesFromTheTrails", requiredWhenActive: true, wide: true },
          { name: "images", label: "Story frames", type: "imageList", defaultFolder: "storiesFromTheTrails", max: 3, wide: true },
        ],
      },
    ],
  },
};

export const collectionKeys = Object.keys(collections) as CollectionKey[];

export function isCollectionKey(value: string): value is CollectionKey {
  return value in collections;
}

export function allFields(def: CollectionDef): FieldDef[] {
  return def.groups.flatMap((g) => g.fields);
}

export function recordTitle(def: CollectionDef, record: AnyRecord | Record<string, unknown>): string {
  const value = (record as unknown as Record<string, unknown>)[def.titleField];
  return typeof value === "string" && value ? value : "Untitled";
}

/** Every asset path a record references, for metrics and missing-file checks. */
export function recordImages(def: CollectionDef, record: AnyRecord | Record<string, unknown>): string[] {
  const data = record as unknown as Record<string, unknown>;
  return allFields(def).flatMap((field) => {
    const value = data[field.name];
    if (field.type === "image" && typeof value === "string" && value) return [value];
    if (field.type === "imageList" && Array.isArray(value)) return value.filter((v): v is string => typeof v === "string" && !!v);
    return [];
  });
}

function emptyValue(field: FieldDef): unknown {
  switch (field.type) {
    case "number":
      return field.min;
    case "select":
      return field.options[0]?.value ?? "";
    case "imageList":
    case "paragraphs":
    case "repeater":
      return [];
    default:
      return "";
  }
}

export function emptyRecord(def: CollectionDef): Record<string, unknown> {
  const base: Omit<BaseRecord, "createdAt" | "updatedAt" | "order" | "id"> = {
    slug: "",
    active: false,
    featured: false,
  };
  const data: Record<string, unknown> = { ...base };
  for (const field of allFields(def)) data[field.name] = emptyValue(field);
  return data;
}

export function emptyRepeaterItem(field: Extract<FieldDef, { type: "repeater" }>): Record<string, unknown> {
  return Object.fromEntries(field.fields.map((f) => [f.name, emptyValue(f)]));
}

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
