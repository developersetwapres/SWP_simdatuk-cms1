// Modular Firebase V.9 Init

import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, deleteToken } from 'firebase/messaging'
import { setStorages } from './storage'

const firebaseConfig = ({
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID}`,
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
  measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`
})

initializeApp(firebaseConfig)

/**
 * 
 * Request token fcm
 * 
 * 
 */
export const requestForToken = () => {
  const messaging = getMessaging()
  getToken(messaging, { vapidKey: `${process.env.NEXT_PUBLIC_FIREBASE_KEY_PAIR}` })
    .then((currentToken) => {
      if (currentToken) {
        setStorages([
          {
            name: 'setneg_notification',
            value: currentToken
          }
        ])
      } else {
        console.log('No registration token available. Request permission to generate one.')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * 
 * Message listener 
 * 
 * 
 */
export const onMessageListener = () => {
  const messaging = getMessaging()
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
}

/**
 * 
 * Delete token fcm
 * 
 * 
 */
export const onDeleteToken = () => {
  const messaging = getMessaging()
  deleteToken(messaging)
}


// function initFirebase() {
//   if (typeof window !== undefined) {
//     initializeApp(clientCredentials)
//     console.log('Firebase Init')
//   }
// }

// const appFirebase = initializeApp(clientCredentials)

// export { appFirebase, initFirebase }
