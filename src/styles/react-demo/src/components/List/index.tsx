import React from "react";
import { ListProps } from './type'
import { listType } from "../../store/types";
import ListItem from "../ListItem";

const List: React.FC<ListProps> = (props) => {
  return (
    <div>
      {
        props.list.map((item: listType) => {
          return (
            <ListItem key={item.id} {...item} />
          )
        })
      }
    </div>
  )
}

export default List