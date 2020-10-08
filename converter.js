// const data = require('./test.json')
const data = require('./data.json')
var prettyjson = require('prettyjson');
const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    sourceFile: 'excel.xlsx'
});

const [ structure, description, ...rawData ] = result.Struktur


let level1 // base , kind of Stufe A
let level2 // Stufe B
let level3 // Stufe C
let level4 // Stufe D
let lastBaseLevel

const final = rawData.reduce((acc, item, index) => {
    const keyOfItem = Object.keys(item)[0]
    const value = item[keyOfItem]
    let length
    if (index === 0) {
        acc.current = acc.result
    }
    if (value === 'Glas') {
        const jo = ''
    }
    if (acc.current.length !== undefined) {
        length = acc.current.push({
            level: keyOfItem,
            name: structure[keyOfItem],
            value: item[keyOfItem],
            items: []
        })
        level1 = acc.current

    } else {
        length = acc.current.items.push({
            level: keyOfItem,
            name: structure[keyOfItem],
            value: item[keyOfItem],
            items: []
        })
        lastBaseLevel = acc.current
        // ugly
        if (acc.current.level === 'B') {
            level2 = acc.current
        }
        if (acc.current.level === 'C') {
            level3 = acc.current
        }
        if (acc.current.level === 'D') {
            level4 = acc.current
        }
    }
    const nextOne = rawData[index + 1]
    if (nextOne) {
        const keyOfNextOne = Object.keys(nextOne)[0]
        const indexOfCurrent = Object.keys(structure).findIndex(s => s === keyOfItem)
        const indexOfNextOne = Object.keys(structure).findIndex(s => s === keyOfNextOne)
        if (indexOfNextOne > indexOfCurrent) {
            acc.current = index === 0 || indexOfCurrent === 0 ? acc.current[length -1] : acc.current.items[length - 1]
        }
        if (indexOfNextOne === indexOfCurrent) {
            acc.current = lastBaseLevel
        }
        if (indexOfNextOne < indexOfCurrent) {
            // ugly
            if (indexOfNextOne === 0) {
                acc.current = level1
            }
            if (indexOfNextOne === 1) {
                acc.current = level2
            }
            if (indexOfNextOne === 2) {
                acc.current = level3
            }
            if (indexOfNextOne === 3) {
                acc.current = level4
            }
        }

    }
    return acc;
}, { result: [], current: null })

console.log(prettyjson.render(final.result))
