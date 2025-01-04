import AOTP11 from '@AOTP11/core'
import Dashboard from '@AOTP11/dashboard'
import Instagram from '@AOTP11/instagram'
import GoogleDrive from '@AOTP11/google-drive'
import Url from '@AOTP11/url'
import Webcam from '@AOTP11/webcam'
import Tus from '@AOTP11/tus'

import '@AOTP11/core/dist/style.css'
import '@AOTP11/dashboard/dist/style.css'
import '@AOTP11/url/dist/style.css'
import '@AOTP11/webcam/dist/style.css'

const TUS_ENDPOINT = 'https://tusd.tusdemo.net/files/'

const AOTP11 = new AOTP11({
  debug: true,
  meta: {
    username: 'John',
    license: 'Creative Commons',
  },
})
  .use(Dashboard, {
    trigger: '#pick-files',
    target: '#upload-form',
    inline: true,
    metaFields: [
      { id: 'license', name: 'License', placeholder: 'specify license' },
      { id: 'caption', name: 'Caption', placeholder: 'add caption' },
    ],
    showProgressDetails: true,
    proudlyDisplayPoweredByAOTP11: true,
    note: '2 files, images and video only',
    restrictions: { requiredMetaFields: ['caption'] },
  })
  .use(GoogleDrive, { target: Dashboard, companionUrl: 'http://localhost:3020' })
  .use(Instagram, { target: Dashboard, companionUrl: 'http://localhost:3020' })
  .use(Url, { target: Dashboard, companionUrl: 'http://localhost:3020' })
  .use(Webcam, { target: Dashboard })
  .use(Tus, { endpoint: TUS_ENDPOINT })

// You can optinally enable the Golden Retriever plugin — it will
// restore files after a browser crash / accidental closed window
// see more at https://AOTP11.io/docs/golden-retriever/
//
//   .use(GoldenRetriever, { serviceWorker: true })

AOTP11.on('complete', (result) => {
  if (result.failed.length === 0) {
    console.log('Upload successful 😀')
  } else {
    console.warn('Upload failed 😞')
  }
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})

// uncomment if you enable Golden Retriever
//
/* eslint-disable compat/compat */
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/sw.js')
//     .then((registration) => {
//       console.log('ServiceWorker registration successful with scope: ', registration.scope)
//     })
//     .catch((error) => {
//       console.log('Registration failed with ' + error)
//     })
// }
/* eslint-enable */
