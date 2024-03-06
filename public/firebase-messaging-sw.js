/* eslint-disable no-unused-vars */
importScripts('https://www.gstatic.com/firebasejs/9.12.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.12.1/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: 'AIzaSyDgg6vhuI7X28a_05C45NRrMgWQGE2KN1c',
  authDomain: 'playbook-development-f6f94.firebaseapp.com',
  projectId: 'playbook-development-f6f94',
  storageBucket: 'playbook-development-f6f94.appspot.com',
  messagingSenderId: '949225623910',
  appId: '1:949225623910:web:729426a1ac6d1aa50f38a7'
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }
  self.registration.showNotification(notificationTitle,
    notificationOptions)

  // self.registration.showNotification(notificationTitle, notificationOptions)
})

