/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const { buildCCPOrg1,buildCCPOrg2, buildWallet } = require('../../test-application/javascript/AppUtil.js');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';

//const buildWallet = require('../../test-application/javascript/AppUtil.js');

var  buildCCPOrg;

var mspOrg = '';

var walletname = '';

var caname = '';

var orgname = '';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}


module.exports.registerUser = async function (username,testlabor) { 
 
 try {
		
		if ( testlabor == 'gesundheitsamt' ){
			
			mspOrg = 'Org1MSP';
            walletname = 'gesundheitsamtwallet';
			caname = 'ca.org1.example.com';
			orgname = 'org1.department1';
			
			addToWallet(testlabor, mspOrg, walletname,caname, orgname, username);
			
			
		}
		
		if ( testlabor == 'testlabor1' ){
			
			mspOrg = 'Org2MSP';
            walletname = 'testLabor1Wallet';
			caname = 'ca.org2.example.com';
			orgname = 'org2.department1';
			
			addToWallet(testlabor, mspOrg, walletname,caname, orgname, username);
			
			
		}
		
		
		
	    if (testlabor == 'testlabor2') {

			mspOrg = 'Org2MSP';
            walletname = 'testlabor2Wallet';
			caname = 'ca.org2.example.com';
		    orgname = 'org2.department1';

    		addToWallet(testlabor, mspOrg, walletname,caname, orgname, username);

		} 

	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
};












async function addToWallet(testlabor, mspOrg, walletname, caname, orgname, orgUserId ){
	
	

	mspOrg = mspOrg;
	walletname = walletname;
	caname = caname;
	orgname = orgname;
	var ccp;
	console.log("Helllllllllllllo");
	console.log(caname);


	if (testlabor == "gesundheitsamt") {

		ccp = buildCCPOrg1();
	}

	if (testlabor == "testlabor1" || testlabor == "testlabor2") {

		ccp = buildCCPOrg2();

	}
  
try{
	
	const walletPath = path.join(__dirname, walletname);

	// build an instance of the fabric ca services client based on
	// the information in the network configuration
	const caClient = buildCAClient(FabricCAServices, ccp, caname);

	// setup the wallet to hold the credentials of the application user
	const wallet = await buildWallet(Wallets, walletPath);

	// in a real application this would be done on an administrative flow, and only once
	await enrollAdmin(caClient, wallet, mspOrg);

	// in a real application this would be done only when a new user was required to be added
	// and would be part of an administrative flow
	await registerAndEnrollUser(caClient, wallet, mspOrg, orgUserId, orgname);

	console.log(orgUserId + " " + "has been added succefually to the " + testlabor)
}catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
	
	
	
}























//main('abo33333333333333333hed','testlabor2');

// node -e 'require("./app").main("abdulbarii","testlabor1")'
   