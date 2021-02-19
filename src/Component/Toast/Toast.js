import React from 'react'
import { map } from 'ramda'
import './Toast.css'

// Toast :: Props -> React.Component
export default ({
  remove,
  toasts,
}) =>
  <div className="toasts">
    {map(toast =>
      <span
        className={ `toast notification is-${toast.level}` }
        key={ `toast-${toast.id}` }
        id={ `toast-${toast.id}` }
      >
        <button className="delete" onClick={ () => remove(toast.id) }></button>
        {toast.message}
      </span>,
    )(toasts)}
  </div>
