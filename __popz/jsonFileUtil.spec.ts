import JSONFileUtil from './jsonFileUtil'

// it would be better to work with a mock of the file system.
// jest.mock('fs')

describe('jsonfileutil', () => {
  
  test('1.1 load a json object sync with readFileSync()', () => {

    let relativePath = './assets/data/builder'
    let jsonFileName = 'resourcesStdGlobal.json'
    
    let jsonFileUtil = new JSONFileUtil()
    let jsonObject = jsonFileUtil.fromFileToObjectSync(relativePath, jsonFileName)

    // console.log("1.1. readFileSync " + JSON.stringify(jsonObject))
    expect(jsonObject != undefined)
  })

  test('1.2 save a json object sync with writeFileSync()', () => {

    let relativePath = './assets/data/builder'
    let jsonFileName = 'test_writeFileSync.json'

    var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
    var jsonObject = JSON.parse(jsonData)
    
    let jsonFileUtil = new JSONFileUtil()
    jsonFileUtil.fromObjectToFileSync(jsonObject, relativePath, jsonFileName)
    
    let jsonObjectCopy = jsonFileUtil.fromFileToObjectSync(relativePath, jsonFileName)

    // console.log("1.2. writeFileSync " + JSON.stringify(jsonObjectCopy))
    expect(jsonObjectCopy != undefined)
  })


   
  test('2.1 load a json object async with readFile() async', async () => {

    let relativePath = './assets/data/builder'
    let jsonFileName = 'resourcesStdGlobal.json'
    
    let jsonFileUtil = new JSONFileUtil()
    let jsonObject = await jsonFileUtil.fromFileToObjectAsync(relativePath, jsonFileName)

    // console.log("2.1. readFileAsync " + JSON.stringify(jsonObject))
    expect(jsonObject != undefined)

  })

  test('2.2 save a json object async with writeFile() async', async () => {


    let relativePath = './assets/data/builder'
    let jsonFileName = 'test_writeFileAsync.json'

    var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
    var jsonObject = JSON.parse(jsonData)
   
    let jsonFileUtil = new JSONFileUtil()

    await jsonFileUtil.fromObjectToFileAsync(jsonObject, relativePath, jsonFileName)

    let jsonObjectCopy = jsonFileUtil.fromFileToObjectSync(relativePath, jsonFileName)

    // console.log("2.2. writeFileAsync " + JSON.stringify(jsonObjectCopy))
    expect(jsonObjectCopy != undefined)

  })

})