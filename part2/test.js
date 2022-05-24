const fs = require('fs')
// import * as fs from 'fs'
let file = fs.readFileSync('text.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((line) => line.split(','))
    .reduce((line)=> {
        console.log('hello', line)
        return line
    }, {})
console.log(file);