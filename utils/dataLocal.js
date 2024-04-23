import fs from 'fs'

const dataDir = './data'

export const saveDataToFile = (fileName, data) => {
  const filePath = `${dataDir}/${fileName}.json`
  const jsonData = JSON.stringify(data)

  fs.writeFileSync(filePath, jsonData)
}

export const getDataFromFile = (fileName) => {
  const filePath = `${dataDir}/${fileName}.json`

  if (!fs.existsSync(filePath)) {
    return null
  }

  const jsonData = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(jsonData)
}
