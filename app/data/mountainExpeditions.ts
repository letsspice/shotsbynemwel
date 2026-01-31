export interface MountainExpedition {
  id: string;
  name: string;
  country: string;
  altitude: string;
  difficulty: number; // 1–5
  description: string;
  heroImage: string;     // used for the big hero tab (public path)
  thumbnails: string[];  // extra images for the expedition (used later in show page)
  cardThumb: string;     // small square thumbnail used for the bottom-right "other hikes" and selector
  slug: string;
}

export const mountainExpeditions: MountainExpedition[] = [
  {
    id: "mt-kenya",
    name: "Mount Kenya",
    country: "Kenya",
    altitude: "5,199m",
    difficulty: 4,
    description:
      "From bamboo thickets to alpine deserts, every step reveals a new world. The summit, Point Lenana, greets you with silence and sweeping sunrises.",
    heroImage: "/assets/mountainExpeditions/mt-kenya/mtkenya_mountainexhibition.png",
    thumbnails: [
      "/assets/mountainExpeditions/mt-kenya/thumb-1.png",
      "/assets/mountainExpeditions/mt-kenya/thumb-2.png",
      "/assets/mountainExpeditions/mt-kenya/thumb-3.png",
    ],
    cardThumb: "/assets/mountainExpeditions/mt-kenya/mtkenya_thumbnail.png",
    slug: "mount-kenya",
  },
  {
    id: "mackinders-camp",
    name: "Mackinders Camp",
    country: "Kenya",
    altitude: "4,300m",
    difficulty: 4,
    description:
      "A high-altitude sanctuary in the Teleki Valley. The trail challenges you with the infamous 'Vertical Bog' before rewarding you with iconic, close-up views of the Batian and Nelion peaks.",
    heroImage: "/assets/mountainExpeditions/mackinders-camp/shotofnemwelatmackinderscamp.png",
    thumbnails: [
      "/assets/mountainExpeditions/mackinders-camp/thumb-1.png",
      "/assets/mountainExpeditions/mackinders-camp/thumb-2.png",
      "/assets/mountainExpeditions/mackinders-camp/thumb-3.png",
    ],
    cardThumb: "/assets/mountainExpeditions/mackinders-camp/shotofnemwelatmackinderscamp.png",
    slug: "mackinders-camp",
  },
//   {
//     id: "likii-north",
//     name: "Likii North",
//     country: "Kenya",
//     altitude: "3,993m",
//     difficulty: 4,
//     description:
//       "A remote and scenic route on the northern side of Mount Kenya. It offers a quieter, off-the-beaten-path trekking experience through unique moorland landscapes and crystal-clear river crossings.",
//     heroImage: "/assets/mountainExpeditions/likii-north/hero.png",
//     thumbnails: [
//       "/assets/mountainExpeditions/likii-north/thumb-1.png",
//       "/assets/mountainExpeditions/likii-north/thumb-2.png",
//       "/assets/mountainExpeditions/likii-north/thumb-3.png",
//     ],
//     cardThumb: "/assets/mountainExpeditions/likii-north/card.png",
//     slug: "likii-north",
//   },
//   {
//     id: "elephant-hill",
//     name: "Elephant Hill",
//     country: "Kenya",
//     altitude: "3,658m",
//     difficulty: 5,
//     description:
//       "The ultimate test of endurance in the Aberdares. Famous for its thick bamboo forests, relentless mud, and the psychological hurdle known as the 'Point of Despair'.",
//     heroImage: "/assets/mountainExpeditions/elephant-hill/hero.png",
//     thumbnails: [
//       "/assets/mountainExpeditions/elephant-hill/thumb-1.png",
//       "/assets/mountainExpeditions/elephant-hill/thumb-2.png",
//       "/assets/mountainExpeditions/elephant-hill/thumb-3.png",
//     ],
//     cardThumb: "/assets/mountainExpeditions/elephant-hill/card.png",
//     slug: "elephant-hill",
//   },
//   {
//     id: "mt-kipipiri",
//     name: "Mount Kipipiri",
//     country: "Kenya",
//     altitude: "3,349m",
//     difficulty: 3,
//     description:
//       "A standalone volcanic cone detached from the main Aberdare range. Known as the 'butterfly' mountain, it offers long, beautiful forest walks and a rewarding, windy summit.",
//     heroImage: "/assets/mountainExpeditions/mt-kipipiri/hero.png",
//     thumbnails: [
//       "/assets/mountainExpeditions/mt-kipipiri/thumb-1.png",
//       "/assets/mountainExpeditions/mt-kipipiri/thumb-2.png",
//       "/assets/mountainExpeditions/mt-kipipiri/thumb-3.png",
//     ],
//     cardThumb: "/assets/mountainExpeditions/mt-kipipiri/card.png",
//     slug: "mount-kipipiri",
//   },
];
