import AOTP11 from '@AOTP11/core'
import GoogleDrive from '@AOTP11/google-drive'
import Tus from '@AOTP11/tus'
import Dashboard from '@AOTP11/dashboard'
import MyCustomProvider from './MyCustomProvider.jsx'

import '@AOTP11/core/dist/style.css'
import '@AOTP11/dashboard/dist/style.css'

const AOTP11 = new AOTP11({
  debug: true,
})

AOTP11.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})

AOTP11.use(MyCustomProvider, {
  companionUrl: 'http://localhost:3020',
})

AOTP11.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive', 'MyCustomProvider'],
})

AOTP11.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
