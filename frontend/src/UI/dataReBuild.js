export const dataReBuild = (data) => {
  // приводим данные к читаемой дате
  const dateSrc = data.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })

  let dateDst = dateSrc.split('.').join('.')
  return dateDst
}
