const fs = require('fs')

class DataController {
  // создать
  async createData(req, res) {
    try {
      const dataPost = req.body

      const data = fs.readFileSync('./01.json', { encoding: 'utf8' })
      let dataObj = JSON.parse(data)

      dataObj.push(dataPost)

      fs.appendFileSync('./01.json', JSON.stringify(dataObj), {
        encoding: 'utf8',
        flag: 'w',
      })

      res.json(dataPost)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Возникла ошибка' })
    }
  }

  //   показать всех
  async getData(req, res) {
    try {
      const data = fs.readFileSync('./01.json', { encoding: 'utf8' })
      let dataObj = JSON.parse(data)
      res.json(dataObj)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Возникла ошибка' })
    }
  }
}
module.exports = new DataController()
