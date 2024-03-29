const Block = require("./block");
const { cryptoHash } = require("../util");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });

    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    /*  when the new chain is not longer it does not replace the chain */
    if (chain.length <= this.chain.length) {
      console.error("The incoming chain must be longer");
      return;
    }
    /* when the new chain is longer, and the chain is invalid, does not replace */
    if (!Blockchain.isValidChain(chain)) {
      console.error("The incoming chain must be valid");
      return;
    }

    console.log("replacing chain with", chain);
    this.chain = chain;
  }

  static isValidChain(chain) {
    /* "when the chain does not start with genesis block, return false */
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;
      /*  when lastHash reference has changed, returns false */
      if (lastHash !== actualLastHash) return false;

      /* chain contains a block with an invalid field  */
      const validateHash = cryptoHash(
        timestamp,
        lastHash,
        nonce,
        difficulty,
        data
      );
      if (hash !== validateHash) return false;

      /* prevent jumping difficulty */
      if (lastDifficulty - difficulty > 1) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
