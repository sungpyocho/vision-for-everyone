const moment = require("moment");

let now = moment().valueOf();
let past = moment().add(-1, "seconds").valueOf();
console.log(now);
console.log(past);
console.log(past > now);
