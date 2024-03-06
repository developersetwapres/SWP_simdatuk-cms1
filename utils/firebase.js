import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { setStorages } from './storage'
import { appFirebase } from './firebaseInit'

/**
 * Request FCM
 */
export const requestForToken = () => {
  const messaging = getMessaging(appFirebase)
  getToken().then(messaging, { vapidKey: `BI-XJMtZ9gQtUAw53_HcOyCowNezgT9b-NDWTyk9DJ6zcS6yayddLZc1PMwfykBRCqXY062EIL8BYIlb7cCI-3I` })
    .then((currentToken) => {
      if (currentToken) {
        setStorages([
          {
            name: 'setneg_notification',
            value: currentToken
          }
        ])
      } else {
        setStorages([
          {
            name: 'setneg_notification',
            value: 'not'
          }
        ])
      }
    }).catch((err) => {
      console.log(err)
    })
}

/**
 * Message Listener
 * 
 */
export const onMessageListener = (messaging) => {
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
}

// /**
//  * Delete Token
//  */
// export const onDeleteToken = () => {
//   const messaging = getMessaging()
//   deleteToken(messaging)
// }