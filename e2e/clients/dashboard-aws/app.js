import { AOTP11 } from '@AOTP11/core'
import Dashboard from '@AOTP11/dashboard'
import AwsS3 from '@AOTP11/aws-s3'

import '@AOTP11/core/dist/style.css'
import '@AOTP11/dashboard/dist/style.css'

const AOTP11 = new AOTP11()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
  })

