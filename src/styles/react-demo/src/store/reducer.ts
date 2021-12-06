import { getId } from '../utils'
import { listType, defaultStateType, actionType } from './types'

const defaultState: defaultStateType = {
  list: [
    {
      id: 0,
      words: 'React',
      completed: false,
      time: 1637718144816
    },
    {
      id: 1,
      words: 'TypeScript',
      completed: true,
      time: 1637718144818
    },
  ]
}

export default function (state: defaultStateType=defaultState, action: actionType): defaultStateType {
  // 新增数据
  if(action.type === 'addItem') {
    let newState: defaultStateType = JSON.parse(JSON.stringify(state))
    let value = {
      id: getId(newState.list),
      words: action.inputVal,
      completed: false,
      time: new Date().getTime()
    }
    newState.list.push(value)
    return newState
  }
  // 删除单条数据
  if(action.type === 'delItem') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list = newState.list.filter((item: listType) => item.id!==action.id)
    return newState
  }
  // 选中数据
  if(action.type === 'radioItem') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.forEach((item: listType) => {
      if(item.id === action.id) {
        item.completed = !item.completed
      }
    })
    return newState
  }
  // 批量删除数据
  if(action.type === 'clearItem') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list = newState.list.filter((item: listType) => !item.completed)
    return newState
  }
  // 全选数据
  if(action.type === 'allItem') {
    let newState = JSON.parse(JSON.stringify(state))
    let flag = newState.list.some((item: listType) => !item.completed)
    newState.list.forEach((item: listType) => {
      flag ? (item.completed=true) : (item.completed=false)
    })
    return newState
  }
  // 修改数据
  if(action.type === 'changeItem') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.forEach((item: listType) => {
      if(item.id === action.changeMessage.id) {
        item.words = action.changeMessage.inputVal
      }
    })
    return newState
  }

  return state
}