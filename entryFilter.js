/**
 * Return true if HAR entry should be included in output.
 *
 * See: http://www.softwareishard.com/blog/har-12-spec/#entries
 */
module.exports = function(entry) {
  return 0 === entry.request.url.indexOf("https://example.com")
}
