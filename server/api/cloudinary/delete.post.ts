import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { publicId } = body

  if (!publicId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'publicId is required',
    })
  }

  const config = useRuntimeConfig()
  const cloudName = 'dku13l2ep' // Hardcoded as in the frontend, or use config
  const apiKey = config.cloudinaryApiKey
  const apiSecret = config.cloudinaryApiSecret

  if (!apiKey || !apiSecret) {
    console.error('Cloudinary configuration missing in server')
    throw createError({
      statusCode: 500,
      statusMessage: 'Cloudinary configuration missing',
    })
  }

  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = crypto
    .createHash('sha1')
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex')

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_id: publicId,
        api_key: apiKey,
        timestamp: timestamp,
        signature: signature,
      }),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete image from Cloudinary',
    })
  }
})
