const crypto = require("crypto");

const cryptoHash = (...inputs) => {
  /* inputs will be wrapped with an array 
  ...input = {a: 3}
  input = [{a: 3}]
  */

  const hash = crypto.createHash("sha256");
  hash.update(inputs.map(input => JSON.stringify(input)).sort().join(" "));
  return hash.digest('hex')
};

module.exports = cryptoHash;
