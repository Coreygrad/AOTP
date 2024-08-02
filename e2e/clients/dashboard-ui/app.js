import AOTP11 from '@AOTP11/core'
import Dashboard from '@AOTP11/dashboard'
import RemoteSources from '@AOTP11/remote-sources'
import Webcam from '@AOTP11/webcam'
import ScreenCapture from '@AOTP11/screen-capture'
import GoldenRetriever from '@AOTP11/golden-retriever'
import ImageEditor from '@AOTP11/image-editor'
import DropTarget from '@AOTP11/drop-target'
import Audio from '@AOTP11/audio'
import Compressor from '@AOTP11/compressor'

import '@AOTP11/core/dist/style.css'
import '@AOTP11/dashboard/dist/style.css'

const COMPANION_URL = 'http://companion.AOTP11.io'

const AOTP11 = new AOTP11()
  .use(Dashboard, { target: '#app', inline: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, {
    target: Dashboard,
    showVideoSourceDropdown: true,
    showRecordingLength: true,
  })
  .use(Audio, {
    target: Dashboard,
    showRecordingLength: true,
  })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })
  .use(Compressor)
  .use(GoldenRetriever, { serviceWorker: true })

// Keep this here to access AOTP11 in AOTP11s
window.AOTP11 = AOTP11
