const Web3 = require('web3');
const Tx = require('ethereumjs-tx')
const fs = require('./ABI_File.js')
const wallet = require('ethereumjs-wallet');

//function defination starts here
var deployContract = async function (args) {

	/* The line of code is for private key decryption. I am decrypting the private key here so that it would be used for signing of the transaction*/
	const WalletOne = wallet.fromV3(args.jsonObject, args.pwd);
	const getpk = WalletOne.getPrivateKey().toString("hex");
	const getpb = WalletOne.getAddressString();
	var privateKey = new Buffer(getpk, 'hex');
	var myAddress = getpb;

    // Connect to local Ethereum node
    const web3js = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/912ac66ae4d643b3842c2b8af37bf973"));

	// Taking out the ABI object from imported file.
    const contract = new web3js.eth.contract(fs.abi);

	// deploying the contract here using web3. imported the bytecode which is must for contract deployment.
    const hexdata = contract.new.getData({ data: fs.bytecode.object });

	// get the transaction count which would be user as a nonce at later stage.
    count = web3js.eth.getTransactionCount(myAddress)
    console.log("Count: " + count);
    //creating raw tranaction with all the required things, like gas, rate, from, to accounts etc...
    try {
        var rawTransaction = {"from": myAddress,"gasPrice": web3js.toHex(105 * 1e9),"gasLimit": web3js.toHex(3990000),"value": "0x0","data": '0x' + hexdata,"nonce": web3js.toHex(count)}
        console.log(rawTransaction);
    } catch (error) {
        console.log(error)
    }
    //creating tranaction via ethereumjs-tx
    var transaction = new Tx(rawTransaction);
    //signing transaction with private key
    transaction.sign(privateKey);
    //sending transacton via web3js module
    try {
        var txHash = web3js.eth.sendRawTransaction('0x' + transaction.serialize().toString('hex'));
        console.log(txHash)

		// Looking for the transaction reciept. Checking the status of the transaction if it is successfull or failed.
        while (true) {
            if (web3js.eth.getTransactionReceipt(txHash) != null) {
                console.log("Transaction Block", web3js.eth.getTransactionReceipt(txHash))
                var receipt = web3js.eth.getTransactionReceipt(txHash);
				var contractAddress = receipt.contractAddress;
				var transactionHash = receipt.transactionHash;
				// checking the status of the transaction here. 0x1 is for success. 0x0 is for failed.
                if(receipt.status == '0x1'){ 
                    return JSON.stringify({ 'ContractAddress': contractAddress, 'TransactionHash': transactionHash} );
                 } else {
                    return JSON.stringify({ 'ERROR': 'The ERROR occured while deploying  contract!' });
                 }
            }
        }
    } catch (error) {
        console.log(error)
    }
}
exports.deployContract = deployContract;   
