export const Colors = {
  background: '#F8F7F4',
  surface: '#FFFFFF',
  primary: '#1A1A2E',
  accent: '#4F46E5',
  accentLight: '#EEF2FF',
  success: '#16A34A',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  text1: '#111827',
  text2: '#6B7280',
  text3: '#9CA3AF',
  border: '#E5E7EB',
  divider: '#F3F4F6',
  // Tab bar upcoming section accent
  upcoming: '#3B82F6',
  upcomingLight: '#DBEAFE',
  upcomingText: '#1D4ED8',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 24,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

export const Typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', // system font
  h1: { fontSize: 26, fontWeight: '700' as const, color: Colors.text1 },
  h2: { fontSize: 22, fontWeight: '600' as const, color: Colors.text1 },
  h3: { fontSize: 18, fontWeight: '600' as const, color: Colors.text1 },
  body: { fontSize: 15, fontWeight: '400' as const, color: Colors.text1 },
  bodySmall: { fontSize: 13, fontWeight: '400' as const, color: Colors.text2 },
  caption: { fontSize: 12, fontWeight: '400' as const, color: Colors.text3 },
  label: { fontSize: 13, fontWeight: '500' as const, color: Colors.text1 },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
    color: Colors.text2,
  },
} as const;

export const TAB_BAR_HEIGHT = 56; // 8px top pad + ~24px icon+label + 24px bottom safe area inset approx
export const MIN_TOUCH_TARGET = 44;
