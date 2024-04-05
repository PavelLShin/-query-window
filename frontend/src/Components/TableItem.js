import { dataReBuild } from '../UI/dataReBuild'
import styles from './TableItem.module.css'
import { selectAuthorFilter, selectDatafilter } from '../State/filterSlice'
import { useDispatch, useSelector } from 'react-redux'

import { addItem } from '../State/itemSlice'

function TableItem({
  number,
  type,
  description,
  user,
  data,
  stat,
  setVisibleInfo,
}) {
  const dispatch = useDispatch()
  const authorFilter = useSelector(selectAuthorFilter)
  const dataFilter = useSelector(selectDatafilter)

  let reBuildData = dataReBuild(new Date(data))

  const highlightMatch = (text, filter) => {
    if (!filter) return text

    const regex = new RegExp(`(${filter})`, `gi`)

    return text.split(regex).map((substring, index) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={index} className={styles.txt_highlight}>
            {substring}
          </span>
        )
      }
      return substring
    })
  }

  const handleAddNumberItem = () => {
    dispatch(addItem(number))
    setVisibleInfo(true)
  }
  return (
    <div className={styles.table_items} onDoubleClick={handleAddNumberItem}>
      <div
        className={`${styles.table_items__number} ${styles.table_items__container}`}
      >
        <h2>{number}</h2>
      </div>
      <div
        className={`${styles.table_items__type_container} ${styles.table_items__container}`}
      >
        <div className={styles.table_items__type}>
          <h2
            style={{
              backgroundColor: `${
                type === 'Ошибка'
                  ? '#fd1e007c'
                  : type === 'Новая функциональность'
                  ? '#59c6a589'
                  : type === 'Улучшение'
                  ? '#3973ae89'
                  : '#aea64283'
              }`,
              color: `${
                type === 'Ошибка'
                  ? '#620b00'
                  : type === 'Новая функциональность'
                  ? '#418c75'
                  : type === 'Улучшение'
                  ? '#004488'
                  : '#7d7831'
              }`,
            }}
          >
            {type}
          </h2>
        </div>
      </div>
      <div className={`${styles.table_items__container}`}>
        <div className={`${styles.table_items__description}`}>
          {description}
        </div>
      </div>
      <div
        className={`${styles.table_items__usersData} ${styles.table_items__container}`}
      >
        {highlightMatch(user, authorFilter)}
      </div>
      <div
        className={`${styles.table_items__usersData} ${styles.table_items__container}`}
      >
        {highlightMatch(reBuildData, dataFilter)}
      </div>
      <div className={`${styles.table_items__container}`}>
        <div className={`${styles.table_items__status_work}`}>
          <h2
            style={{
              backgroundColor: `${
                type === 'В работе'
                  ? '#b3dafa89'
                  : type === 'В очереди'
                  ? '#dfca628f'
                  : '#59c6a582'
              }`,
              color: `${
                type === 'В работе'
                  ? '#0079C2'
                  : type === 'В очереди'
                  ? '#a9994c'
                  : '#45987f'
              }`,
            }}
          >
            {stat}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default TableItem
