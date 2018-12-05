/*
PROOF OF WORK
In general, the proof of work is a function or a protocol invented and used to deter denial of service attacks, but the blockchain used it to determinate how new Blocks are created or mined on themselves. The goal of a POW is to discover a number which solves a problem. This number must be difficult to find but easy to verify, like the calculation of prime numbers, more we go on the more difficult it will be to find one, but the effort to understand if it is or not will always be very banal.

To mining a Chiccocoin we decide the create a c4ff3. Our POW will be this:

Find a number p that when hashed with the previous block’s solution a hash which starts with c4ff3 is produced.
An example:

c4ff3e9373e...5e3600155e860

functions used
* validProof: given the previous POW and a p number checks if the solution to the problem is correct
* proofOfWork: cycle until a solution is found: 'value'

*/

validProof(lastProof, proof) {
  const guessHash = crypto.createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
  .update(`${lastProof}${proof}`)
  .digest('hex')

  return guessHash.substr(0,5) === process.env.RESOLUTION_HASH
}

proofOfWork(lastProof) {
  let proof = 0
  while(true) {
    if(!this.validProof(lastProof, proof)) {
      proof++
    } else {
      break
    }
  }
  return proof
}
