import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const inputPath = join(publicDir, 'astra-logo.png')

/** Sample corners to detect solid background color. */
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
  const threshold = 48

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

async function writePng(pipeline, name, size) {
  const out = join(publicDir, name)
  await pipeline
    .clone()
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: size <= 32 ? 0.65 : 0.4, m1: 1, m2: 0.4 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(out)
  console.log(`wrote ${name} (${size}x${size})`)
}

async function writeSvgIcon(pipeline) {
  const png32 = await pipeline
    .clone()
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer()

  const base64 = png32.toString('base64')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="AstraPanel">
  <image width="32" height="32" href="data:image/png;base64,${base64}"/>
</svg>`
  writeFileSync(join(publicDir, 'favicon.svg'), svg)
  console.log('wrote favicon.svg')
}

const transparent = await removeBackground()
await writePng(transparent, 'favicon-32.png', 32)
await writePng(transparent, 'favicon-48.png', 48)
await writePng(transparent, 'favicon-180.png', 180)
await writePng(transparent, 'astra-logo-icon-48.png', 48)
await writePng(transparent, 'astra-logo-icon-96.png', 96)
await writeSvgIcon(transparent)
