import classNames from "classnames";
import React from "react";
import { TextProps } from "./index.props";

export const Text: React.FC<TextProps> = ({
  type = "h1",
  children,
  className,
}): JSX.Element => {
  const Heading = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return React.createElement(type, props, children);
  };

  return <Heading className={classNames(className)}>{children}</Heading>;
};
