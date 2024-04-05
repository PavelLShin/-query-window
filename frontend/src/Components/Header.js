import Button from '../UI/Button'
import Prev from '../img/Prev.svg'
import Next from '../img/Next.svg'
import styles from './Header.module.css'
import { useState } from 'react'
import Filter from './Filter'

function Header({ setVisibleModal, start, end, setStart, setEnd, data }) {
  const pagesQuantity = data.length > 0 ? Math.ceil(data.length / 12) : 1
  const [pageCurrent, setPageCurrent] = useState(1)
  const [openFilters, setOpenFilters] = useState(false)

  const nextPage = () => {
    if (data.length > start + 12) {
      setStart(start + 12)
      setEnd(end + 12)
      setPageCurrent(pageCurrent + 1)
    } else {
      setStart(start)
      setEnd(end)
    }
  }

  const prevPage = () => {
    if (start - 12 >= 0) {
      setStart(start - 12)
      setEnd(end - 12)
      setPageCurrent(pageCurrent - 1)
    } else {
      setStart(start)
      setEnd(end)
    }
  }

  return (
    <header className={styles.header}>
      {openFilters ? (
        <Filter setOpenFilters={setOpenFilters} />
      ) : (
        <span onClick={() => setOpenFilters(!openFilters)}>
          <Button text={'Фильтр'} width={128} height={38} />
        </span>
      )}

      <div className={styles.header_info}>
        <div onClick={() => setVisibleModal(true)}>
          <Button text={'Новый запрос'} width={128} height={38} />
        </div>
        <div className={styles.header_info__listCount}>
          <h2>{`${pageCurrent} из ${pagesQuantity}`}</h2>
        </div>
        <div className={styles.header_info__prevNext}>
          <div
            onClick={prevPage}
            className={styles.header_info__prevNext_container}
          >
            <img src={Prev} alt="prev" width={`8.27px`} height={`13.53px`} />
          </div>
          <div
            onClick={nextPage}
            className={styles.header_info__prevNext_container}
          >
            <img src={Next} alt="next" width={`8.27px`} height={`13.53px`} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
