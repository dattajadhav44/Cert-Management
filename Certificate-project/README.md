#a] Clone this Certificate-project repository in your system
#b] cd Certificate-Project
#c] npm install      [ This would download all the dependancies that we have in package.json file.]
#d] node app.js      [ This is start the node js server at 4949 port.]

Once above steps are completed please follow the below steps in order to complete the transaction life cycle.
##Step 1- Deploy contract
Method POST - http://localhost:4949/deploy
{
"arguments": {
"jsonObject": "{\"version\":3,\"id\":\"63c3d620-f473-4628-854c-7f42958262e6\",\"address\":\"45c8ffbf9f1015a984667d183fd60fc8af41b4a5\",\"crypto\":{\"ciphertext\":\"e21c4d91752d1247c171c5646775ec0a1f4ae221208501e2038f3aa48c54c1dc\",\"cipherparams\":{\"iv\":\"4a0d717c5a0bc1e3da8dfa9892478880\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"salt\":\"732095013bcf4189e62686ff242339e7cdcd865808c405d4ad4787683ecf4309\",\"n\":262144,\"r\":8,\"p\":1},\"mac\":\"4a4ed227c8c777e5d81bbd4368e7802a96a2fc322261e507e9e768619be68206\"}}",
"pwd": "Pwd@123"
}
}
--------------------------------------------
##Step 2- Enrollment of the certificates
Method POST - http://localhost:4949/contractFunction
{
"arguments": {
"jsonObject": "{\"version\":3,\"id\":\"63c3d620-f473-4628-854c-7f42958262e6\",\"address\":\"45c8ffbf9f1015a984667d183fd60fc8af41b4a5\",\"crypto\":{\"ciphertext\":\"e21c4d91752d1247c171c5646775ec0a1f4ae221208501e2038f3aa48c54c1dc\",\"cipherparams\":{\"iv\":\"4a0d717c5a0bc1e3da8dfa9892478880\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"salt\":\"732095013bcf4189e62686ff242339e7cdcd865808c405d4ad4787683ecf4309\",\"n\":262144,\"r\":8,\"p\":1},\"mac\":\"4a4ed227c8c777e5d81bbd4368e7802a96a2fc322261e507e9e768619be68206\"}}",
"pwd": "Pwd@123",
"contractAddress":"0x54e49e8be566f4f250314bb2842521b9f909ebd9",
"operation":"EnrollmentOfCertificates",
"URN": 222,
"nameOfCertificate": "12th Certificate",
"ownerOfCertificate": "Steve",
"issuingCertificateAuthority": "New York Board",
"issuedPlace": "New York"
}
}
--------------------------------------------
##Step 3- Display Dashboard URN's Only
Method - POST - http://localhost:4949/contractFunction
{
"arguments": {
"jsonObject": "{\"version\":3,\"id\":\"63c3d620-f473-4628-854c-7f42958262e6\",\"address\":\"45c8ffbf9f1015a984667d183fd60fc8af41b4a5\",\"crypto\":{\"ciphertext\":\"e21c4d91752d1247c171c5646775ec0a1f4ae221208501e2038f3aa48c54c1dc\",\"cipherparams\":{\"iv\":\"4a0d717c5a0bc1e3da8dfa9892478880\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"salt\":\"732095013bcf4189e62686ff242339e7cdcd865808c405d4ad4787683ecf4309\",\"n\":262144,\"r\":8,\"p\":1},\"mac\":\"4a4ed227c8c777e5d81bbd4368e7802a96a2fc322261e507e9e768619be68206\"}}",
"pwd": "Pwd@123",
"contractAddress":"0x54e49e8be566f4f250314bb2842521b9f909ebd9",
"operation":"DisplayDashboardURNs"
}
}
---------------------------------------------
##Step 4- Select and Look for certificate
Method - POST - http://localhost:4949/contractFunction
{
"arguments": {
"jsonObject": "{\"version\":3,\"id\":\"63c3d620-f473-4628-854c-7f42958262e6\",\"address\":\"45c8ffbf9f1015a984667d183fd60fc8af41b4a5\",\"crypto\":{\"ciphertext\":\"e21c4d91752d1247c171c5646775ec0a1f4ae221208501e2038f3aa48c54c1dc\",\"cipherparams\":{\"iv\":\"4a0d717c5a0bc1e3da8dfa9892478880\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"salt\":\"732095013bcf4189e62686ff242339e7cdcd865808c405d4ad4787683ecf4309\",\"n\":262144,\"r\":8,\"p\":1},\"mac\":\"4a4ed227c8c777e5d81bbd4368e7802a96a2fc322261e507e9e768619be68206\"}}",
"pwd": "Pwd@123",
"contractAddress":"0x54e49e8be566f4f250314bb2842521b9f909ebd9",
"operation":"LookForCertificate",
"URN": 111
}
}
--------------------------------------------
##Step 5- Send off line request
Method - POST - http://localhost:4949/contractFunction
{
"arguments": {
"jsonObject": "{\"version\":3,\"id\":\"63c3d620-f473-4628-854c-7f42958262e6\",\"address\":\"45c8ffbf9f1015a984667d183fd60fc8af41b4a5\",\"crypto\":{\"ciphertext\":\"e21c4d91752d1247c171c5646775ec0a1f4ae221208501e2038f3aa48c54c1dc\",\"cipherparams\":{\"iv\":\"4a0d717c5a0bc1e3da8dfa9892478880\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"salt\":\"732095013bcf4189e62686ff242339e7cdcd865808c405d4ad4787683ecf4309\",\"n\":262144,\"r\":8,\"p\":1},\"mac\":\"4a4ed227c8c777e5d81bbd4368e7802a96a2fc322261e507e9e768619be68206\"}}",
"pwd": "Pwd@123",
"contractAddress":"0x54e49e8be566f4f250314bb2842521b9f909ebd9",
"operation":"SendOffLineRequest",
"URN": 111
}
}
--------------------------------------------
##Step 6- Check if certificate is valid
Method - POST - http://localhost:4949/contractFunction
{
"arguments": {
"jsonObject": "{\"version\":3,\"id\":\"63c3d620-f473-4628-854c-7f42958262e6\",\"address\":\"45c8ffbf9f1015a984667d183fd60fc8af41b4a5\",\"crypto\":{\"ciphertext\":\"e21c4d91752d1247c171c5646775ec0a1f4ae221208501e2038f3aa48c54c1dc\",\"cipherparams\":{\"iv\":\"4a0d717c5a0bc1e3da8dfa9892478880\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"salt\":\"732095013bcf4189e62686ff242339e7cdcd865808c405d4ad4787683ecf4309\",\"n\":262144,\"r\":8,\"p\":1},\"mac\":\"4a4ed227c8c777e5d81bbd4368e7802a96a2fc322261e507e9e768619be68206\"}}",
"pwd": "Pwd@123",
"contractAddress":"0x54e49e8be566f4f250314bb2842521b9f909ebd9",
"operation":"IsCertificateValid",
"URN": 111
}
}
--------------------------------------------
##Step 7- Attest certificate
Method- POST - http://localhost:4949/contractFunction
{
"arguments": {
"jsonObject": "{\"version\":3,\"id\":\"63c3d620-f473-4628-854c-7f42958262e6\",\"address\":\"45c8ffbf9f1015a984667d183fd60fc8af41b4a5\",\"crypto\":{\"ciphertext\":\"e21c4d91752d1247c171c5646775ec0a1f4ae221208501e2038f3aa48c54c1dc\",\"cipherparams\":{\"iv\":\"4a0d717c5a0bc1e3da8dfa9892478880\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"salt\":\"732095013bcf4189e62686ff242339e7cdcd865808c405d4ad4787683ecf4309\",\"n\":262144,\"r\":8,\"p\":1},\"mac\":\"4a4ed227c8c777e5d81bbd4368e7802a96a2fc322261e507e9e768619be68206\"}}",
"pwd": "Pwd@123",
"contractAddress":"0x54e49e8be566f4f250314bb2842521b9f909ebd9",
"operation":"AttestCertificate",
"URN": 111
}
}
---------------------------------------------
##Step 8- Finally add certificate to Blockchain
Method- POST - http://localhost:4949/contractFunction
{
"arguments": {
"jsonObject": "{\"version\":3,\"id\":\"63c3d620-f473-4628-854c-7f42958262e6\",\"address\":\"45c8ffbf9f1015a984667d183fd60fc8af41b4a5\",\"crypto\":{\"ciphertext\":\"e21c4d91752d1247c171c5646775ec0a1f4ae221208501e2038f3aa48c54c1dc\",\"cipherparams\":{\"iv\":\"4a0d717c5a0bc1e3da8dfa9892478880\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"salt\":\"732095013bcf4189e62686ff242339e7cdcd865808c405d4ad4787683ecf4309\",\"n\":262144,\"r\":8,\"p\":1},\"mac\":\"4a4ed227c8c777e5d81bbd4368e7802a96a2fc322261e507e9e768619be68206\"}}",
"pwd": "Pwd@123",
"contractAddress":"0x54e49e8be566f4f250314bb2842521b9f909ebd9",
"operation":"AddCertificateDetails",
  "URN": 111,
  "certificateBoard": "Pune",
	"levelOfCertificate": "Graduate",
	"nameOfCertificateHolder": "Dattatray",
	"signingAuthority": "President",
	"issueDateOfCertificate": 123,
	"expiryDateOfCertificate": 888
}
}
---------------------------------------------
##Step 9- See if the certificate is added successfully or NOT
Method- POST - http://localhost:4949/contractFunction
{
"arguments": {
"jsonObject": "{\"version\":3,\"id\":\"63c3d620-f473-4628-854c-7f42958262e6\",\"address\":\"45c8ffbf9f1015a984667d183fd60fc8af41b4a5\",\"crypto\":{\"ciphertext\":\"e21c4d91752d1247c171c5646775ec0a1f4ae221208501e2038f3aa48c54c1dc\",\"cipherparams\":{\"iv\":\"4a0d717c5a0bc1e3da8dfa9892478880\"},\"cipher\":\"aes-128-ctr\",\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"salt\":\"732095013bcf4189e62686ff242339e7cdcd865808c405d4ad4787683ecf4309\",\"n\":262144,\"r\":8,\"p\":1},\"mac\":\"4a4ed227c8c777e5d81bbd4368e7802a96a2fc322261e507e9e768619be68206\"}}",
"pwd": "Pwd@123",
"contractAddress":"0x54e49e8be566f4f250314bb2842521b9f909ebd9",
"operation":"GetCertificateDetails",
"URN": 111
}
}
-----------------------------------------------------------
