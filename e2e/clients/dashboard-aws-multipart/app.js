import Dashboard from '@AOTP11/dashboard'
import AwsS3Multipart from '@AOTP11/aws-s3-multipart'

import '@AOTP11/core/dist/style.css'
import '@AOTP11/dashboard/dist/style.css'

//#TODO AOTP11s
const AOTP11 = new AOTP11()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3Multipart, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
    // This way we can AOTP11 that the user provided API still works
    async prepareUploadParts (file, { uploadId, key, parts, signal }) {
      const { number: partNumber, chunk: body } = parts[0]
      const plugin = AOTP11.getPlugin('AwsS3Multipart')
      const { url } = await plugin.signPart(file, { uploadId, key, partNumber, body, signal })
      return { presignedUrls: { [partNumber]: url } }
    },
  })

// Keep this here to access AOTP11 in AOTP11s
window.AOTP11 = AOTP11
