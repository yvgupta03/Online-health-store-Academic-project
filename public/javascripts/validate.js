window.onload = function(){

    //there will be one span element for each input field
    // when the page is loaded, we create them and append them to corresponding input elements 
	// they are initially empty and hidden

    
    
    var datepick = document.getElementById("birthdate");
    var span4 = document.createElement("span"); 
    dateNotification(datepick,span4);

    var phone = document.getElementById("phone");
    var span5 = document.createElement("span"); 
    phoneNotification(phone,span5);

    var address = document.getElementById("address");
    var span6 = document.createElement("span"); 
    addressNotification(address,span6);

    var admin = document.getElementById("admin");
    var span7 = document.createElement("span"); 
    adminKeyNotification(admin,span7);

	var email = document.getElementById("email");
    var span1 = document.createElement("span");
    emailNotification(email,span1);
    
    var pass = document.getElementById("pwd");
    var span2 = document.createElement("span");    
    var passConfirm = document.getElementById("confirm");
    var span3 = document.createElement("span");
    passwordNotification(pass, span2, passConfirm, span3);    
    
    var form = document.getElementById("myForm");
    form.onsubmit = function(e){
    	let successfulValidation = false; //default set to invalid variable

        //if any one validation false then call e.preventDefault below
        successfulValidation = validateEmail(email, span1) && validatePassword(pass, span2) && validateConfirmPassword(pass, passConfirm, span2, span3);
        
        if(successfulValidation==false)
        {
            e.preventDefault();
        }
    }
}

function adminKeyNotification(admin,span7){
    span7.style.display = "none"; //hide the span element
    admin.parentNode.appendChild(span7);

    admin.onfocus = function(){
        span7.setAttribute("class", "");
        admin.classList.remove("error");
        span7.textContent= "Enter admin key to register as administrator for privileged access (optional field).";
        span7.style.display="block";
    }

    admin.onblur = function(){
        span7.style.display = "none";
    }
}

function addressNotification(address,span6){
    span6.style.display = "none"; //hide the span element
    address.parentNode.appendChild(span6);

    address.onfocus = function(){
        span6.setAttribute("class", "");
        address.classList.remove("error");
        span6.textContent= "Must be filled in 80 charachters.";
        span6.style.display="block";
    }

    address.onblur = function(){
        span6.style.display = "none";
    }
}

function phoneNotification(phone,span5){
    span5.style.display = "none"; //hide the span element
    phone.parentNode.appendChild(span5);

    phone.onfocus = function(){
        span5.setAttribute("class", "");
        phone.classList.remove("error");
        span5.textContent= "Must be filled in example format: 972-569-1958";
        span5.style.display="block";
    }

    phone.onblur = function(){
        span5.style.display = "none";
    }
}

function dateNotification(datepick,span4)
{
    span4.style.display = "none";
    datepick.parentNode.appendChild(span4);

    datepick.onfocus=function(){
        span4.setAttribute("class", "");
        datepick.classList.remove("error");
        span4.textContent= "Must be born on or before 2003, age 18+ only as application involves monetary transactions. ";
        span4.style.display="block";
    }

    datepick.onblur = function(){
        span4.style.display = "none";
    }
    
}


function emailNotification(email, span1)
{
    
    span1.style.display = "none"; //hide the span element
    email.parentNode.appendChild(span1);

    email.onfocus = function(){
        span1.setAttribute("class", "");
        email.classList.remove("error");
        span1.textContent= "Should be a valid email address with <prefix>@<domain_part1>.<domain_part2> format Eg-axyfall21@utd.edu";
        span1.style.display="block";
    }

    email.onblur = function(){
        span1.style.display = "none";
    }
}

function passwordNotification(pass, span2, passConfirm, span3)
{
    
    span2.style.display = "none";
    pass.parentNode.appendChild(span2);

    span3.style.display = "none";
    passConfirm.parentNode.appendChild(span3);

    //password notification
    pass.onfocus = function(){
        span2.classList.remove("error");
        pass.classList.remove("error");

        span3.classList.remove("error");        //Does not throw error for starting case where class not defined for elements
        passConfirm.classList.remove("error");  //Using this to keep both pass and confirm pass in sync
        
        span2.textContent= "Required atleast six characters. Atleast 1 from uppercase, number and special characters (!,@,#,$,%,^,&,*,+).";
        span2.style.display="block";
    }

    pass.onblur = function(){
        span2.style.display = "none";
    }

    //confirmation notification
    passConfirm.onfocus = function(){
        span3.classList.remove("error");
        passConfirm.classList.remove("error");
        
        span2.classList.remove("error");         //Does not throw error for starting case where class not defined for elements
        pass.classList.remove("error");         //Using this to keep both pass and confirm pass in sync

        span3.textContent= "Must match above filled password for confirmation.";
        span3.style.display="block";
    }

    passConfirm.onblur = function(){
        span3.style.display = "none";
    }
}


function validateEmail(email, span1)
{
    let regexPattern = /^\w+([\.]?\w+)*@\w+[\.]\w+$/; //as per question, prefix@domain1.domain2
    let flag1 = false; //Keeping invalid by default to check validity as follows
    if(!regexPattern.test(email.value))
    {

        span1.textContent="Invalid email-id. Fill in correctly to submit.";
        span1.style.display="block";
        email.classList.add("error");
        span1.setAttribute("class", "error"); // to remove certain classes, need to update the value to "" by calling this method again
        //there are other methods apart from setAttribute like className, classList to update class names
    }
    else
    {
        span1.style.display="none";
        span1.setAttribute("class", "");
        email.classList.remove("error"); //using add/remove because CSS form classes also to be mentioned in setAttribute approach
        flag1 = true;
    }
    return flag1;
}

function validatePassword(pass, span2)
{
    let regexPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\+])(?=.{6,})/; //1Upper,1num,1sp. with 6 at least as per question
    let flag2 = false;
    if(!regexPattern.test(pass.value))
    {

        span2.textContent="Invalid password. Fill in correctly to submit.";
        span2.style.display="block";
        pass.classList.add("error");
        span2.classList.add("error"); 
    }
    else
    {
        span2.style.display="none";
        span2.classList.remove("error");
        pass.classList.remove("error"); 
        flag2 = true;
    }
    return flag2;
}

function validateConfirmPassword(pass, passConfirm, span2, span3)
{
    let flag3 = false;
    if(pass.value == passConfirm.value)
    {
        span2.style.display="none";
        span2.classList.remove("error");
        pass.classList.remove("error");

        span3.style.display="none";
        span3.classList.remove("error");
        passConfirm.classList.remove("error"); 
        
        flag3 = true;
    }
    else
    {
        span2.textContent="Passwords do not match - Confirmation failed. Try again.";
        span2.style.display="block";
        pass.classList.add("error");
        span2.classList.add("error"); 

        span3.textContent="Passwords do not match - Confirmation failed. Try again.";
        span3.style.display="block";
        passConfirm.classList.add("error");
        span3.classList.add("error"); 
    }
    return flag3;
}
