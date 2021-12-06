import All from '../application/All'
import Active from '../application/Active'
import Completed from '../application/Completed'

export default [
  {
    path: '/',
    exact: true,
    component: All
  },
  {
    path: '/active',
    component: Active
  },
  {
    path: '/completed',
    component: Completed
  },
]