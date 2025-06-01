export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border?: string;
  text: string;
  error: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  fontSizes: {
    small: number;
    medium: number;
    large: number;
  };
}