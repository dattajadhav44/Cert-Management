pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract CertificateManagement {
    
    mapping(uint256 => uint256) statusOfCertificate;       /* The Certificate status are- 1= Displayed in DashBoard, 
                                                                                          2= Selected from DashBoard,
                                                                                          3= sent Off line request,
                                                                                          4= Validated certicate,
                                                                                          5= Attested,
                                                                                          6= Added details(process completed
                                                                                         */
    address univercityAdmin;

    // Cretaed user defined data structured with below fields which is gonna be used to store the certificate details once it pass through all checks.
    struct certificate{
        string certificateBoard;
        string levelOfCertificate;
        string nameOfCertificateHolder;
        string signingAuthority;
        uint256 issueDateOfCertificate;
        uint256 expiryDateOfCertificate;
    }
    mapping(uint256 => certificate) certificateDetails;  // Mapping for storing each certificate details keyed by URN number.
    
    // Created user defined data structure to store all the certificate which are going to be used to display in DASHBOARD.
    struct certificateEnrollment{
        string nameOfCertificate;
        string ownerOfCertificate;
        string issuingCertificateAuthority;
        string issuedPlace;
    }
    mapping(uint256 => certificateEnrollment) certificateEnrollments;
    
    uint256[] listOfCertificates;
    mapping(uint256 => bool) isCertificateExists;
    
    // modifier- look for identity validation- ONLY owner of this contract would be able to CALL this.
    modifier onlyAdmin {
        require(msg.sender == univercityAdmin, " This person is NOT allowed to call this function.ONLY owner is allowed" );
        _;
    }
    
    // Event - would be emitted when details are finally stored.
    event CertificateStored(uint256 _URN,uint256 _timeStamp); // event raised after creation of PO. (Bank-Kalyan-Supplier)

    // constructor of this smart contract ONLY once is going to be executed at the time of deployment.
    constructor () public{
      univercityAdmin = msg.sender;
    }

    // This function is for Enrollment of the certificate(metadata). If we want to display the certificate in dashboard then we need to make their entries. Hence this function make the Enrollment with metadata.
    function EnrollmentOfCertificates(uint256 _URN, string memory _nameOfCertificate, string memory _ownerOfCertificate,string memory _issuingCertificateAuthority, string memory _issuedPlace) public onlyAdmin {
        certificateEnrollment storage ce = certificateEnrollments[_URN];
        ce.nameOfCertificate = _nameOfCertificate;
        ce.ownerOfCertificate = _ownerOfCertificate;
        ce.issuingCertificateAuthority = _issuingCertificateAuthority;
        ce.issuedPlace = _issuedPlace;
        isCertificateExists[_URN] = true;
        listOfCertificates.push(_URN);
        //listOfCertificates.push(certificateEnrollment({nameOfCertificate: _nameOfCertificate,ownerOfCertificate: _ownerOfCertificate,issuingCertificateAuthority: _issuingCertificateAuthority,issuedPlace: _issuedPlace}));
    }
    
    // This function is  for displaying the list of certificates available.
    function DisplayDashboardURNs() public view returns(uint256[] memory){
        return listOfCertificates;
    } 

    // This function is to look for specific certificate with URN number
    function LookForCertificate(uint256 _URN) public returns(string memory, string memory, string memory, string memory){  // URN stands for - Unique Registration number
        require(isCertificateExists[_URN] == true, "There is NO certificate exists with this URN number. Please provide the valid URN Number");
        certificateEnrollment memory c = certificateEnrollments[_URN];
        statusOfCertificate[_URN] = 2;
        return(c.nameOfCertificate,c.ownerOfCertificate,c.issuingCertificateAuthority,c.issuedPlace);
    }
      
    // This function is for sending the off line request. Are making the change in the status so that validatin would be done on basis of that.
    function SendOffLineRequest(uint256 _URN) public {
        require(isCertificateExists[_URN] == true && statusOfCertificate[_URN] == 2, "URN must be valid and has to be processed as per business logic!");
        statusOfCertificate[_URN] = 3;
    }

    // All the cross checking would be done here. 
    function IsCertificateValid(uint256 _URN) public {
        require(isCertificateExists[_URN] == true && statusOfCertificate[_URN] == 3, "URN must be valid and has to be processed as per business logic!");
        statusOfCertificate[_URN] = 4;
    }

    // Attest the certificate here. Please look for status message description.
    function AttestCertificate(uint256 _URN) public  {
        require(isCertificateExists[_URN] == true && statusOfCertificate[_URN] == 4, "URN must be valid and has to be processed as per business logic!");
        statusOfCertificate[_URN] = 5;
    }
    
    // Once all the above process is completed then finaly store the certificate IF any of the step is failed the process would be rejected their.
    function AddCertificateDetails(uint256 _URN, string memory _certificateAuthority, string memory _levelOfCertificate,string memory _nameOfCertificateHolder, string memory _signingAuthority, uint256 _issueDate, uint256 _expiryDate) public onlyAdmin{
        require(isCertificateExists[_URN] == true && statusOfCertificate[_URN] == 5, "URN must be valid and has to be processed as per business logic!");
        uint256 issueDate = now + _issueDate * 1 days;
        uint256 expiryDate = now + _expiryDate * 1 days;
        
        certificate storage cert = certificateDetails[_URN];
        cert.certificateBoard = _certificateAuthority;
        cert.levelOfCertificate   = _levelOfCertificate;
        cert.nameOfCertificateHolder = _nameOfCertificateHolder;
        cert.signingAuthority = _signingAuthority;
        cert.issueDateOfCertificate = issueDate;
        cert.expiryDateOfCertificate = expiryDate;
        statusOfCertificate[_URN] = 6;
        
        emit CertificateStored(_URN,now);
    }
    
    // View the stored certificate details
    function GetCertificateDetails(uint256 _URN) public view returns(string memory, string memory, string memory,string memory, uint256,uint256){
        require(isCertificateExists[_URN] == true && statusOfCertificate[_URN] == 6, "Details are NOT yet added");
        certificate memory c = certificateDetails[_URN];
        return(c.certificateBoard,c.levelOfCertificate,c.nameOfCertificateHolder,c.signingAuthority,c.issueDateOfCertificate, c.expiryDateOfCertificate);
    }
    
}