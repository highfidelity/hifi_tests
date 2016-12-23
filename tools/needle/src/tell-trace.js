

function Sample(timestamp, value) {
    this.ts = timestamp;
    this.v = value;
}

function getValue(args, name) {
  if (args.nv_payload !== undefined) {
    return +args.nv_payload;
  } else if (args.fps !== undefined) {
    return +args.fps;
  } else if (args.v !== undefined) {
    return +args.v;
  } else if (args[name] !== undefined) {
    return +args[name];
  }
  return 0;
}

function Metrics(name) {
  this.name = name;
  this.average = 0.0;
  this.samples = [];
  this.sumValues = 0.0;

  this.timeDomain = [-1, -1];

  this.valDomain = [null, null]; 
  this.numInvalids = 0;

  this.type = "C"
  this.lastBeginTs = -1;
}


Metrics.prototype.valueDomain = function (includeVal) {
  if (includeVal === undefined) {
    return this.valDomain;
  } else {
    return [ Math.min(includeVal, this.valDomain[0]), Math.max(includeVal, this.valDomain[1])];
  }
}


Metrics.prototype.samples = function () {
  return this.samples;
}

Metrics.prototype.filterTime = function (ts) {
  if (ts > this.timeDomain[1]) {
    this.timeDomain[1] = ts;
    if (this.timeDomain[0] < 0) {
      this.timeDomain[0] = ts;
    }
  }
  return ts
}

Metrics.prototype.filterVal = function (val) {
  if (this.valDomain[0] == null) {
    this.valDomain[0] = val;
    this.valDomain[1] = val;
  } else {
    if (val > this.valDomain[1]) {
      this.valDomain[1] = val;
    } else if (val < this.valDomain[0]) {
      this.valDomain[0] = val;
    }
  }

  this.sumValues += val;

  return val;
}

Metrics.prototype.newSample = function (ts, args) {
  return new Sample(ts, this.filterVal(getValue(args, this.name)));
}

Metrics.prototype.addSample = function (ts, args) { 
  if (args === undefined) {
    // skip
    this.numInvalids++;
    return;
  } else if (ts > this.timeDomain[1]) {
    this.timeDomain[1] = ts;
    if (this.timeDomain[0] < 0) {
      this.timeDomain[0] = ts;
    }
    this.samples.push(this.newSample(ts, args))
  } else if (ts > this.timeDomain[0]) {
    var index = this.samples.findIndexOf(function(s) { return s.ts > ts; } );
    this.samples.splice(index, 1, this.newSample(ts, args));
  }
}

Metrics.prototype.addSampleBegin = function (ts) { 
  if (this.lastBeginTs >= 0) {
    // skip
    this.numInvalids++;
    return;
  } else if (ts > this.timeDomain[1]) {
    this.timeDomain[1] = ts;
    if (this.timeDomain[0] < 0) {
      this.timeDomain[0] = ts;
    }
    this.lastBeginTs = ts

  } else if (ts > this.timeDomain[0]) {
    this.numInvalids++;
    return;
  }
}

Metrics.prototype.addSampleEnd = function (ts) { 
  if (this.lastBeginTs < 0) {
    // skip
    this.numInvalids++;
    return;
  } else if (ts > this.timeDomain[1]) {
    this.timeDomain[1] = ts;
    if (this.timeDomain[0] < 0) {
      this.timeDomain[0] = ts;
    }

    this.samples.push(this.newSample(ts, { v: (ts - this.lastBeginTs)/1000}))
  
    this.type = "D"
    this.lastBeginTs = -1

  } else if (ts > this.timeDomain[0]) {
    this.numInvalids++;
    return;
  }
}

Metrics.prototype.getAverage = function () {
  return this.sumValues / this.samples.length;
}

Metrics.prototype.getType = function () {
  return this.type;
}

Metrics.prototype.getTimingMetrics = function () {
  if (this.type == "D") {
      return {m: this.name, t: this.sumValues}
  } else {
      return null
  }
}


function MetricsCategory(catName) {
  this.name = catName;
  this.metricsMap = new Object();
}


MetricsCategory.prototype.metrics = function(metName) {
  return this.metricsMap[metName];
}

MetricsCategory.prototype.addMetrics = function(metName) {
  var met = (this.metricsMap[metName]);
  if (met === undefined) {
    met = new Metrics(metName)
    this.metricsMap[metName] = met;
  }
  return met;
}

MetricsCategory.prototype.listMetrics = function () {
  var list = ""
  for ( metName in this.metricsMap) {
    list += this.metricsMap[metName].name + "\r"
  }
  return list;
}

MetricsCategory.prototype.getTimingMetrics = function () {
  var list = {n: this.name, m: [] }
  for ( metName in this.metricsMap) {
    var m = this.metricsMap[metName].getTimingMetrics()
    if (m !== null) { 
      list.m.push(m)
    }
  }
  return list;
}

// A library of the metrics sorted by categories
function MetricsLib() {
  this.catMap = new Object();
  this.timeDomain = [-1, -1]
}


MetricsLib.prototype.category = function(catName) {
  return this.catMap[catName];
}

MetricsLib.prototype.addCat = function(catName) {
  var cat = (this.catMap[catName]);
  if (cat === undefined) {
    cat = new MetricsCategory(catName)
    this.catMap[catName] = cat;
  }
  return cat;
}

MetricsLib.prototype.filterTime = function (ts) {
  if (ts > this.timeDomain[1]) {
    this.timeDomain[1] = ts;
    if (this.timeDomain[0] < 0) {
      this.timeDomain[0] = ts;
    }
  }
  return ts
}

MetricsLib.prototype.addSample = function (ts, cat, name, ph, args) {
  if (ph == "C") {
    this.addCat(cat).addMetrics(name).addSample(ts, args);
  } else if (ph == "B") {
    this.addCat(cat).addMetrics(name).addSampleBegin(ts);
  } else if (ph == "E") {
    this.addCat(cat).addMetrics(name).addSampleEnd(ts);
  }

  this.filterTime(ts);
}

MetricsLib.prototype.listMetrics = function () {
  var list = ""
  for ( catName in this.catMap) {
    list += this.catMap[catName].name + "\r"
    list += "\t" + this.catMap[catName].listMetrics() + "\r"
  }
  return list;
}

MetricsLib.prototype.getTimingMetrics = function () {
  var list = []
 for ( catName in this.catMap) {
    list.push(this.catMap[catName].getTimingMetrics())
  }
  return list;
}

// Trace root class
function Trace(database) {
  this.metLib = new MetricsLib();

  if (database) {
    this.parseDatabase(database);
  }
}


Trace.prototype.parseEvent = function (event) {
  if (event.cat && event.ts) {
    this.metLib.addSample(event.ts, event.cat, event.name, event.ph, event.args);
  }
}

Trace.prototype.parseDatabase = function (database) {
  database.forEach(function( e, index) {
    this.parseEvent(e);
  }, this);
}

Trace.prototype.listMetrics = function () {
  return this.metLib.listMetrics();
}

Trace.prototype.getTimingMetrics = function () {
  return this.metLib.getTimingMetrics();
}