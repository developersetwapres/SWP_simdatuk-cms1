import React, { useState } from 'react'
import { Snackbar as MuiSnackbar, Alert } from '@mui/material'
import { useSelector } from 'react-redux'
// import { getStorage } from '@/utils/storage'
// import { onDeleteToken, onMessageListener } from '@/utils/firebaseInit'
// import { POST_NOTIFICATION_REQUESTED, SET_NOTIFICATION } from '@/store/constants'

function Snackbar() {
  const [open, setOpen] = useState(false)
  // const dispatch = useDispatch()
  const selector = useSelector((state) => state.notificationReducer)
  // const getNotification = getStorage('setneg_notification')

  // useEffect(() => {
  //   if (getNotification !== null) {
  //     onMessageListener().then(payload => {
  //       setOpen(true)
  //       dispatch({
  //         type: POST_NOTIFICATION_REQUESTED,
  //         payload: {
  //           notification_token: getNotification
  //         }
  //       })
  //       dispatch({
  //         type: SET_NOTIFICATION,
  //         payload: {
  //           title: payload?.notification?.title,
  //           body: payload?.notification?.body
  //         }
  //       })
  //     })
  //   } else {
  //     onDeleteToken()
  //     setOpen(true)
  //     dispatch({
  //       type: SET_NOTIFICATION,
  //       payload: {
  //         title: 'Please Allow Notification',
  //         body: 'Thanks'
  //       }
  //     })
  //   }
  // }, [getNotification, dispatch])
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <Alert
        severity='info'
        sx={{ width: '100%' }}
        onClose={() => setOpen(false)}
      >
        <p>{selector?.title}</p>
        <p>{selector?.body}</p>
      </Alert>
    </MuiSnackbar>
  )
}


export default Snackbar