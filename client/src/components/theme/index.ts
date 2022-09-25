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
}

const colors: ThemeColors = {
    black: "#000",
    darkestGrey: "#202225",
    darkerGrey: "#2f3136",
    darkGrey: "#36393f",
    grey: "#42464d",
    lightGrey: "#8e9297",
    lighterGrey: "#b9bbbe",
    lightestGrey: "#d7d9da",
    white: "#fff",
}

const theme = {colors}

export { theme, type ThemeColors}
