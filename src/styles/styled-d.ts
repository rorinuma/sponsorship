import 'styled-components';
// src/styles/styled.d.ts

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text: {
        placeholder: string;
        muted: string;
        primary: string;
        skyBlue: string;
        orange: string;
        blue: string;
      };
      background: {
        skyBlue: string;
        orange: string;
        blue: string;
      };
      containerBackground: {
        skyBlue: string;
        orange: string;
        blue: string;
      };
      icons: {
        success: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}

