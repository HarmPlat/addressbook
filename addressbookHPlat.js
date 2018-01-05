//JavaScript addressbook CodeGorilla ver1.0 2017-12
// NB: localstorage can only store strings, not arrays

window.onload = function (){ 
  // Buttons
  var quickAddBtn = document.getElementById("QuickAdd");
  var AddBtn = document.getElementById("Add");
  var cancelBtn = document.getElementById("Cancel");
  var quickAddFormDiv = document.querySelector('.quickaddForm');
  //document.getElementByClassName('.quickaddForm')[0];

  // Form fields  
  var fullname = document.getElementById("fullname");
  var phone = document.getElementById("phone");
  var address = document.getElementById("address");
  var city = document.getElementById("city");
  var email = document.getElementById("email");

  //Address Book Display
  var addBookDiv = document.querySelector(".addbook");

  //Create storage array
  var addressBook = [];

  //Event listeners
  quickAddBtn.addEventListener("click", function(){
    quickAddFormDiv.style.display = "block";
  });

cancelBtn.addEventListener("click", function(){
  quickAddFormDiv.style.display = "none";
});

AddBtn.addEventListener("click", addToBook);

addBookDiv.addEventListener("click", removeEntry);

// constructor variable
function jsonStructure(fullname,phone,address,city,email){
	this.fullname = fullname;
	this.phone = phone;
	this.address = address;
	this.city = city;
	this.email = email;
}

function addToBook(){
  var isNull = fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' && email.value!='';
  if(isNull){
  //Add the contents of the form to the array & localstorage
  //var obj = {"fullname": "Harm Plat", "phone":"0614111479", "address":"Lorentzstraat 1b", 
  //"city":"Groningen", "email":"harm.plat@gmail.com"};
    var obj = new jsonStructure(fullname.value, phone.value, address.value, city.value, email.value);
	// push objects into the array
    addressBook.push(obj);
    localStorage['addbook'] = JSON.stringify(addressBook);
	//Hide the form panel
	quickAddFormDiv.style.display = "none";
	//Clear the form (after it has been filled in and added to the array)
	clearForm();
	//Updating & Displaying all records in the addressbook
	showAddressBook();
  }
}

function removeEntry(e){
if(e.target.classList.contains("delbutton")){
	var remID = e.target.getAttribute("data-id");
	// Remove the JSON entry from the array with the index num = remID;
	addressBook.splice(remID, 1);
	localStorage['addbook'] = JSON.stringify(addressBook);
	showAddressBook();
}	
}

function clearForm(){
	var frm = document.querySelectorAll(".formFields");
	for(var i in frm){
	  frm[i].value = '';	
	}
}

function showAddressBook(){
	//check if the key 'addbook' exists in localStorage or else create it  
	// if it exists, load contents from the localStorage and loop > display it on the page
	if(localStorage['addbook'] === undefined){
	localStorage['addbook'] = "[]";
	} else {
		addressBook = JSON.parse(localStorage['addbook']);
        addBookDiv.innerHTML = '';
        for(var n in addressBook){
	    var str = '<div class="entry">';
	        str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
	        str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
	        str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
	        str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
	        str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
	        str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
	        str += '</div>';
	        addBookDiv.innerHTML += str;
        }		
	}
}

showAddressBook ();
}

