const fs = require('fs')

const content = '<html><body>Hello World' + (new Date()) + '</body></html>'

fs.writeFile('build/index.html', content, err => {
    if (err) {
        console.error(err)
        return
    }
    //file written successfully
})