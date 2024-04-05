import styles from './MainPage.module.css'
import Header from './Header'
import Table from './Table'
import Modal from './Modal'
import InfoPage from './InfoPage'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectData } from '../State/dataSlice'
import {
  selectAuthorFilter,
  selectDatafilter,
  selectStatusFilter,
  selectTypeFilter,
} from '../State/filterSlice'
import { dataReBuild } from '../UI/dataReBuild'

function MainPage() {
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleInfo, setVisibleInfo] = useState(false)

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(12)

  const dataInfo = useSelector(selectData)
  const dataFilter = useSelector(selectDatafilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const typeFilter = useSelector(selectTypeFilter)
  const statusFilter = useSelector(selectStatusFilter)

  const filteredInfo = dataInfo.filter((dataInfo) => {
    const matchesData = dataReBuild(new Date(dataInfo.data))
      .toLowerCase()
      .includes(dataFilter.toLowerCase())
    const matchesAuthor = dataInfo.userName
      .toLowerCase()
      .includes(authorFilter.toLowerCase())
    const matchesType = dataInfo.typeRequest
      .toLowerCase()
      .includes(typeFilter.toLowerCase())

    const matchesStatus = dataInfo.status
      .toLowerCase()
      .includes(statusFilter.toLowerCase())

    return matchesData && matchesAuthor && matchesType && matchesStatus
  })

  return (
    <>
      <div
        className={
          visibleModal || visibleInfo ? styles.container_none : styles.container
        }
      >
        <Header
          setVisibleModal={setVisibleModal}
          setStart={setStart}
          setEnd={setEnd}
          start={start}
          end={end}
          data={filteredInfo}
        />
        <Table
          start={start}
          end={end}
          dataInfo={filteredInfo}
          setVisibleInfo={setVisibleInfo}
        />
      </div>
      {visibleModal ? <Modal setVisibleModal={setVisibleModal} /> : false}
      {visibleInfo ? (
        <InfoPage setVisibleInfo={setVisibleInfo} data={filteredInfo} />
      ) : (
        false
      )}
    </>
  )
}

export default MainPage
