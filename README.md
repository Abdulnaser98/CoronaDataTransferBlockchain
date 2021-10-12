# Fast transmission of corona case numbers using a private blockchain 
===
## Using a hyperledger fabric framework to create a private blockchain network composed of multiple labors and one health department.

This git repository documents the code base used in a private blockchain network.
___
#### Abstract
* <b> Currently the information about covid 19 get transmitted in the following way: </b>  

  * Reporting entities [doctors, laboratories, schools, elderly care centers] send the data to the health department: 
      * transmission often happens through the fax ,sometimes over phone or mail 
      * laboratories have to use DEMIS.
  * The health department then sends the information to the RKI.

* <b> Delays in the transmission happens because of : </b> 

  * high workload of the health departments.
  * the by law forced transmission time is slow
  * manual work in the health departments.


#### Motivation    

* improving the reporting system
* tested individuals should get the results fast and save
* there should be an automated and uniform transition of data
* Every user group should only get access to the relevant information
* high data security standards should be implemented
* ==> creation of a data sovereign solution


#### Acknowledgements
>EN: This work was realized as part of the course "Big data praktikum" (summer semester 2021) under the supervision of Herr. Jonas  Kreusch at the University of Leipzig.
>
>DE: Diese Arbeit wurde im Rahmen des Kurses "Big data praktikum" (Sommersemester 2021) unter der Leitung vHerr. Jonas  Kreusch at the University of Leipzig realisiert.
___

#### Use

* <b>  There are two ways to use the hyperledger fabric in regard with this project: </b> 

  1) You can clone the fabric samples and then:
   
      * navigate to  fabric-samples\asset-transfer-basic\chaincode-javascript and then replace the lib folder repace it with the one of this project.
      * navigate to  fabric-samples\asset-transfer-basic\application-javascript and replace all files that ends with .js with the files of this project that ends with .js under the same path.
      * navigate to fabric-samples\test-network\configtx and replace the configtx.yaml with the one of this project under the same path.
      * navigate to fabric-samples\config and replace core.yaml with the one of this project under the same path.
      * navigate to fabric-samples\test-network\docker and replace docker-compose-test-net.yaml with the one of this project under the same path.


  2) The other way is to just clone this repo and everything is already set up.


* <b>  After the project is clones and the config is changed to fit our project , we can now run the blockchain network and deploy the chain code and invoke function in the smart contracts: </b> 
   
     `cd fabric-project/test-network`  
      
     `./network.sh up createChannel -c mychannel -ca`  
     
     `./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript` 
     
     `cd asset-transfer-basic/application-javascript`  
     
     `npm install`  
     
     `node app.js`  
   
* <b>  Now we can call the custom methods we created in the samrt contracts that will on the other hand invoke methods in the chaincode: </b> 
  
    * Zur Registrierung eines Mitarbeiters an einer Testlabor(Org) wird die folgende Anweisung verwendet:
        * node -e 'require("./registerUser").registerUser (username,org)'
        * node -e 'require("./registerUser").registerUser("abdulnaser","testlabor1")'
         
    * Um neue Daten in das Netzwerk schreiben zu können , soll die folgende Anweisung verwendet:
        * node -e 'require("./writeData").write(testlaborMitarbeiter,org,testedid,org,firstname,lastname,birthdate,location,testdate,result)'
        * node -e 'require("./writeData").write("abdulnaser","testlabor1","1000","testlabor1","buthina","sabra","1995-08-20","leipzig","13-06-2021 13:00","negativ")'
         
    * Damit ein Getestete sein Testergebnis ausgeben lässt, soll die folgende Funktion ausgeführt werden:
         * node -e 'require("./readData").read(testedID,laborname,firstname,lastname,birthdate,location)'
         * node -e 'require("./readData").read("d0b76a00-6058-4cb9-b9b2-b07acd445488","testlabor1","Augusti","McCullough","1982-06-03T11:50:19.290Z","Leipzig")'
          
    *  um den R-Wert berechnen zu können , soll die folgende Anweisung verwendet werden:
         * node -e 'require("./calculateR").calculateRValue(gesundheitsamtMitarbeiterName ,date)'
         * node -e 'require("./calculateR").calculateRValue("abdulnaser","2020-01-25")' 
       
 





