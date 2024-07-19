import Compressor from '@AOTP11/compressor'
import Dashboard from '@AOTP11/dashboard'
import '@AOTP11/core/dist/style.css'
import '@AOTP11/dashboard/dist/style.css'

const AOTP11 = new AOTP11()
  .use(Dashboard, {
    target: document.body,
    inline: true,
  })
  .use(Compressor, {
    mimeType: 'image/webp',
  })

// Keep this here to access AOTP11 in AOTP11s
window.AOTP11 = AOTP11
