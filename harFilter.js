#!/usr/bin/env node
/**
 * Generate a new HAR file after applying entryFilter
 */
var _ = require('underscore')
var readInput = require('./readInput')
var entryFilter = require('./entryFilter')

readInput(process.argv[2]).then(function(har) {
  var h = _.clone(har)
  h.log = _.clone(h.log)
  h.log.entries = _.filter(har.log.entries, entryFilter);
  process.stdout.write(JSON.stringify(h, null, 2))
})
