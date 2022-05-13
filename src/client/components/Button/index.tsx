import classNames from 'classnames'
import React from 'react'
import { ButtonProps } from './index.props'
import styles from './index.module.css'

export const Button = ({
  Icon,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={classNames(styles.button, className)} {...props}>
      {Icon && <Icon className={classNames(styles.icon)} />}
      {children}
    </button>
  )
}
