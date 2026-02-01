export interface TrailStory {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: string;
}

export const trailStories: TrailStory[] = [
  {
    id: "kilimanjaro-storm",
    slug: "surviving-a-storm-on-kilimanjaro",
    title: "Surviving a Storm on Kilimanjaro",
    excerpt: "When the weather turns at 4,600 m, will it find you prepared? It isn't just about rain, it's a test of preparation, focus and resilience.",
    featuredImage: "/assets/storiesFromTheTrails/SurvivingAStormOnKilimanjaro/SurvivingAStormOnKilimanjaro.png",
    category: "Mountain Stories"
  },
  {
    id: "hidden-waterfalls",
    slug: "hidden-waterfalls",
    title: "Hidden Waterfalls",
    excerpt: "Magnificent waterfalls that few hikers witness.",
    featuredImage: "/assets/storiesFromTheTrails/HiddenWaterfalls/HiddenWaterfalls.png",
    category: "Discovery"
  },
  // Data for the future Blog/View More page
  {
    id: "satima-clouds",
    slug: "cloud-trail-to-satima",
    title: "Cloud Trail to Satima",
    excerpt: "Walking through the moorlands of the Aberdares where the sky meets the earth.",
    featuredImage: "/assets/storiesFromTheTrails/Satima/Satima.png",
    category: "Moorlands"
  },
  {
    id: "mackinders-camp",
    slug: "mackinders-camp-diaries",
    title: "Mackinders Camp Diaries",
    excerpt: "Cold nights and high spirits at the base of the peaks.",
    featuredImage: "/assets/storiesFromTheTrails/MackindersCamp/MackindersCamp.png",
    category: "Basecamp"
  },
  {
    id: "rurimeria-hills",
    slug: "the-steeps-of-rurimeria",
    title: "The Steeps of Rurimeria",
    excerpt: "Testing your knees and your resolve on the steepest ridges of the Aberdares.",
    featuredImage: "/assets/storiesFromTheTrails/RurimeriaHills/RurimeriaHills.png",
    category: "Endurance"
  },
  {
    id: "elephant-hill",
    slug: "elephant-hill-trek",
    title: "Elephant Hill Trek",
    excerpt: "A classic day hike that never fails to challenge the soul.",
    featuredImage: "/assets/storiesFromTheTrails/ElephantHill/ElephantHill.png",
    category: "Day Hikes"
  }
];