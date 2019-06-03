const web3 = require('web3');
const Tx = require('ethereumjs-tx');
const fs = require('./ABI_File.js')
const wallet = require('ethereumjs-wallet');

  // Connect to local Ethereum node
web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/912ac66ae4d643b3842c2b8af37bf973"));

var contractFunction = async function (args) {

    /* The line of code is for private key decryption. I am decrypting the private key here so that it would be used for signing of the transaction*/
	const WalletOne = wallet.fromV3(args.jsonObject, args.pwd);
	const getpk = WalletOne.getPrivateKey().toString("hex");
	const getpb = WalletOne.getAddressString();
	var privateKey = new Buffer(getpk, 'hex');
	var myAddress = getpb;

    // Taking out the ABI object from imported file.
    var contractABI = fs.abi;

    try {
        var contractAddress = args.contractAddress;
        //creating contract object [ instance ]
        var contract = web3js.eth.contract(contractABI).at(contractAddress);

        // get transaction count, later will used as nonce
        count = web3js.eth.getTransactionCount(myAddress)
        console.log("Count: " + count);

        // using the switch case statement for all the call execution.
        switch (args.operation) {

            case "DisplayDashboardURNs":
               // Calling to smart contract function here.
                console.log(contract.DisplayDashboardURNs())
                return contract.DisplayDashboardURNs()
                break;
            
            case "GetCertificateDetails":
                console.log(contract.GetCertificateDetails(args.URN))
                return contract.GetCertificateDetails(args.URN)
                break;

            case "EnrollmentOfCertificates":
                // calling smart contract function here.
                var data = contract.EnrollmentOfCertificates.getData(args.URN, args.nameOfCertificate, args.ownerOfCertificate, args.issuingCertificateAuthority, args.issuedPlace);
                // creating raw tranaction with all the required things, like gas, rate, from, to accounts etc...
                var rawTransaction = { "from": myAddress, "gasPrice": web3js.toHex(20 * 1e9), "gasLimit": web3js.toHex(990000), "to": contractAddress, "value": "0x0", "data": data, "nonce": web3js.toHex(count) }
                console.log("rawTransaction", rawTransaction);
                break;

            case "LookForCertificate":
                var data = contract.LookForCertificate.getData(args.URN);
                var rawTransaction = { "from": myAddress, "gasPrice": web3js.toHex(20 * 1e9), "gasLimit": web3js.toHex(990000), "to": contractAddress, "value": "0x0", "data": data, "nonce": web3js.toHex(count) }
                console.log("rawTransaction", rawTransaction);
                break;

            case "SendOffLineRequest":
                var data = contract.SendOffLineRequest.getData(args.URN);
                var rawTransaction = { "from": myAddress, "gasPrice": web3js.toHex(20 * 1e9), "gasLimit": web3js.toHex(990000), "to": contractAddress, "value": "0x0", "data": data, "nonce": web3js.toHex(count) }
                console.log("rawTransaction", rawTransaction);
                break;
            
            case "IsCertificateValid":
                var data = contract.IsCertificateValid.getData(args.URN);
                var rawTransaction = { "from": myAddress, "gasPrice": web3js.toHex(20 * 1e9), "gasLimit": web3js.toHex(990000), "to": contractAddress, "value": "0x0", "data": data, "nonce": web3js.toHex(count) }
                console.log("rawTransaction", rawTransaction);
                break;

            case "AttestCertificate":
                var data = contract.AttestCertificate.getData(args.URN);
                var rawTransaction = { "from": myAddress, "gasPrice": web3js.toHex(20 * 1e9), "gasLimit": web3js.toHex(990000), "to": contractAddress, "value": "0x0", "data": data, "nonce": web3js.toHex(count) }
                console.log("rawTransaction", rawTransaction);
                break;
            
            case "AddCertificateDetails":
                var data = contract.AddCertificateDetails.getData(args.URN, args.certificateBoard, args.levelOfCertificate, args.nameOfCertificateHolder, args.signingAuthority, args.issueDateOfCertificate, args.expiryDateOfCertificate);
                var rawTransaction = { "from": myAddress, "gasPrice": web3js.toHex(20 * 1e9), "gasLimit": web3js.toHex(990000), "to": contractAddress, "value": "0x0", "data": data, "nonce": web3js.toHex(count) }
                console.log("rawTransaction", rawTransaction);
                break;
        }
        //creating tranaction via ethereumjs-tx
        var transaction = new Tx(rawTransaction);

        //signing transaction with private key
        transaction.sign(privateKey);

        //sending transacton via web3js module
        var txHash = web3js.eth.sendRawTransaction('0x' + transaction.serialize().toString('hex'))
        console.log(txHash);
        // Looking for the transaction reciept. Checking the status of the transaction if it is successfull or failed.
        while (true) {
            if (web3js.eth.getTransactionReceipt(txHash) != null) {
                console.log(web3js.eth.getTransactionReceipt(txHash))
                var receipt = web3js.eth.getTransactionReceipt(txHash);
                var transactionHash = receipt.transactionHash;
                if (receipt.status == '0x1') {
                    return JSON.stringify({ 'TransactionHash': transactionHash });
                } else {
                    return JSON.stringify({ 'ERROR': 'The ERROR occured while executing the function' });
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.contractFunction = contractFunction;   
