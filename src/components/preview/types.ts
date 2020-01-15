export interface IDemoStyle {
  id: string
  name: string
  component: string
}

export interface IDemoProps {
  cubicBezier: number[],
  compareCubicBezier: number[],
  duration: number,
  repeat: boolean
}
