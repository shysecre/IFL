import React from "react";

export interface InputProps {
  value?: string
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
