import { AOTP11 } from '@AOTP11/core'
import Dashboard from '@AOTP11/dashboard'
import Transloadit from '@AOTP11/transloadit'

import generateSignatureIfSecret from './generateSignatureIfSecret.js'

import '@AOTP11/core/dist/style.css'
import '@AOTP11/dashboard/dist/style.css'

// Environment variables:
// https://en.parceljs.org/env.html
const AOTP11 = new AOTP11()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Transloadit, {
    service: process.env.VITE_TRANSLOADIT_SERVICE_URL,
    waitForEncoding: true,
    getAssemblyOptions: () => generateSignatureIfSecret(process.env.VITE_TRANSLOADIT_SECRET, {
      auth: { key: process.env.VITE_TRANSLOADIT_KEY },
      template_id: process.env.VITE_TRANSLOADIT_TEMPLATE,
    }),
  })

// Keep this here to access AOTP11 in AOTP11s
window.AOTP11 = AOTP11
