import styles from './Modal.module.css'
import Vector from '../img/Vector.svg'
import { useEffect, useState } from 'react'
import Button from '../UI/Button'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { fetchData } from '../State/dataSlice'
import { useSelector } from 'react-redux'
import { selectData } from '../State/dataSlice'

function Modal({ setVisibleModal }) {
  // const [drag, setDrag] = useState(false)

  // function dragStartHeandler(event) {
  //   event.preventDefault()
  //   setDrag(true)
  // }

  // function dragLeaveHeandler(event) {
  //   event.preventDefault()
  //   setDrag(false)
  // }

  // function onDropHeandler(event) {
  //   event.preventDefault()
  //   const files = event.dataTransfer.files[0]
  //   const formData = new FormData()
  //   formData.append('file', files)
  //   axios
  //     .post('http://localhost:5000/api/img', formData)
  //     .then(function (response) {
  //       console.log(response.data)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })

  //   console.log(files)
  //   setDrag(false)
  // }
  // const [data, setData] = useState(null)
  // const handleChange = async (event) => {
  //   event.preventDefault()
  //   setData(event.target.files[0])
  // }

  // const handleUpload = async (data) => {
  //   console.log(data)
  //   const formData = new FormData()
  //   formData.append('file', data)
  //   await axios
  //     .post('http://localhost:5000/api/img', {
  //       formData,
  //     })
  //     .then(function (response) {
  //       console.log(response)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  const [visibleList, setVisibleList] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [descTextarea, setDescTextarea] = useState('')
  const [typeRequest, setTypeRequest] = useState('Ошибка')
  const [nameDirty, setNameDirty] = useState(false)
  const [descDirty, setDescDirty] = useState(false)
  const [nameError, setNameError] = useState('Поле не может быть пустым')
  const [descError, setDescError] = useState('Поле не может быть пустым')

  const [formValid, setFormValid] = useState(false)

  const dataState = useSelector(selectData)
  useEffect(() => {
    dispatch(fetchData('http://localhost:5000/api/data'))
  }, [dataState])
  const dispatch = useDispatch()

  useEffect(() => {
    if (nameError || descError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, descError])

  const blurHeandler = (event) => {
    switch (event.target.name) {
      case 'name':
        setNameDirty(true)
        break
      case 'description':
        setDescDirty(true)
        break
    }
  }

  const nameHandler = (event) => {
    setNameInput(event.target.value)
    if (!event.target.value) {
      setNameError('Поле не может быть пустым')
    } else setNameError('')
  }

  const descHandler = (event) => {
    setDescTextarea(event.target.value)
    if (!event.target.value) {
      setDescError('Поле не может быть пустым')
    } else setDescError('')
  }

  const hadleSubmit = async (event) => {
    event.preventDefault()
    await axios
      .post('http://localhost:5000/api/data', {
        number: dataState.length + 1,
        typeRequest: typeRequest,
        description: descTextarea,
        userName: nameInput,
        data: new Date(),
        status: 'в работе',
      })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    setTypeRequest('')
    setDescTextarea(descTextarea)
    setNameInput('')
    setVisibleModal(false)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={hadleSubmit}>
        <div className={styles.form_item}>
          <h2>Автор обращения</h2>
          <input
            onBlur={(event) => blurHeandler(event)}
            name="name"
            type="text"
            placeholder="Имя Фамилия"
            value={nameInput}
            onChange={(event) => nameHandler(event)}
            className={styles.form_item__element}
          />
          {nameDirty && nameError && (
            <div style={{ color: 'red' }}>{nameError}</div>
          )}
        </div>
        <div
          className={styles.form_item__type}
          onClick={() => setVisibleList(!visibleList)}
        >
          <div className={styles.form_item}>
            <h2>Тип запроса</h2>
            <div
              className={`${styles.form_item__element} ${styles.form_item__type_element}`}
            >
              <span>{typeRequest}</span>
              <img
                src={Vector}
                alt="Vector"
                width={`13px`}
                height={`8px`}
                className={
                  visibleList ? styles.type_btn__rotate : styles.type_btn
                }
              />
            </div>
          </div>
          {visibleList && (
            <div className={styles.form_item__type_open}>
              <div
                className={styles.type_open__item}
                onClick={() => setTypeRequest(`Ошибка`)}
              >
                Ошибка
              </div>
              <div
                className={styles.type_open__item}
                onClick={() => setTypeRequest(`Новая функциональность`)}
              >
                Новая функциональность
              </div>
              <div
                className={styles.type_open__item}
                onClick={() => setTypeRequest(`Улучшение`)}
              >
                Улучшение
              </div>
              <div
                className={styles.type_open__item}
                onClick={() => setTypeRequest(`Документация`)}
              >
                Документация
              </div>
            </div>
          )}
        </div>
        <div className={styles.form_item__description}>
          <h2>Добавить описание</h2>
          <textarea
            onChange={(event) => descHandler(event)}
            value={descTextarea}
            placeholder="Введите описание запроса"
            name="description"
            onBlur={(event) => blurHeandler(event)}
          />
          {descDirty && descError && (
            <div style={{ color: 'red' }}>{descError}</div>
          )}
        </div>
        <div className={styles.form_item__btn_container}>
          <span>
            <Button
              disabled={!formValid}
              text={`Сохранить`}
              width={123}
              height={40}
              type={`submit`}
            />
          </span>
          <span onClick={() => setVisibleModal(false)}>
            <Button text={`Закрыть`} width={109} height={40} />
          </span>
        </div>
      </form>
    </div>
  )
}

export default Modal
