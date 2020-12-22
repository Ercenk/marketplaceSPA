// Select DOM elements to work with
const welcomeDiv = document.getElementById("welcomeMessage");
const signInButton = document.getElementById("signIn");
const signOutButton = document.getElementById('signOut');
const cardDiv = document.getElementById("card-div");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");

function showWelcomeMessage(account) {
  // Reconfiguring DOM elements
  cardDiv.style.display = 'initial';
  welcomeDiv.innerHTML = `Welcome ${account.username}`;
  signInButton.nextElementSibling.style.display = 'none';
  signInButton.setAttribute("onclick", "signOut();");
  signInButton.setAttribute('class', "btn btn-success")
  signInButton.innerHTML = "Sign Out";
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
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
}

async function callResolve(token) {
  let text = await( await fetch('/api/ResolveSubscription?token=' + token)).text();
  document.querySelector('#name').textContent = text;
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
});