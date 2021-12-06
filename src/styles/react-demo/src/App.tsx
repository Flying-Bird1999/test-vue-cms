import React, { KeyboardEvent } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addItemAction, allItemAction, clearItemAction, delItemAction } from './store/actionCreators'
import { defaultStateType } from './store/types'
import routes from './routes/index'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import './App.less'

const App: React.FC = () => {
  const { list } = useSelector((state: defaultStateType) => {
    return {
      list: state.list
    }
  })
  const dispatch = useDispatch()

  // 输入框回车添加事件
  const onKeyDownChange = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = (e.target as HTMLInputElement)
    if(e.keyCode === 13 && target.value.trim() !== '') {
      dispatch(addItemAction(target.value))
      target.value = ''
    }
  }

  return (
    <div className="container">
      <span className="title">todos</span>
      <div className='middle'>
        <header className='header'>
          <span className={`h-all ${list.length?null:'hide'} ${list.filter(item=>item.completed).length===list.length?'allCompleted':null}`}
            onClick={() => dispatch(allItemAction())} >❯</span>
          <input type="text" 
              placeholder="What needs to be done?" 
              className="h-input" 
              onKeyDown={e => onKeyDownChange(e)} />
        </header>
        { renderRoutes(routes) }
        <footer className={`footer ${list.length?null:'hide'}`}>
          <div className="f-count">
            { list.filter(item=>!item.completed).length } items left
          </div>
          <ul className="f-route">
              <NavLink exact to="/">All</NavLink>
              <NavLink to="/active">Active</NavLink>
              <NavLink to="/completed">Completed</NavLink>
          </ul>
          <span className={`f-clear ${list.filter(v=>v.completed).length?null:'hide'}`}
            onClick={() => dispatch(clearItemAction())}>Clear completed</span>
        </footer>
      </div>
  </div>
  )
}

export default App;