var fs = require('fs')
var Q = require('q')
var readStdin = require('./readStdin')

function readInput(path) {
  if (!path || path === "" || path === "-") {
    return readStdin().then(JSON.parse)
  }
  var deferred = Q.defer();
  deferred.resolve(JSON.parse(fs.readFileSync(path, 'utf8')))
  return deferred.promise
}

module.exports = readInput
