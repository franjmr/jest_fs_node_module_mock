/**
 * JSONFileUtil.ts
 */

import * as fs from 'fs'

export default class JSONFileUtil {
  /**
   * fromFileToObjectSync
   * JSON.parse to convert JSON into an object.
   * @param relativePath
   * @param jsonFileName
   */
  fromFileToObjectSync<T>(relativePath: string, jsonFileName: string) {
    const fileContents = fs.readFileSync(relativePath + '/' + jsonFileName, 'utf-8')
    const resultObject = JSON.parse(fileContents)
    return resultObject
  }

  /**
   * fromObjectToFileSync
   * @param jsonObject
   * @param relativePath
   * @param jsonFileName
   */
  fromObjectToFileSync<T>(jsonObject: any, relativePath: string, jsonFileName: string) {
    const jsonContent = JSON.stringify(jsonObject)
    if (!fs.existsSync(relativePath)) {
      fs.mkdirSync(relativePath)
    }
    fs.writeFileSync(relativePath + '/' + jsonFileName, jsonContent)
  }

  /**
  * fromFileToObjectAsync - ASYNC with callbacks
  * JSON.parse to convert JSON into an object.
  * @param relativePath
  * @param jsonFileName
  */
  fromFileToObjectAsync<T>(relativePath: string, jsonFileName: string): Promise<any> {
    return new Promise<any>((resolve) => {
      fs.readFile(relativePath + '/' + jsonFileName, 'utf-8', (err, fileContents) => {
        if (err) {
          throw err
        }
        resolve(JSON.parse(fileContents))
      })
    })
  }

  /**
  * fromObjectToFileAsync - ASYNC with promises
  * @param jsonObject
  * @param relativePath
  * @param jsonFileName
  */
  fromObjectToFileAsync<T>(jsonObject: any, relativePath: string, jsonFileName: string): Promise<any> {
    const jsonContent = JSON.stringify(jsonObject)
    if (!fs.existsSync(relativePath)) {
      fs.mkdirSync(relativePath)
    }
    return new Promise<any>((resolve) => {
      fs.writeFile(relativePath + '/' + jsonFileName, jsonContent, (err) => {
        if (err) {
          throw err
        }
        resolve()
      })
    })
  }
}
