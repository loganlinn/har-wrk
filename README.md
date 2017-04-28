# har-wrk

> benchmarking shouldnt be har-wrk

This is a dead-simple utility for using the [wrk HTTP benchmarking
tool](https://github.com/wg/wrk/) and [HAR
files](http://www.softwareishard.com/blog/har-12-spec/) to make the same
requests to your server that your browser does.

It generates a [Lua](https://www.lua.org/) script for wrk that continuously
makes a series of requests you choose from a HAR file.

### 1. Setup

Install requirements: Node.js and wrk.

```
# on a mac
brew install node
brew install wrk
```

Clone this repo and install dependencies:

```
git clone git@github.com:loganlinn/har-wrk.git
cd har-wrk
npm install
```

### 2. Get a HAR file

Using your browser of choice ([or some other HAR
tool](http://www.softwareishard.com/blog/har-adopters/)), capture a set of
requests that you want to benchmark into a HAR file.

### 3. Update `entryFilter.js` as necessary

Update the function that determines whether request of a [HAR
entry](http://www.softwareishard.com/blog/har-12-spec/#entries) should be
included in the output.

At a minimum, you'll want to filter to the requests made to the server you'll be
benchmarking by looking at `entry.request.url`.

### 4. Generate Lua script

The `harToWrkScript.js` takes HAR file on STDIN and writes a Lua script to
STDOUT.

```
harToWrkScript.js < input.har > script.lua
```

Take a peek at the generated script to make sure it has the requests you want to
benchmark.

### 5. Run benchmark

Run `wrk` with the script and specify a base URL. See `wrk --help` for available
options.

```
wrk -s script.lua http://localhost:8080
```
