const { Gateway, Wallets } = require('fabric-network');
const { buildCCPOrg1, buildCCPOrg2, buildWallet } = require('../../test-application/javascript/AppUtil.js');
const path = require('path');


module.exports.check=  async function(userName, walletName){
	
	var isExised;
	
	if (walletName == 'gesundheitsamtwallet') {
		
		console.log(checkExistence(userName, walletName).toString());

		return  checkExistence(userName, walletName);

	}


	if (walletName == 'testLabor1Wallet') {

		return checkExistence(userName, walletName);

	}


	if (walletName == 'testlabor2Wallet') {

		return checkExistence(userName, walletName);

	}






	
	
}



module.exports.check = async function(userId,walletname) {


	try {


		// Create a new file system based wallet for managing identities.
		const walletPath = path.join(__dirname, walletname);

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// Check to see if we've already enrolled the user.
		const userExists = await wallet.get(userId);
		
		console.log("hellllllllllllllllo");
		console.log(userId);
		console.log(walletname);
		console.log(userExists);

		if (userExists) {

            console.log(`An identity for the user ${userId} exist in the wallet`);
			return true;

		}

		else {


			console.log(`An identity for the user ${userId} does not exist in the wallet, he should be registerd at first`);
			return false;

		}

	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}

}








