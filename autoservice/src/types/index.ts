// Service types
export interface Service {
  id: string
  title: string
  description: string
  price: string
  icon: string
  category: ServiceCategory
}

export type ServiceCategory =
  | 'diagnostics'
  | 'maintenance'
  | 'body'
  | 'paint'
  | 'tires'
  | 'electrical'

// Testimonial types
export interface Testimonial {
  id: string
  name: string
  rating: number
  date: string
  text: string
  car: string
}

// Gallery types
export interface GalleryItem {
  id: string
  title: string
  category: string
  beforeImage: string
  afterImage: string
}

// Booking form types
export interface BookingFormData {
  services: ServiceCategory[]
  carBrand: string
  carModel: string
  carYear: number
  mileage: string
  date: string
  time: string
  name: string
  phone: string
  email: string
  comment: string
}

export type BookingStep = 1 | 2 | 3 | 4

// Contact types
export interface ContactInfo {
  address: string
  phone: string
  email: string
  workingHours: WorkingHours[]
}

export interface WorkingHours {
  days: string
  hours: string
}

// Navigation types
export interface NavLink {
  label: string
  href: string
}

// Styled-components theme extension
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: string
      bgSecondary: string
      bgCard: string
      accent: string
      accentDark: string
      text: string
      textMuted: string
      textDim: string
      border: string
      borderLight: string
      success: string
      error: string
    }
    fonts: {
      heading: string
      body: string
    }
    fontSizes: {
      xs: string
      sm: string
      base: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      '4xl': string
      '5xl': string
      '6xl': string
    }
    spacing: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      section: string
    }
    breakpoints: {
      sm: string
      md: string
      lg: string
      xl: string
    }
    transitions: {
      fast: string
      base: string
      slow: string
    }
    shadows: {
      card: string
      glow: string
      glowStrong: string
    }
  }
}
