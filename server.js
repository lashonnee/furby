const http = require('http')
const fluffaction = require('./fluffaction')

const PORT = 3872

module.exports = (callback) => {
  http.createServer((req, res) => {
    let fragments = req.url.substring(1).split('/')
    let query = fragments.splice(0, 2)
    query.push(fragments.join('/'))

    if (query[0] === 'notification') {
      res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'})
    
      if (req.method === 'POST') {
        let body = ''
        req.on('data', function(data) { body += data })
        req.on('end', function() {
          try {
            let json = JSON.parse(body)
            callback(json)
            res.end("ok")
          } catch(e) {
            console.log('[Warning] Could not parse notification: ' + e)
            res.end('error: ' + e)
          }
        })
      } else {
        res.end()
      }
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'})
      res.end()
    }
  }).listen(PORT)
}