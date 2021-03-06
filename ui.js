// Select DOM elements to work with
const welcomeDiv = document.getElementById("welcomeMessage");
const signInButton = document.getElementById("signIn");
const signOutButton = document.getElementById('signOut');
const cardDiv = document.getElementById("card-div");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");
const claimsDiv = document.getElementById("claims-div");
const resolveDiv = document.getElementById("resolve-div");
const tokenDiv = document.getElementById("token-div");
const resolveCard = document.getElementById("resolve-card");
const reloadWithTokenButton = document.getElementById("reloadWithTokenButton");
const tokenText = document.getElementById("token-input");

function showWelcomeMessage(account) {
  // Reconfiguring DOM elements
  cardDiv.style.display = 'initial';
  welcomeDiv.innerHTML = `Welcome ${account.username}`;
  signInButton.nextElementSibling.style.display = 'none';
  signInButton.setAttribute("onclick", "signOut();");
  signInButton.setAttribute('class', "btn btn-success")
  signInButton.innerHTML = "Sign Out";

  const name = document.createElement('p');
  name.innerHTML = `<strong>Name: </strong> ${account.name}`;
  const userName = document.createElement('p');
  userName.innerHTML = `<strong>User name: </strong>${account.username}`;
  claimsDiv.appendChild(name);
  claimsDiv.appendChild(userName);
  claimsDiv.style.display = "";
}

function updateUI(data, endpoint) {
  console.log('Graph API responded at: ' + new Date().toString());

  if (endpoint === graphConfig.graphMeEndpoint) {
    const title = document.createElement('p');
    title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
    const phone = document.createElement('p');
    phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
    const address = document.createElement('p');
    address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
    profileDiv.appendChild(title);
    profileDiv.appendChild(phone);
    profileDiv.appendChild(address);
    profileDiv.style.display = "";
  } 
}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          //return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          return sParameterName[1];
      }
  }
}

async function callResolve(token) {
  let text = await( await fetch('/api/ResolveSubscription?token=' + token)).text();

  const resolveDetails = document.createElement('p');
  resolveDetails.innerHTML = text;
  resolveDiv.appendChild(resolveDetails);
  resolveDiv.style.display = "";
  // document.querySelector('#resolveResult').innerHTML = text;
}

function reloadWithToken(){
  var link=document.createElement("a");
  link.style.cssText = "display: none";
  link.id = 'indexWithToken'; //give it an ID!
  link.href= location.protocol + '//' + location.host + location.pathname + "?token=" + tokenText.value;
  tokenDiv.appendChild(link);
  document.getElementById(link.id).click();
}

$(document).ready(async function(){
  const currentAccounts = myMSALObj.getAllAccounts();
  if (!currentAccounts || currentAccounts.length < 1) {
      signIn("loginPopup").then;
  } 

  let token = getUrlParameter('token');
  if (token){
   await callResolve(token); 
  }
  else {
    tokenDiv.style.display = "";
  }
});