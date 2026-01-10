const fs = require('fs');

const readStream = fs.createReadStream('./docs/streams.txt', {encoding : 'utf-8'});
const writeStream = fs.createWriteStream('./docs/streams2.txt');

// readStream.on('data', (chunk) => {
//     console.log('---- new chunk ----');
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// })


// Piping

readStream.pipe(writeStream)