/* eslint-disable no-return-assign */
/* eslint-disable react/require-default-props */
import { Link } from 'react-router-dom'
import { FC } from 'react'
import { format } from 'date-fns'
import classNames from 'classnames'

import avatar from '../../assets/img/default-avatar.png'

import styles from './User.module.scss'

type UserProps = {
  username: string
  image?: string
  createdAt?: string
}

const User: FC<UserProps> = ({ username, image, createdAt }) => {
  const convertDate = createdAt && format(new Date(createdAt), ' MMMM d, yyyy')
  const containerClasses = classNames({
    [styles.user]: true,
    [styles.user__header]: !createdAt,
  })

  const newImage =
    image === 'https://static.productionready.io/images/smiley-cyrus.jpg' ? avatar : image

  return (
    <div className={containerClasses}>
      <div className={styles.user__info}>
        <span className={styles.user__name}>
          {createdAt ? username : <Link to="profile">{username}</Link>}
        </span>
        {createdAt && <span className={styles.user__date}>{convertDate}</span>}
      </div>
      {createdAt ? (
        <img
          className={styles.user__avatar}
          src={newImage || avatar}
          alt="avatar"
          onError={(e) => (e.currentTarget.src = avatar)}
        />
      ) : (
        <Link to="profile">
          <img className={styles.user__avatar} src={image || avatar} alt="avatar" />
        </Link>
      )}
    </div>
  )
}

export default User
