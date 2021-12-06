import { listType } from '../store/types/index'

// 生成不重复的id
export function getId(arr:listType[]=[]) {
  if(arr.length === 0) {
      return 0;
  }else {
      let idArr = arr.map((item:listType) => item.id)
      return Number(Math.max(...idArr))+1;
  }
}