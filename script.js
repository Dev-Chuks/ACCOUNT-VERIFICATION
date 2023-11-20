/* This listens to all the events that will be taking place in the html such as clkcking, moving the mouse 
   selecting bank , fetching data etc it will pick up this event and push it to our html
   javascript makes web pages smart so the addEventListener is what detext what we are doind and push it to 
*/ 
/* the DOM (Document Object Model) is what majes this possible to sense the events or actions the clients 
    is taking and processing it with the code you have written
*/
document.addEventListener("DOMContentLoaded", function(){
    fetchBanks()
    verifyAccount()

});

// This function establish where the data will be coming from and links it to our code 
function fetchBanks(){
    fetch("https://api.paystack.co/bank",{

     method: "GET",

     // the header is where we put the key we aer fetching from teh api. the authorization key will be 
     //inside the header just as it is below. this key is what links your code to thier api
     headers: {
        Authorization: "sk_test_60dbd32be0f8b3d20505bbc738f1d6bef98f2a0b",
     },
    })

    /* promise (.then) is a prommise to return to do something 
     the information the promise is getting from the api ,it should save it as json(javascipt objected
     notation)
    */
    .then((response) => response.json()) //response.json is what is been called. the file response.json
    // has been downloaded by this function. this function is called arrow function

    .then((data) => {

        const selectBank = document.getElementById('bank');
        data.data.forEach((bank) =>{

            const option = document.createElement('option');

            option.value = bank.code;
            option.text = bank.name;

            selectBank.appendChild(option);
        } );
       
    })
.catch((error) => console.error("fetching bank error", error));
}


function verifyAccount(){

    const codeBank= document.getElementById("bank").value;
    const accountNumber = document.getElementById("account").value;

/* The constructed url is used to make http request to the  paystack api to resolve bank details based on 
the account the client provided for us. Any string that is embedded within the ${} is called template
literal */ 

// The resolve? in the code below is used to tell teh api to resolve the parameters provided below which 
// are accountNumber and codebank
    const apiUrl = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&code_bank=${codeBank}`;

    const options = {
        method: "GET",

        headers: {
            Authorization: "sk_test_60dbd32be0f8b3d20505bbc738f1d6bef98f2a0b",
         },
    };

    fetch(apiUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the verification response
      console.log(data);
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error verifying account:", error);
    });
}
   