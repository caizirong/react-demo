import React from 'react'
export const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>  // 区分选中链接样式
  }
  return (
    <a href=''
      onClick={e => {
        e.preventDefault();
        onClick();
        {/* console.log("***** now visibilityFilter return the next state *****", store.getState().visibilityFilter) */ }
      }}
    >
      {children}
    </a>
  )
}
export default Link