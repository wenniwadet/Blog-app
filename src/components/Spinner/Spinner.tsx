import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import styles from './Spinner.module.scss'

const Spinner: React.FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />

  return <Spin className={styles.spinner} indicator={antIcon} />
}

export default Spinner
