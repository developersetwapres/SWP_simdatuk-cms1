import {
  GET_MENU_REQUESTED,
  GET_DETAIL_MENU_REQUESTED,
  POST_MENU_REQUESTED,
  DELETE_MENU_REQUESTED
} from '../constants'

/**
 * Get Menu 
 * 
 * @param {*} payload 
 * @returns
 */
export const getMenu = (payload) => ({
  type: GET_MENU_REQUESTED,
  payload: payload
})

/**
 * Get Detail Menu 
 * 
 * @param {*} id 
 * @returns
 */
export const getDetailMenu = (id) => ({
  type: GET_DETAIL_MENU_REQUESTED,
  payload: id
})

/**
 * Post Menu 
 * 
 * @param {*} payload
 * @returns
 */
export const postMenu = (payload) => ({
  type: POST_MENU_REQUESTED,
  payload: payload
})

/**
 * delete menu 
 * 
 * @param {*} id 
 * @returns
 */
export const deleteMenu = (id) => ({
  type: DELETE_MENU_REQUESTED,
  payload: id
})