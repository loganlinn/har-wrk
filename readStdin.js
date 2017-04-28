var Q = require('q');

function readStdin() {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  var buffer = '';
  process.stdin.on('data', function(chunk) {
    buffer += chunk;
  });

  var deferred = Q.defer();
  process.stdin.on('end', function() {
    deferred.resolve(buffer);
  });

  return deferred.promise;
}

module.exports = readStdin;
