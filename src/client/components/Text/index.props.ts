import { HTMLAttributes } from "react";

export interface TextProps extends HTMLAttributes<HTMLHeadingElement> {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
