/* eslint-disable indent */

// eslint-disable-next-line no-unused-vars
import { DASHBOARD_USER_REQUESTED } from '@/store/constants'

const initialState = {
  loading: false,
  error: null,
  user: [
    {
      label: 'Jumlah Pengguna',
      value: 1900
    },
    {
      label: 'Pengguna Aktif',
      value: 1000
    },
    {
      label: 'Pengguna non-aktif',
      value: 900
    }
  ]
}


// eslint-disable-next-line no-unused-vars
export const dashboard = (state = initialState, actions) => {
    return state
}
