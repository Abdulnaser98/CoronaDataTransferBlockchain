/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */


'use strict';


const { Contract } = require('fabric-contract-api');
const testedPersons = require("./testedPersonsData");
const TestedPerson = require('./TestedPerson.js');

//const testedPersons = lib.generateData();
//console.log(testedPersons);

class AssetTransfer extends Contract  {
	

    async InitLedger(ctx) {
		
		
		
		for (const testedPerson of testedPersons) {
			
			let testedPersonObject =  new TestedPerson( testedPerson.id,testedPerson.firstname,testedPerson.lastname, testedPerson.birthDate
		
		                                         , testedPerson.testlabor,testedPerson.location,testedPerson.resultDate,testedPerson.testResult);
												 
            testedPersonObject.docType = 'testedPerson';
            await ctx.stub.putState( testedPersonObject.testedPersonId , Buffer.from(JSON.stringify(testedPersonObject)));
                console.log(testedPersonObject.testedPersonId)										 
        }
        
		
	
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, id, laborname, firstname, lastname,birthdate, location, dateandtime, result ) {
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }

        
		let testedPersonObject =  new TestedPerson( id,firstname,lastname, birthdate
		
		                                         ,laborname,location,dateandtime,result);
												 
		testedPersonObject.docType = 'testedPerson';										 
		
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(testedPersonObject)));
        return JSON.stringify(testedPersonObject);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, id, color, size, owner, appraisedValue) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            ID: id,
            Color: color,
            Size: size,
            Owner: owner,
            AppraisedValue: appraisedValue,
        };
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedAsset)));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(ctx, id, newOwner) {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        asset.Owner = newOwner;
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
	
	
	/*
	async GetAllAssetsbeweendaes(ctx,startDate,endDate) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
			var startDateUTC = new Date(startDate);
	        var endDateUTC = new Date(endDate);
	        var testdate = new Date(record.resultDate);
	        if (testdate > startDateUTC && testdate < endDateUTC) {

		        if(record.testResult == "positiv"){
					
					 allResults.push({ Key: result.value.key, Record: record });
					
				}


	        }
			
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
	*/
	
    

	
	
}




module.exports = AssetTransfer;
