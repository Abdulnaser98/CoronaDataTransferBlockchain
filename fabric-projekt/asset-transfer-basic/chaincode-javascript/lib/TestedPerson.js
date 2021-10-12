'use strict';

class TestedPerson{
  /**
   *
   * Voter
   *
   * Constructor for a testedPerson object. Voter has a voterId and registrar that the
   * voter is . 
   *  
   * @param items - an array of choices 
   * @param election - what election you are making ballots for 
   * @param voterId - the unique Id which corresponds to a registered voter
   * @returns - registrar object
   */
  constructor(testedPersonId, firstName, lastName,birhdate,laborName,Laborlocaion,dateAndTime,testResult) {

      this.testedPersonId = testedPersonId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.birhdate = birhdate;
      this.laborName = laborName;
      this.Laborlocaion = Laborlocaion;
	  this.dateAndTime = dateAndTime;
	  this.testResult = testResult;
	  this.type = 'testedPerson';
    
  }

}
 
module.exports = TestedPerson;