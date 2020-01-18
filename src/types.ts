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
