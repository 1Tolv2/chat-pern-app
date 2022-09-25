type ThemeColors = {
    black: string,
    darkestGrey: string,
    darkerGrey: string,
    darkGrey: string,
    grey: string,
    lightGrey: string,
    lighterGrey: string,
    lightestGrey: string,
    white: string,
    blue: string,
}

const colors: ThemeColors = {
    black: "#000",
    darkestGrey: "#202225",
    darkerGrey: "#2f3136",
    darkGrey: "#36393f",
    grey: "#42464d",
    lightGrey: "#96989d",
    lighterGrey: "#b9bbbe",
    lightestGrey: "#dcddde",
    white: "#fff",
    blue: "#3498db",
}

const size = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "475px",
    tablet: "768px",
    laptop: "1025px",
    laptopS: "1160px",
    laptopM: "1340px",
    laptopL: "1440px",
    desktop: "2560px",
  };
  
  const breakpoints = {
    mobileS: `@media (min-width: ${size.mobileS})`,
    mobileM: `@media (min-width: ${size.mobileM})`,
    mobileL: `@media (min-width: ${size.mobileL})`,
    tablet: `@media (min-width: ${size.tablet})`,
    laptop: `@media (min-width: ${size.laptop})`,
    laptopM: `@media (min-width: ${size.laptopM})`,
    laptopL: `@media (min-width: ${size.laptopL})`,
    desktop: `@media(min-width: ${size.desktop})`,
    desktopL: `@media (min-width: ${size.desktop})`,
  }
  

const theme = {colors, breakpoints}

export { theme, type ThemeColors}
