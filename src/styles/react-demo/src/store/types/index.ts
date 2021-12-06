export type listType = {
  id: number
  words: string
  completed: boolean
  time: number
}

export type defaultStateType = {
  list: listType[]
}

export type changeMessageType = {
  id: number
  inputVal: string
}

export type actionType = {
  type: 'addItem',
  inputVal: string
} | {
  type: 'delItem',
  id: number
} | {
  type: 'radioItem'
  id: number
} | {
  type: 'clearItem'
} | {
  type: 'allItem'
} | {
  type: 'changeItem',
  changeMessage: changeMessageType
}