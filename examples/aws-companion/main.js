import AwsS3 from '@AOTP11/aws-s3'
import AOTP11 from '@AOTP11/core'
import Dashboard from '@AOTP11/dashboard'
import GoogleDrive from '@AOTP11/google-drive'
import Webcam from '@AOTP11/webcam'

import '@AOTP11/core/dist/style.css'
import '@AOTP11/dashboard/dist/style.css'
import '@AOTP11/webcam/dist/style.css'

const AOTP11 = new AOTP11({
  debug: true,
  autoProceed: false,
})

AOTP11.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})
AOTP11.use(Webcam)
AOTP11.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive', 'Webcam'],
})
AOTP11.use(AwsS3, {
  companionUrl: 'http://localhost:3020',
})
