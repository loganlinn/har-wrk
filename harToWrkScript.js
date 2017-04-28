#!/usr/bin/env node
var fs = require('fs')
var url = require('url')
var _ = require('underscore')
var readInput = require('./readInput')
var entryFilter = require('./entryFilter')

////////////////////////////////////////////////////////////////////////////////

var INDENT = '  ';
var _prefix_ = ''

function pushIndent() { _prefix_ += INDENT }
function popIndent()  { _prefix_ = _prefix_.substring(0, _prefix_.length - INDENT.length) }

// output a line
function o() {
  if (arguments.length) {
    process.stdout.write(_prefix_)
    for (var i = 0; i < arguments.length; i++) {
      process.stdout.write(arguments[i].toString())
    }
  }
  process.stdout.write("\n")
}

// indent some output
function i(f) {
  pushIndent()
  f()
  popIndent()
}

// helper for block w/ implicit end
function b(h, f) {
  o(h)
  i(f)
  o('end')
}


// string for request's headers as Lua table
function formatHeaders(headers) {
  var xs = _.map(headers, function(header) {
    return '["' + header.name + '"]="' + header.value + '"'
  })
  return '{ ' + xs.join(', ') + ' }'
}

////////////////////////////////////////////////////////////////////////////////

function outputWrkScript(har) {
  b('init = function(args)', function() {
    o('i = 0')
    o('reqs = {}')
    var entries = har.log.entries
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i]
      if (!entryFilter(entry)) {
        continue;
      }
      var req = entry.request
      var method = req.method
      var path = url.parse(req.url).pathname
      var headers = formatHeaders(req.headers)
      var body = req.postData ? JSON.stringify(req.postData.text) : 'nil'
      o('reqs[', i, '] = wrk.format("', method, '", "', path, '", ', headers, ', ', body, ')')
    }
  })
  o()

  b('request = function ()', function() {
    o('local r = reqs[i]')
    o('i = i + 1')

    b('if i > #reqs then', function() {
      o('i = 0')
    })

    o('return r')
  })
}

////////////////////////////////////////////////////////////////////////////////

readInput(process.argv[2]).then(outputWrkScript)
