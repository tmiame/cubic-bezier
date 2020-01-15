
export const nextTick = (cb:() => void) => window.requestAnimationFrame(cb)
export const sleep = (msec:number) => new Promise(resolve => setTimeout(resolve, msec))

export function sliceMaxLength (target:string|number, maxLength:number) :number {
  return Number((target + '').slice(0, maxLength))
}
