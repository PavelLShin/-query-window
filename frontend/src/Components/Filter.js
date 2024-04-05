import styles from './Filter.module.css'
import { GrClose } from 'react-icons/gr'
import {
  resetFilters,
  selectAuthorFilter,
  selectDatafilter,
  selectStatusFilter,
  selectTypeFilter,
  setAuthorFilter,
  setDataFilter,
  setStatusFilter,
  setTypeFilter,
} from '../State/filterSlice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../UI/Button'

function Filter({ setOpenFilters }) {
  const typeFilter = useSelector(selectTypeFilter)
  const statusFilter = useSelector(selectStatusFilter)
  const dataFilter = useSelector(selectDatafilter)
  const authorFilter = useSelector(selectAuthorFilter)

  const dispatch = useDispatch()

  const handleDataFilter = (event) => {
    dispatch(setDataFilter(event.target.value))
  }

  const handleAuthorFilter = (event) => {
    dispatch(setAuthorFilter(event.target.value))
  }

  const handleTypeFilter = (event) => {
    dispatch(setTypeFilter(event.target.value))
  }

  const handleStatusFilter = (event) => {
    dispatch(setStatusFilter(event.target.value))
  }

  const handleResetFilters = () => {
    return dispatch(resetFilters())
  }

  const handleCloseFilters = () => {
    dispatch(resetFilters())

    setOpenFilters(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.close_filters} onClick={handleCloseFilters}>
        <GrClose width={`52px`} height={`52px`} />
      </div>
      <div className={styles.author_filter__container}>
        <input
          type="text"
          placeholder="Фильтр по автору"
          value={authorFilter}
          onChange={handleAuthorFilter}
        />
      </div>
      <div className={styles.author_filter__container}>
        <input
          type="text"
          placeholder="Фильтр по дате"
          value={dataFilter}
          onChange={handleDataFilter}
        />
      </div>
      <div className={styles.type_filter__container}>
        <div className={styles.type_filter__content_container}>
          <label>
            <input
              type="radio"
              value={'Ошибка'}
              checked={typeFilter === 'Ошибка' ? true : false}
              onChange={handleTypeFilter}
            />
            Ошибка
          </label>
          <label>
            <input
              type="radio"
              value={'Новая функциональность'}
              checked={typeFilter === 'Новая функциональность' ? true : false}
              onChange={handleTypeFilter}
            />
            Новая функциональность
          </label>
        </div>
        <div className={styles.type_filter__content_container}>
          <label>
            <input
              type="radio"
              value={'Улучшение'}
              checked={typeFilter === 'Улучшение' ? true : false}
              onChange={handleTypeFilter}
            />
            Улучшение
          </label>
          <label>
            <input
              type="radio"
              value={'Документация'}
              checked={typeFilter === 'Документация' ? true : false}
              onChange={handleTypeFilter}
            />
            Документация
          </label>
        </div>
      </div>
      <div className={styles.status_filter__container}>
        <div className={styles.status_filter__content_container}>
          <label>
            <input
              type="radio"
              value={'Выполнено'}
              checked={statusFilter === 'Выполнено' ? true : false}
              onChange={handleStatusFilter}
            />
            Выполнено
          </label>
          <label>
            <input
              type="radio"
              value={'В очереди'}
              checked={statusFilter === 'В очереди' ? true : false}
              onChange={handleStatusFilter}
            />
            В очереди
          </label>
          <label>
            <input
              type="radio"
              value={'В работе'}
              checked={statusFilter === 'В работе' ? true : false}
              onChange={handleStatusFilter}
            />
            В работе
          </label>
        </div>
      </div>
      <span onClick={handleResetFilters}>
        <Button text={'Сбросить'} width={150} height={38} />
      </span>
    </div>
  )
}

export default Filter
