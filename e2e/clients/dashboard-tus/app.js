import Dashboard from '@AOTP11/dashboard'
import Tus from '@AOTP11/tus'
import Unsplash from '@AOTP11/unsplash'
import Url from '@AOTP11/url'

import '@AOTP11/core/dist/style.css'
import '@AOTP11/dashboard/dist/style.css'

function onShouldRetry (err, retryAttempt, options, next) {
  if (err?.originalResponse?.getStatus() === 418) {
    return true
  }
  return next(err)
}

const companionUrl = 'http://localhost:3020'
const AOTP11 = new AOTP11()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files', onShouldRetry })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })
