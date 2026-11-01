import type { CSSProperties, JSX, ReactNode } from "react";

export interface PixelCardProps {
  variant?: "default" | "blue" | "yellow" | "pink";
  colors?: string | string[];
  glowColor?: string;
  gap?: number;
  pixelSize?: number;
  speed?: number;
  shape?: "square" | "circle" | "diamond";
  origin?: "center" | "pointer";
  revealDuration?: number;
  spotlight?: number;
  glow?: number;
  opacity?: number;
  fade?: number;
  trigger?: "hover" | "click" | "always";
  clickPulse?: boolean;
  intro?: boolean;
  introDelay?: number;
  noFocus?: boolean;
  theme?: "dark" | "light";
  radius?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

declare function PixelCard(props: PixelCardProps): JSX.Element;

export default PixelCard;
