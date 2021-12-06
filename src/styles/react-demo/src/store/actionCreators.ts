import { ADD_ITEM, ALL_ITEM, CHANGE_ITEM, CLEAR_ITEM, DEL_ITEM, RADIO_ITEM } from './actionType'
import { changeMessageType } from './types'

export const addItemAction = (inputVal: string) => ({
    type: ADD_ITEM,
    inputVal
})
export const delItemAction = (id: number) => ({
    type: DEL_ITEM,
    id
})
export const radioItemAction = (id: number) => ({
    type: RADIO_ITEM,
    id
})
export const clearItemAction = () => ({
    type: CLEAR_ITEM
})
export const allItemAction = () => ({
    type: ALL_ITEM
})
export const changeItemAction = (changeMessage: changeMessageType) => ({
    type: CHANGE_ITEM,
    changeMessage
})