import styles from './Table.module.css'
import TableItem from './TableItem'
import { useDispatch } from 'react-redux'
import { fetchData } from '../State/dataSlice'
import { useEffect } from 'react'

function Table({ start, end, dataInfo, setVisibleInfo }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData('http://localhost:5000/api/data'))
  }, [dispatch])

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.table_header__items}>
          <h2>Номер запроса</h2>
        </div>
        <div className={styles.table_header__items}>
          <h2>Тип запроса</h2>
        </div>
        <div className={styles.table_header__items}>
          <h2>Описание</h2>
        </div>
        <div className={styles.table_header__items}>
          <h2>Пользователь</h2>
        </div>
        <div className={styles.table_header__items}>
          <h2>Дата</h2>
        </div>
        <div className={styles.table_header__items}>
          <h2>Статус</h2>
        </div>
      </header>
      {dataInfo
        .slice(
          start >= 0 ? start : 0,
          end > dataInfo.length ? dataInfo.length : end
        )
        .map((el, id) => {
          return (
            <TableItem
              setVisibleInfo={setVisibleInfo}
              key={id}
              number={el.number}
              type={el.typeRequest}
              description={el.description}
              user={el.userName}
              data={el.data}
              stat={el.status}
            />
          )
        })}
    </div>
  )
}

export default Table
