import { TCubic } from '@/types'

function loadImage (src = '') :Promise<any> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    img.src = src
  })
}

function getSvgData (cubicBezier:TCubic) :string {
  const p = getSvgPath(cubicBezier)
  return `<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  x="0"
  y="0"
  width="300"
  height="300"
  viewBox="0 0 300 300"
>
  <path
    fill="none"
    stroke="#00ff00"
    stroke-width="20"
    d="M${p[0].x + 1} ${p[0].y - 1} C ${p[1].x} ${p[1].y}, ${p[2].x} ${p[2].y}, ${p[3].x - 1} ${p[3].y + 1}"
  />
  <circle
    cx="${p[0].x}"
    cy="${p[0].y}"
    r="20"
    fill="#ffffff"
  />
  <circle
    cx="${p[3].x}"
    cy="${p[3].y}"
    r="20"
    fill="#ffffff"
  />
</svg>`
}

function getSvgPath (cubicBezier:TCubic) :{x:number, y:number}[] {
  const state = {
    size: 200,
    offset: 50
  }

  const [x1, y1, x2, y2] = cubicBezier
  const p1x = x1 * state.size + state.offset
  const p1y = y1 * state.size + state.offset
  const p2x = x2 * state.size + state.offset
  const p2y = y2 * state.size + state.offset

  return [
    {
      x: state.offset,
      y: state.size + state.offset
    },
    {
      x: p1x,
      y: state.size + (state.offset * 2) - p1y
    },
    {
      x: p2x,
      y: state.size + (state.offset * 2) - p2y
    },
    {
      x: state.size + state.offset,
      y: state.offset
    }
  ]
}

export default function useFavicon () {
  const createSVGToPNG = async (cubicBezier:TCubic) :Promise<any> => {
    const svgData = getSvgData(cubicBezier)
    const src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    const canvas = document.createElement('canvas')
    canvas.width = 300
    canvas.height = 300
    const ctx = canvas.getContext('2d')

    const image = await loadImage(src)

    ctx!.drawImage(image, 0, 0)

    const exportImage = canvas.toDataURL('image/png')

    return exportImage
  }

  const changeFavicon = async (cubicBezier:TCubic) => {
    const image = await createSVGToPNG(cubicBezier)
    let favicon:any = document.querySelector("link[rel*='icon']")

    if (!favicon) {
      const link = document.createElement('link')
      link.type = 'image/png'
      link.rel = 'shortcut icon'
      link.href = image
      document.getElementsByTagName('head')[0].appendChild(link)

      favicon = link
    }

    favicon!.href = image
  }

  return {
    changeFavicon
  }
}
