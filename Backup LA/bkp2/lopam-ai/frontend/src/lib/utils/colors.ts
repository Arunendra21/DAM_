export const colors = {
  primary: '#10B981',
  primaryLight: '#34D399',
  primaryDark: '#059669',
  secondary: '#0EA5E9',
  dark: '#030712',
  card: '#0D1117',
  border: '#1F2937',
  light: '#F9FAFB',
  white: '#FFFFFF',
  text: {
    light: '#0F172A',
    dark: '#F9FAFB',
    secondary: '#475569',
  },
  red: '#EF4444',
  yellow: '#FBBF24',
  orange: '#F97316',
  cyan: '#06B6D4',
}

export const getSurfaceColor = (isDark: boolean) => (isDark ? colors.card : colors.white)
export const getTextColor = (isDark: boolean) => (isDark ? colors.text.dark : colors.text.light)
export const getBgColor = (isDark: boolean) => (isDark ? colors.dark : colors.light)
