const fs = require("fs");
const TestedPerson = require('./TestedPerson.js');
const faker = require('faker');

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2)
}


function generateData(){
	


	writeDataToJSONFile(0, 250, "westlabor", "positiv")
	writeDataToJSONFile(250, 500, "westlabor", "negativ")
	writeDataToJSONFile(500, 750, "ostlabor", "positiv")
	writeDataToJSONFile(750, 1000, "ostlabor", "negativ")


	/* 
    var testedPersons = [];

	for (let i = 0; i < 250; i++){   

		
		var testedPerson = new TestedPerson(String(i), generateName(7), generateName(5), randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1))
			, "westlabor", "leipzig", randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1)) , "positiv")

		testedPersons.push(testedPerson)


					 
	} 

	
	for (let i = 250; i < 500; i++) {

		var testedPerson = new TestedPerson(String(i), generateName(7), generateName(5), randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1))
			, "westlabor", "leipzig", randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1)), "negativ")


		testedPersons.push(testedPerson)


	} 


	for (let i = 500; i < 750; i++) {

		var testedPerson = new TestedPerson(String(i), generateName(7), generateName(5), randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1))
			, "ostlabor", "leipzig", randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1)), "positiv")


		testedPersons.push(testedPerson)


	} 


	for (let i = 750; i < 1000; i++) {

		var testedPerson = new TestedPerson(String(i), generateName(7), generateName(5), randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1))
			, "ostlabor", "leipzig", randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1)), "negativ")



		testedPersons.push(testedPerson)


	} 
	
	return testedPersons;
	*/
	
};	






function writeDataToJSONFile(fromIndex, toIndex, laborNAME, testResult) {

	// STEP 1: Reading JSON file
	const users = require("./testedPersonsData");

	for (let i = fromIndex; i < toIndex; i++) {


		let testedPersonData = {

			"id": faker.random.uuid(),
			"firstname": faker.name.firstName(),
			"lastname":  faker.name.lastName(),
			//"birthDate": randomBirthDate(new Date(1940, 0, 1), new Date(2010, 0, 1)),
			"birthDate": faker.date.between('1940-01-01', '2005-01-01'),
			"testlabor": laborNAME,
			"location": "Leipzig",
			//"resultDate": randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1)),
			"resultDate": faker.date.between('2021-01-01', '2021-02-01'),
			"testResult": testResult

		};


		// STEP 3: Writing to a file
		users.push(testedPersonData)
		data = JSON.stringify(users)
		// STEP 3: Writing to a file
		fs.writeFile("testedPersonsData.json", data, err => {

			// Checking for errors
			if (err) throw console.log(err);

			console.log("Done writing"); // Success
		});
	


		//var testedPerson = new TestedPerson(String(i), generateName(7), generateName(5), randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1))
		//	, "ostlabor", "leipzig", randomBirthDate(new Date(2020, 0, 1), new Date(2021, 0, 1)), "positiv")
		//testedPersons.push(testedPerson)

	}





}


function readDataFromJSONFile() {

	const users = require("./testedPersonsData");

	//testedPersons = JSON.parse(fs.readFileSync("testedPersonsData.json", "utf8"));
	
	users.forEach(function (testedPerson) {
		var testedPersonId = testedPerson.id;
		var testedPersonFirstName = testedPerson.firstname;
		var testedPersonLastName = testedPerson.lastname;
		var testedPersonBirthDate = testedPerson.birthDate;
		var testedPersontestlabor = testedPerson.testlabor;
		var testedPersoLocation = testedPerson.location;
		var testedPersonResultDate = testedPerson.resultDate;
		var testedPersonTestResult = testedPerson.testResult;
		console.log(testedPersonId);
		console.log(testedPersonFirstName);
		console.log(testedPersonLastName);
		console.log(testedPersonBirthDate)
		var mydate = new Date(testedPersonBirthDate);
		console.log(mydate.getUTCMonth() + 1);
		console.log(testedPersontestlabor);
		console.log(testedPersoLocation);
		console.log(testedPersonResultDate);
		console.log(testedPersonTestResult);

		console.log(" ")
	});



	return users; 







}















	


function generateName(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
   }
   return result;
}



function randomBirthDate(start, end) {
	return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));
}













function printData() {

	var array = generateData();
	array.forEach(function (item, index) {
		console.log(item, index);
	});
	

}



function GetAllAssetsbeweendaesnew(startDate, endDate){

	var startDateUTC = new Date(startDate);
	var endDateUTC = new Date(endDate);
	var testdate = new Date("1980-10-24T23:47:38.020Z");
	if (testdate > startDateUTC && testdate < endDateUTC) {

		console.log("helllllllo world")


	}





}

//GetAllAssetsbeweendaesnew("1949-01-30", "1980-10-25");





generateData()
//readDataFromJSONFile();

module.exports = { generateData, readDataFromJSONFile };

