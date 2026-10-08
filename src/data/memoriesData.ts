import { image } from "framer-motion/client";

export interface MemoryItem {
  id: string;
  image: string;
  title: string;
  description: string;
  date?: string;
  aspect: "tall" | "wide" | "square";
  accentColor?: string;
}

export const memoriesData: MemoryItem[] = [
  {
    id: "mem-1",
    image: "/images/memory1.jpeg",
    title: "",
    aspect: "tall",
    accentColor: "from-rose-500/20 to-purple-500/10",
    description: ""
  },
  {
    id: "mem-2",
    image: "/images/memory2.jpeg",
    title: "",
    description: "",
    aspect: "square",
    accentColor: "from-amber-500/20 to-rose-500/10",
  },
  {
    id: "mem-3",
    image: "/images/memory3.jpeg",
    title: "",
    description: "",
    aspect: "wide",
    accentColor: "from-lavender-400/20 to-rose-400/10",
  },
  {
    id: "mem-4",
    image: "/images/memory4.jpeg",
    title: "",
    aspect: "square",
    accentColor: "from-purple-500/20 to-amber-400/10",
    description: ""
  },
  {
    id: "mem-5",
    image: "/images/memory5.jpeg",
    title: "",
    description: "",
    aspect: "tall",
    accentColor: "from-rose-400/20 to-lavender-500/10",
  },
];
