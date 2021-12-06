import React, {useState, useRef} from "react";
import { useDispatch } from 'react-redux'
import { delItemAction, radioItemAction, changeItemAction } from '../../store/actionCreators'
import { listType } from "../../store/types";
import './index.less'

const ListItem: React.FC<listType> = (props) => {
  let dispatch = useDispatch()

  let [delFlag, setDelFlag] = useState<number|null>(null) // 用于标记删除符号的显示隐藏
  let [selectFlag, setSelectFlag] = useState<number|null>(null) // 用于标记checkbox的显示隐藏
  let [inputFlag, setInputFlag] = useState<boolean>(false) // 控制input和label的切换

  // input框ref
  let inputRef = useRef<HTMLInputElement>(null)

  // 双击输入框修改事件
  let checkboxDouleClick = (item: listType) => {
      setInputFlag(true)
      setDelFlag(null)
      setSelectFlag(item.id)

      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
  };

  return (
    <div key={props.id} 
        className="List"
        onMouseEnter={() => setDelFlag(props.id)}
        onMouseLeave={() => setDelFlag(null)} >
          
      <input type="checkbox" 
          className={`List-input`}
          checked={props.completed} 
          id={`checkbox${props.id}`}
          hidden
          onChange={e => dispatch(radioItemAction(props.id))} />
      <label htmlFor={`checkbox${props.id}`}
          className={`List-input ${selectFlag===props.id?'hide':null}`}
      ></label>
      
      <label className={`List-words ${inputFlag?'input-hide':'input-show'} ${props.completed===true?'selected':null}`}
          onDoubleClick={() => checkboxDouleClick(props)}
      >{props.words}</label>
      <input className={`List-words ${inputFlag?'input-show':'input-hide'} ${props.completed===true?'selected':null}`}
          onBlur={() => {setSelectFlag(null); setInputFlag(false)}}
          ref={inputRef}
          value={props.words} 
          onChange={e => dispatch(changeItemAction({id:props.id, inputVal:e.target.value}))} /> 
      <span className={`List-del ${delFlag===props.id?null:'hide'}`} 
          onClick={e => dispatch(delItemAction(props.id))}>x</span>
    </div>
  )
}

export default ListItem