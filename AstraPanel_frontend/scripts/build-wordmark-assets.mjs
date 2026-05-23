import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const inputPath = join(publicDir, 'astra-wordmark.png')

function sampleBackground(rgb, width, height) {
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ]
  const samples = corners.map(([x, y]) => {
    const i = (y * width + x) * 4
    return [rgb[i], rgb[i + 1], rgb[i + 2]]
  })
  const avg = samples.reduce((acc, [r, g, b]) => [acc[0] + r, acc[1] + g, acc[2] + b], [0, 0, 0])
  return avg.map((v) => Math.round(v / samples.length))
}

function colorDistance(r, g, b, bg) {
  const dr = r - bg[0]
  const dg = g - bg[1]
  const db = b - bg[2]
  return Math.sqrt(dr * dr + dg * dg + db * db)
}

async function removeBackground() {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const bg = sampleBackground(data, width, height)
  const threshold = 52

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (colorDistance(r, g, b, bg) <= threshold) {
      data[i + 3] = 0
    }
  }

  return sharp(data, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 })
}

async function resizeWordmark(pipeline, height, outName) {
  const out = join(publicDir, outName)
  const buffer = await pipeline
    .clone()
    .resize({ height, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: height <= 40 ? 0.55 : 0.35, m1: 1, m2: 0.35 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer()

  const meta = await sharp(buffer).metadata()
  await sharp(buffer).toFile(out)
  console.log(`wrote ${outName} (${meta.width}x${meta.height})`)
  return meta
}

async function writeSquareFavicon(pipeline, size, outName) {
  const markBuffer = await pipeline
    .clone()
    .resize({
      width: size - 4,
      height: size - 8,
      fit: 'inside',
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.5, m1: 1, m2: 0.35 })
    .png()
    .toBuffer()

  const markMeta = await sharp(markBuffer).metadata()
  const markW = markMeta.width ?? size
  const markH = markMeta.height ?? size
  const padX = Math.max(0, Math.floor((size - markW) / 2))
  const padY = Math.max(0, Math.floor((size - markH) / 2))
  const padRight = Math.max(0, size - markW - padX)
  const padBottom = Math.max(0, size - markH - padY)

  const out = join(publicDir, outName)
  await sharp(markBuffer)
    .extend({
      top: padY,
      bottom: padBottom,
      left: padX,
      right: padRight,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(out)

  console.log(`wrote ${outName} (${size}x${size})`)
}

async function writeFaviconSvg(pipeline) {
  const png32 = await pipeline
    .clone()
    .resize({ height: 14, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.45, m1: 1, m2: 0.35 })
    .png()
    .toBuffer()

  const base64 = png32.toString('base64')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Astra Panel">
  <image width="32" height="32" href="data:image/png;base64,${base64}"/>
</svg>`
  writeFileSync(join(publicDir, 'favicon.svg'), svg)
  console.log('wrote favicon.svg (wordmark)')
}

const transparent = await removeBackground()
const sidebar1x = await resizeWordmark(transparent, 38, 'astra-wordmark-38.png')
await resizeWordmark(transparent, 76, 'astra-wordmark-76.png')

await writeSquareFavicon(transparent, 32, 'favicon-32.png')
await writeSquareFavicon(transparent, 48, 'favicon-48.png')
await writeSquareFavicon(transparent, 180, 'favicon-180.png')
await writeFaviconSvg(transparent)

writeFileSync(
  join(publicDir, 'astra-wordmark-transparent.png'),
  await transparent.clone().png({ compressionLevel: 9 }).toBuffer(),
)
console.log('wrote astra-wordmark-transparent.png')

console.log('sidebar intrinsic:', sidebar1x.width, 'x', sidebar1x.height)
