export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  altitude: string;
  imageUrl: string;
  slug: string;
  type: "small" | "tall";
}

export const galleryItems: GalleryItem[] = [
  {
    id: "lenana-light",
    title: "Lenana at first light",
    location: "Mt Kenya, Kenya",
    altitude: "5,199m",
    imageUrl: "/assets/gallery/LenanaAtFirstLight/lenanaatfirstlight.png",
    slug: "lenana-at-first-light",
    type: "small",
  },
  {
    id: "edge-rift",
    title: "Edge of the Rift",
    location: "Rift Valley, Kenya",
    altitude: "4,321m",
    imageUrl: "/assets/gallery/EdgeOfTheRift/edgeoftherift.png",
    slug: "edge-of-the-rift",
    type: "small",
  },
  {
    id: "dawn-highest",
    title: "Dawn at Africa's highest peak",
    location: "Kilimanjaro, Tanzania",
    altitude: "5,895m",
    imageUrl: "/assets/gallery/DawnAtAfricasHighestPeak/dawnatafricashighestpeak.png",
    slug: "dawn-at-africas-highest-peak",
    type: "tall",
  },
  {
    id: "misty-rwenzori",
    title: "Misty steps on Rwenzori",
    location: "Mt Rwenzori, Uganda",
    altitude: "5,109m",
    imageUrl: "/assets/gallery/MistyStepsOnRwenzori/mistystepsonrwenzori.png",
    slug: "misty-steps-on-rwenzori",
    type: "small",
  },
  {
    id: "cloud-satima",
    title: "Cloud trail to Satima",
    location: "Aberdares, Kenya",
    altitude: "4,001m",
    imageUrl: "/assets/gallery/CloudTrailToSatima/cloudtrailtosatima.png",
    slug: "cloud-trail-to-satima",
    type: "small",
  },
];