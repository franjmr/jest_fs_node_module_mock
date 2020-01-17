import JSONFileUtil from "../__src__/jsonFileUtil";
import * as fs from 'fs';

describe("JSONFileUtils Sync suite", () => {

    let jsonFileUtil : JSONFileUtil;

    beforeEach(()=>{
        jsonFileUtil = new JSONFileUtil();
    });

    test("Should load a json object sync with readFileSync()", () => {
        const jsonData = '{"characters":[{"name":"Jin Kazama","game":"Tekken 3"},{"name":"Paul Phoenix","game":"(Tekken"}]}';
        const mockReadFileSync = jest.spyOn(fs, 'readFileSync'); 
        mockReadFileSync.mockImplementation(() => jsonData);

        const relativePath = "./assets/data/builder";
        const jsonFileName = "resourcesStdGlobal.json";
        const jsonObjectFromFile = jsonFileUtil.fromFileToObjectSync(relativePath,jsonFileName);

        expect(mockReadFileSync).toBeCalled();
        expect(jsonObjectFromFile).toMatchObject(JSON.parse(jsonData));
    });

    test('Should save a json object sync with writeFileSync() in an existing folder', () => {
        const jsonData = '{"characters":[{"name":"Jin Kazama","game":"Tekken 3"},{"name":"Paul Phoenix","game":"(Tekken"}]}';
        const mockExistsSync = jest.spyOn(fs, 'existsSync'); 
        const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync'); 
        const mockMkdirSync = jest.spyOn(fs, 'mkdirSync'); 
        mockExistsSync.mockImplementation(() => true);
        mockWriteFileSync.mockImplementation(() => true);

        const jsonObject = JSON.parse(jsonData);
        const relativePath = './assets/data/builder'
        const jsonFileName = 'test_writeFileSync.json'
        jsonFileUtil.fromObjectToFileSync(jsonObject, relativePath, jsonFileName);

        expect(mockExistsSync).toBeCalledWith(relativePath);
        expect(mockMkdirSync).not.toBeCalled();
        expect(mockWriteFileSync).toBeCalledWith(relativePath + '/' + jsonFileName, jsonData);
    });

    test('Should save a json object sync with writeFileSync() in an non-existing folder', () => {
        const jsonData = '{"characters":[{"name":"Jin Kazama","game":"Tekken 3"},{"name":"Paul Phoenix","game":"(Tekken"}]}';
        const mockExistsSync = jest.spyOn(fs, 'existsSync'); 
        const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync'); 
        const mockMkdirSync = jest.spyOn(fs, 'mkdirSync'); 
        mockExistsSync.mockImplementation(() => false);
        mockWriteFileSync.mockImplementation(() => true);
        mockMkdirSync.mockImplementation(() => true);
    
        const jsonObject = JSON.parse(jsonData);
        const relativePath = './assets/data/builder'
        const jsonFileName = 'test_writeFileSync.json'
        jsonFileUtil.fromObjectToFileSync(jsonObject, relativePath, jsonFileName);
    
        expect(mockExistsSync).toBeCalledWith(relativePath);
        expect(mockMkdirSync).toBeCalledWith(relativePath);
        expect(mockWriteFileSync).toBeCalledWith(relativePath + '/' + jsonFileName, jsonData);
    });
});

describe("JSONFileUtils Async suite", () => {

    let jsonFileUtil : JSONFileUtil;

    beforeEach(()=>{
        jsonFileUtil = new JSONFileUtil();
    });

    test("Should load a json object async with readFile() with async/await", async() => {
        const jsonData = '{"characters":[{"name":"Jin Kazama","game":"Tekken 3"},{"name":"Paul Phoenix","game":"(Tekken"}]}';
        const jsonObject = JSON.parse(jsonData);
        const spyReadFile = jest.spyOn(fs, 'readFile'); 
        const mockReadFile = jest.fn().mockImplementation((file, option, cb) => cb(null, jsonData)); 
        spyReadFile.mockImplementation(mockReadFile);

        const relativePath = "./assets/data/builder";
        const jsonFileName = "resourcesStdGlobal.json";
        const data = await jsonFileUtil.fromFileToObjectAsync(relativePath,jsonFileName);

        expect(data).toEqual(jsonObject);

    });

    test("Should load a json object async with readFile() with done callback", (done) => {
        const jsonData = '{"characters":[{"name":"Jin Kazama","game":"Tekken 3"},{"name":"Paul Phoenix","game":"(Tekken"}]}';
        const jsonObject = JSON.parse(jsonData);
        const spyReadFile = jest.spyOn(fs, 'readFile'); 
        const mockReadFile = jest.fn().mockImplementation((file, option, cb) => cb(null, jsonData)); 
        spyReadFile.mockImplementation(mockReadFile);

        const relativePath = "./assets/data/builder";
        const jsonFileName = "resourcesStdGlobal.json";

        jsonFileUtil.fromFileToObjectAsync(relativePath,jsonFileName).then(data =>{
            expect(data).toEqual(jsonObject);
            done();
        });
    });

    test("Should throw an error in readFile()", (done) => {
        const spyReadFile = jest.spyOn(fs, 'readFile'); 
        const mockReadFile = jest.fn().mockImplementation((file, option, cb) => cb('Error!', null)); 
        spyReadFile.mockImplementation(mockReadFile);

        const relativePath = "./assets/data/builder";
        const jsonFileName = "resourcesStdGlobal.json";

        jsonFileUtil.fromFileToObjectAsync(relativePath,jsonFileName).catch(error => {
            expect(error).toEqual('Error!');
            done();
        });
    });
});