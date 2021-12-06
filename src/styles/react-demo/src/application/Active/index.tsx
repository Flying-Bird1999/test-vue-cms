import React from 'react'
import { useSelector } from 'react-redux'
import List from '../../components/List/index'
import { defaultStateType } from '../../store/types'


function  Active() {
  const { list } = useSelector((state: defaultStateType) => {
    return {
      list: state.list
    }
  })
  return (
    <div>
      <List list={list.filter(item => !item.completed)} ></List>
    </div>
  )
}

export default Active