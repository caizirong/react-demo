import React from 'react'
import FilterLink from './FilterLink'
const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter='all'>
      All
    </FilterLink>
    {' '}
    <FilterLink filter='active'>
      Active
    </FilterLink>
    {' '}
    <FilterLink filter='completed'>
      Completed
    </FilterLink>
  </p>
)
export default Footer

/* 
<FilterLink filter='all'>
  All
</FilterLink>  

等同于

<FilterLink filter='all' children='All'>
</FilterLink>  
*/
  