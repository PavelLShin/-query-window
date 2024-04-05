import React from 'react'
import styles from './InfoPage.module.css'
import { selectItem } from '../State/itemSlice'
import { useSelector } from 'react-redux'
import { dataReBuild } from '../UI/dataReBuild'
import Button from '../UI/Button'

function InfoPage({ setVisibleInfo, data }) {
  const item = useSelector(selectItem)

  const dataItem = data.filter((el) => el.number === item)[0]
  let reBuildData = dataReBuild(new Date(dataItem.data))

  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <div className={styles.content__name}>
          <h3>Пользователь:</h3>
          <h2>{`${dataItem.userName}`}</h2>
        </div>
        <div className={styles.content__type_container}>
          <h3>Тип запроса</h3>
          <div
            className={styles.content__type}
            style={{
              backgroundColor: `${
                dataItem.typeRequest === 'Ошибка'
                  ? '#fd1e007c'
                  : dataItem.typeRequest === 'Новая функциональность'
                  ? '#59c6a589'
                  : dataItem.typeRequest === 'Улучшение'
                  ? '#3973ae89'
                  : '#aea64283'
              }`,
            }}
          >
            <h2
              style={{
                color: `${
                  dataItem.typeRequest === 'Ошибка'
                    ? '#620b00'
                    : dataItem.typeRequest === 'Новая функциональность'
                    ? '#418c75'
                    : dataItem.typeRequest === 'Улучшение'
                    ? '#004488'
                    : '#7d7831'
                }`,
              }}
            >{`${dataItem.typeRequest}`}</h2>
          </div>
        </div>
        <div className={styles.content__description_container}>
          <h3>Описание</h3>
          <div
            className={styles.content__description}
          >{`${dataItem.description}`}</div>
        </div>
        <div className={styles.content__footer_container}>
          <div className={styles.footer_container__dataStatus}>
            <div>
              <h3>Статус</h3>
              <div
                className={styles.footer_container__status}
                style={{
                  backgroundColor: `${
                    dataItem.status === 'В работе'
                      ? '#b3dafa89'
                      : dataItem.status === 'В очереди'
                      ? '#dfca628f'
                      : '#59c6a582'
                  }`,
                }}
              >
                <h2
                  style={{
                    color: `${
                      dataItem.status === 'В работе'
                        ? '#0079C2'
                        : dataItem.status === 'В очереди'
                        ? '#a9994c'
                        : '#45987f'
                    }`,
                  }}
                >
                  {`${dataItem.status}`}
                </h2>
              </div>
            </div>
            <div className={styles.footer_container__data}>
              <h3>Дата обращения:</h3>
              <h2>{`${reBuildData}`}</h2>
            </div>
          </div>
        </div>
        <span onClick={() => setVisibleInfo(false)}>
          <Button text={`Закрыть`} width={109} height={40} />
        </span>
      </div>
    </div>
  )
}

export default InfoPage
