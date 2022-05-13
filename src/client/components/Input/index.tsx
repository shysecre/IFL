import classNames from 'classnames'
import React from 'react'
import { InputProps } from './index.props'
import styles from './index.module.css'

export const Input = ({
  placeholder = '',
  value = '',
  onChange,
  className,
  ...props
}: InputProps): JSX.Element => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classNames(styles.input, className)}
      {...props}
    />
  )
}
