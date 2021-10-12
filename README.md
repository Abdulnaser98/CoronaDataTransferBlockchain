# Fast transmission of corona case numbers using a private blockchain 
===
## Using a hyperledger fabric framework to create a private blockchain network composed of multiple labors and one health department.

This git repository documents the code base used in a private blockchain network.
___
#### Abstract
* Currently the information about covid 19 get transmitted in the following way:  

  * Reporting entities [doctors, laboratories, schools, elderly care centers] send the data to the health department: 
      * transmission often happens through the fax ,sometimes over phone or mail 
      * laboratories have to use DEMIS.
  * The health department then sends the information to the RKI.

* Delays in the transmission happens because of :

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

* There are two ways to use the hyperledger fabric in regard with this project:

  1) You can clone the fabric samples and then:
      * navigate to  fabric-samples\asset-transfer-basic\chaincode-javascript and then replace the lib folder repace it with the one of this project.
      * navigate to  fabric-samples\asset-transfer-basic\application-javascript and replace all files that ends with .js with the files of this project that ends with .js under the same path.
      * navigate to fabric-samples\test-network\configtx and replace the configtx.yaml with the one of this project under the same path.
      * navigate to fabric-samples\config and replace core.yaml with the one of this project under the same path.
      * navigate to fabric-samples\test-network\docker and replace docker-compose-test-net.yaml with the one of this project under the same path.


  2) The other way is to just clone this repo and everything is already set up.


* After the project is clones and the config is changed to fit our project , we can now run the blockchain network. 
    
 





