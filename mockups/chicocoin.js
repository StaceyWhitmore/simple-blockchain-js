/*
The mining endpoint

Has 4 tasks:

1) Calculate the Proof of Work
2) Reward the miner (us) by adding a transaction granting us 1 coin
3) Add any pending transactions
4) Forge the new Block by adding it to the chain

*/

const Blockchain = require('./blockchain')
const { validationResult } = require('express-validator/check')

class Chicocoin {
  constructor() {
    this.blocchain = new BlockChain()
    this.getChain = this.getChain.bind(this)
    this.mine = this.mine.bind(this)
    this.newTransaction = this.newTransaction.bind(this)
  }

  getChain(req, res, next) {
    req.responseValue = {
      message: 'get chain',
      chain: this.blockchain.chain
    }
    return next()

  }

  mine(req, res, next) {
    const lastBlock = this.blockchain.lastBlock()
    const lastProof = lastBlock.proof
    const proof = this.blockchain.proofOfWork(lastProof)

    //reward the miner (me) by adding a new transaction granint 1 coin
    this.blockchain.newTransaction('0', process.env.NODE_NAME, 1)//create a new transaction from 0 (this current node) to the node (NODE_NAME) of 1

    //NEXT forge the newly created block by adding it to the chain
    const previousHash = this.blockchain.hash(lastProof)
    const newBlock = this.blockchain.newBlock(proof, previousHash)

    const responseValue = Obect.assign({
      message:'new block has been mined'
    }, newBlock)

    req.responseValue = responseValue
    return next()


  }

  newTransaction(req, res, next) {
    const errors = validationResult(req)
    if (!errors,isEmpty) {
      return res.status(422).json({errors.mapped() })
    }
    const trans = req.body
    const index = this.blockchain
    .newTransaction(trans['sender'], trans['recipient'], trans['amount'])

    const responseValue = {
      message: `transaction will be added to block ${index}`
    }

    req.responseValue = responseValue
    return next()
  }

}//close class

export.modules = new Chicocoin()
