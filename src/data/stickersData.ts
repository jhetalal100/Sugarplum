export interface StickerConfig {
  id: string;
  src: string;
  alt: string;
  initialMessage: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  rotation: number;
  scale?: number;
  animationType?: "float" | "bounce" | "wiggle" | "pulse";
  delay?: number;
  speechBubblePosition?: "top" | "bottom" | "left" | "right";
}

export const catMessages: string[] = [];

export function getRandomCatMessage(excludeMessage?: string): string {
  const filtered = excludeMessage
    ? catMessages.filter((m) => m !== excludeMessage)
    : catMessages;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Well-spaced asymmetrical positioning coordinates (Zero overlap!)
export const catStickersData: StickerConfig[] = [
  {
    id: "cat-1",
    src: "/stickers/stk-1.png",
    alt: "",
    initialMessage: "Yayyy! It's my birthday today🥳",
    position: { top: "5%", left: "4%" },
    rotation: -8,
    scale: 1.05,
    animationType: "float",
    delay: 0.1,
    speechBubblePosition: "right",
  },
  {
    id: "cat-2",
    src: "/stickers/stk-2.png",
    alt: "",
    initialMessage: "Happy birthday Srivigna! Have a wonderful day💖",
    position: { top: "5%", right: "4%" },
    rotation: 12,
    scale: 1,
    animationType: "wiggle",
    delay: 0.3,
    speechBubblePosition: "left",
  },
  {
    id: "cat-3",
    src: "/stickers/stk-3.png",
    alt: "",
    initialMessage: "Hey Srivigna! Wish you a very happy birthday🤗",
    position: { top: "40%", left: "4%" },
    rotation: -5,
    scale: 1.05,
    animationType: "bounce",
    delay: 0.5,
    speechBubblePosition: "top",
  },
  {
    id: "cat-4",
    src: "/stickers/stk-4.png",
    alt: "",
    initialMessage: "Happy birthday pinkuluuuuu🫶❤️❤️",
    position: { top: "40%", right: "4%" },
    rotation: 6,
    scale: 1.1,
    animationType: "float",
    delay: 0.2,
    speechBubblePosition: "top",
  },
  {
    id: "cat-5",
    src: "/stickers/stk-5.png",
    alt: "",
    initialMessage: "Reporting on duty,Madam!😁",
    position: { bottom: "5%", left: "1%" },
    rotation: -10,
    scale: 0.95,
    animationType: "pulse",
    delay: 0.4,
    speechBubblePosition: "right",
  },
  {
    id: "cat-6",
    src: "/stickers/stk-6.png",
    alt: "",
    initialMessage: "Hehe😅",
    position: { bottom: "5%", right: "1%" },
    rotation: 10,
    scale: 1,
    animationType: "wiggle",
    delay: 0.6,
    speechBubblePosition: "left",
  },
];
