const { FileSystemWallet, Gateway, Wallets } = require('fabric-network');
const channelName = 'mychannel';
const chaincodeName = 'basic';
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');


const isExisted = require('./checkExistence.js');


function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

module.exports.calculateRValue =  async function(userId,date) {


	// Check to see if we've already enrolled the user.
	if (!isExisted.check(userId, 'gesundheitsamtwallet')) {

		console.log(`An identity for the user ${userId} does not exist in the wallet, he should be registerd at first`);
		return;

	}

	
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(__dirname, 'gesundheitsamtwallet');
	
    //setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);
		
	// Create a new gateway instance for interacting with the fabric network.
	// In a real application this would be done as the backend server session is setup for
	// a user that has been verified.
	const gateway = new Gateway();
		
    // build an in memory object with the network configuration (also known as a connection profile)
	const ccp = buildCCPOrg1();
		
	// setup the gateway instance
	// The user will now be able to create connections to the fabric network and be able to
    // submit transactions and query. All transactions submitted by this gateway will be
	// signed by this user using the credentials stored in the wallet.
	await gateway.connect(ccp, {
			  wallet,
			  identity: userId,
			  discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
	});
		
		
	// Build a network instance based on the channel where the smart contract is deployed
    const network = await gateway.getNetwork(channelName);
		
	// Get the contract from the network.
	const contract = network.getContract(chaincodeName);
		
	
	// This will be sent to just one peer and the results will be shown.
	console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
	let testedPersons = await contract.evaluateTransaction('GetAllAssets');
	//console.log(`*** Result: ${prettyJSONString(testedPersons.toString())}`);

	//console.log(testedPersons.toString());
	var testedPersonsList = JSON.parse(testedPersons.toString());

	//create a Date Object from the given string
	var givenDate = new Date(date);

	//get the day before the given date 
	var sevenDaysBefore = new Date(givenDate - (7 * 24 * 60 * 60 * 1000));

	//4 days before he given date
	var fourdaysBefore = new Date(givenDate - (4 * 24 * 60 * 60 * 1000));

	//5 days before given date
	var elevendaysBefore = new Date(givenDate - (11 * 24 * 60 * 60 * 1000));

	//8 days before given date 
	var eightdaysBeofre = new Date(givenDate - (8 * 24 * 60 * 60 * 1000));


    //Print the days
	console.log(givenDate)
	console.log(sevenDaysBefore)
	console.log(fourdaysBefore)
	console.log(elevendaysBefore)
	console.log(eightdaysBeofre)

    //Two count variables used to calculate the R value.
	var countCasesFirstGeneration = 0; 
	var countCasesPreviousGeneration = 0; 

  
	
	for (const testedPerson of testedPersonsList) {
        		 
		var testdate = new Date(testedPerson.Record.dateAndTime);
	

		if (testdate >= sevenDaysBefore && testdate <= fourdaysBefore) {
			
		
			if (testedPerson.Record.testResult == "positiv") {
				
				console.log(testedPerson.Record.dateAndTime);		

				countCasesFirstGeneration = countCasesFirstGeneration + 1;
			}

		}

		else if (testdate >= elevendaysBefore && testdate <= eightdaysBeofre) {
		

			if (testedPerson.Record.testResult == "positiv") {
				
				console.log(testedPerson.Record.dateAndTime);		

				countCasesPreviousGeneration = countCasesPreviousGeneration + 1;
			}

		}

	}

	console.log("Number of cases of first generation time");
	console.log(countCasesFirstGeneration);
	console.log("Number of cases of previous generation time");
	console.log(countCasesPreviousGeneration);
	

	var rValue = countCasesFirstGeneration / countCasesPreviousGeneration;

	console.log("The R Value is : ");
	console.log(rValue);

	gateway.disconnect();


}
	
	
	
	
//calculateRValue('appUser', '2020-06-25');	
	
