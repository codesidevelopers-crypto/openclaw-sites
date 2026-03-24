export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: 'coffee' | 'tea' | 'food' | 'dessert'
  emoji: string
}

export interface BookingFormData {
  name: string
  phone: string
  date: string
  time: string
  guests: string
  comment: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ApiSubmitResponse {
  ok: boolean
  message?: string
}
