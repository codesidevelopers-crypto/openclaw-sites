import 'styled-components'
import type { AppTheme } from '../styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}
