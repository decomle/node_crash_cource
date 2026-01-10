const fs = require('fs');

// READ FILE
// fs.readFile('./docs/test.txt', (err, data) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(data.toString())
// });

// WRITE FILE
// fs.writeFile('./docs/test2.txt', 'Hello, world', () => {
//     console.log('Done writing to file')
// })

// DIRECTORIES
if(!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        err && console.log(err);
        console.log('created directory')
    })
} else {
    fs.rmdir('./assets', (err)=> {
        err && console.log(err);
        console.log('deleted directory')
    })
}