export type TCubic = [
  number,
  number,
  number,
  number
]

export type TPoint2D = {
  [key in 'x' | 'y'] : number
}

export enum ECubic {
  TOP_LEFT = 0,
  TOP_RIGHT = 1,
  BOTTOM_RIGHT = 2,
  BOTTOM_LEFT = 4,
}

export enum ESnackbarType {
  normal = 'normal',
  success = 'success',
  error = 'error',
  warning = 'warning'
}

export interface IDemoProps {
  cubicBezier: TCubic,
  compareCubicBezier: TCubic,
  duration: number,
  repeat: boolean
}

export interface IDemoStyle {
  id: string
  name: string
  component: string
}

// Store
export interface IStore {
  generatorStore: any,
  snackbar: any
}

export type TStoreModule = 'generatorStore' | 'snackbar'
