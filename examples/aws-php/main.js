import AOTP11 from '@AOTP11/core'
import Dashboard from '@AOTP11/dashboard'
import AwsS3 from '@AOTP11/aws-s3'

const AOTP11 = new AOTP11({
  debug: true,
})

AOTP11.use(Dashboard, {
  inline: true,
  target: 'body',
})
AOTP11.use(AwsS3, {
  shouldUseMultipart: false, // The PHP backend only supports non-multipart uploads

  getUploadParameters (file) {
    // Send a request to our PHP signing endpoint.
    return fetch('/s3-sign.php', {
      method: 'post',
      // Send and receive JSON.
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    }).then((response) => {
      // Parse the JSON response.
      return response.json()
    }).then((data) => {
      // Return an object in the correct shape.
      return {
        method: data.method,
        url: data.url,
        fields: data.fields,
        headers: data.headers,
      }
    })
  },
})
