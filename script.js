function updateDateTime()
{
    const now = new Date();
    document.getElementById("datetime").textContent = now.toLocaleString();
}

updateDateTime();
setInterval(updateDateTime, 1000);

//used https://stackoverflow.com/questions/23994748/display-the-current-date-and-time-using-html-and-javascript-with-scrollable-effe

function checkpass()
{
    if (!validateDOB())
    {
        return false;
    }

    let userid = document.getElementById("userid").value.toUpperCase();
    let fname = document.getElementById("fname").value.toUpperCase();
    let lname = document.getElementById("lname").value.toUpperCase();
    let pass = document.getElementById("password").value;
    let repass = document.getElementById("repassword").value;
    
    let upperpass = pass.toUpperCase();
    //check for upper and lowercase letters, check for numbers, check for special character
    if (pass.includes('"') || pass.includes("'"))
    {
        alert("Password cannot contain quotes.");
        return false;
    }

    if(upperpass.includes(fname) || upperpass.includes(lname))
    {
        alert("Password cannot contain your first or last name.");
        return false;
    }

    if(upperpass === userid.toUpperCase())
    {
        alert("Password cannot be the same as UserID.");
        return false;
    }

    if(upperpass.includes(userid))
    {
        alert("Password cannot contain your UserID.");
        return false;
    }

    if(!/[A-Z]/.test(pass))
    {
        alert("Password must contain at least one uppercase letter.");
        return false;
    }

    if(!/[a-z]/.test(pass))
    {
        alert("Password must contain at least one lowercase letter.");
        return false;
    }

    if(!/\d/.test(pass))
    {
        alert("Password must contain at least one number.");
        return false;
    }

    if(!/[!@#$%^&*()_\-+=\/<>.,`~]/.test(pass))
    {
        alert("Password must contain at least one special character.");
        return false;
    }

    if(pass !== repass)
    {
        alert("Passwords do not match.");
        return false;
    }

    return true;
}

function finalUserID()
{

    let input = document.getElementById("userid");
    input.value = input.value.toUpperCase();
    //userid cannot begin with a number
    if(/^\d/.test(input.value))
    {
        alert("User ID cannot begin with a number.");
        return false;
    }
    //userid can only cintain letters, numbers, dash, and underscore
    if(!/^[A-Z0-9_ -]+$/.test(input.value))
    {
        alert("User ID can only contain letters, numbers, dash, and underscore.");
        return false;
    }

    return true;
}

function reviewinput()
//putting input into a form that can be read by html/ fixing the way it will be displayed/combined
{
    const form = document.querySelector("form");
    //do the same thing that the submit button does, but without submitting the form
    if (!form.reportValidity()) 
    {
        return false;
    }
    document.getElementById("reviewSection").style.display = "block";
    //put name together
    let fname = capitalizeName(document.getElementById("fname").value);
    let mname = capitalizeName(document.getElementById("mname").value);
    let lname = capitalizeName(document.getElementById("lname").value);

    
    document.getElementById("rname").innerHTML = fname + " " + mname + " " + lname;

    //DOB
    document.getElementById("rDOB").innerHTML = document.getElementById("dob").value;

    //SSN
    document.getElementById("rSSN").innerHTML = document.getElementById("ssn").value;

    //email
    document.getElementById("remail").innerHTML = document.getElementById("emailaddr").value;

    //phone
    document.getElementById("rphone").innerHTML = document.getElementById("phone").value;

    //put address together
    let address =
    document.getElementById("addrone").value + ", " +
    document.getElementById("city").value + ", " +
    document.getElementById("state").value + " " +
    document.getElementById("zip").value;

    document.getElementById("raddress").innerHTML = address;

    //emergency contct
    document.getElementById("remergency").innerHTML = document.getElementById("contactname").value +
    " (" + document.getElementById("contactnum").value + ") ";

    //reason
    document.getElementById("rreason").innerHTML = document.getElementById("reason").value;

    //gender
    let gender = document.querySelector('input[name="gender"]:checked');
    if(gender)
    {
        document.getElementById("rgender").innerHTML = gender.value;
    }

    //insured
    let insured = document.querySelector('input[name="insured"]:checked');
    if(insured)
    {
        document.getElementById("rinsured").innerHTML = insured.value;
    }

    //heard
    let heard = document.querySelector('input[name="heard"]:checked');
    if(heard)
    {
        document.getElementById("rheard").innerHTML = heard.value;
    }
    //validate every field before allowing to submit
    if(!checkpass() || !validateDOB() || !finalUserID() || !validateEmail() || !validateLengthFn() || !validateLengthMn() || !validateLengthLn() || !validateLengthAddr() || !validateLengthAddrTwo() || !validateLengthCity() || !validateLengthCitytwo() || !validateLengthZip() || !validateLengthZiptwo() || !validateLengthUserID())
    {
        alert("Please correct the errors in the form before submitting.");
        return false;
    }
    else
    {   
        document.getElementById("SubmitBtn").style.display = "inline";
        return true;
    }
}

function capitalizeName(str)
{
    str = str.trim();
    if (str.length === 0) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function validateDOB()
{
    const today = new Date();
    const dob = new Date(document.getElementById("dob").value);

    const oldest = new Date();
    oldest.setFullYear(today.getFullYear()-120);

    if (dob > today)
    {
        alert("Date of birth cannot be in the future.")
        return false;
    }

    if (dob < oldest)
    {
        alert("Date of birth cannot be more than 120 years ago.")
        return false;
    }
    return true;
}

function updateFeeling()
{
    let value = document.getElementById("feeling").value;
    document.getElementById("feelingNum").innerHTML = Number(value).toLocaleString();
}

function charactersOnly(input)
{
    //letters only
    if (input.length > 0 && !/^[A-Za-z]+$/.test(input))
    {
        alert("Only letters are allowed.");
        return false;
    }
    return true;
}

function lettersOnly(input)
{
    //letters, apostrophes, and dashes only
    let regex = /^[A-Za-z'-]+$/;
    return regex.test(input);
}

function SSNFormat()
{
    //format SSN as user types
    let ssn = document.getElementById("ssn");
    let value = ssn.value.replace(/\D/g, "");

    if (value.length > 9)
        value = value.substring(0, 9);

    if (value.length > 5)
        value = value.substring(0,3) + "-" + value.substring(3,5) + "-" + value.substring(5);
    else if (value.length > 3)
        value = value.substring(0,3) + "-" + value.substring(3);

    ssn.value = value;
}

function phoneFormat()
{
    //format phone number as user types
    let phone = document.getElementById("phone");
    let value = phone.value.replace(/\D/g, '');

    if (value.length > 10)
        value = value.substring(0, 10);

    if (value.length > 6)
        value = value.substring(0, 3) + "-" + value.substring(3, 6) + "-" + value.substring(6, 10);
    else if (value.length > 3)
        value = value.substring(0, 3) + "-" + value.substring(3, 6);
    
    phone.value = value;
}

function ContactNumFormat()
{
    //format emergency contact number as user types
    let contactnum = document.getElementById("contactnum");
    let value = contactnum.value.replace(/\D/g, '');

    if (value.length > 10)
        value = value.substring(0, 10);

    if (value.length > 6)
        value = value.substring(0, 3) + "-" + value.substring(3, 6) + "-" + value.substring(6, 10);
    else if (value.length > 3)
        value = value.substring(0, 3) + "-" + value.substring(3, 6);
    
    contactnum.value = value;
}   

function validateEmail()
{
    let email = document.getElementById("emailaddr").value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;        
    if (!emailPattern.test(email))
    {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}

function validateLengthFn()
{
    let fname = document.getElementById("fname").value;
    //fname must be 1-30 characters
    if (fname.length < 1 || fname.length > 30)
    {
        alert("First name must be between 1 and 30 characters.");
        return false;
    }

    if (!lettersOnly(fname))
    {
        alert("First name can only contain letters, apostrophes, and dashes.");
        return false;
    }

    return true;
}

function validateLengthMn()
{
    let mname = document.getElementById("mname").value;
    //mnane must be 0-1 characters
    if (mname.length > 1)
    {
        alert("Middle initial must be 1 character or less.");
        return false;
    }

    if (!charactersOnly(mname))
    {
        alert("Middle initial can only contain letters.");
        return false;
    }

    return true;
}

function validateLengthLn()
{
    let lname = document.getElementById("lname").value;
    //lname must be 1-30 characters
    if (lname.length < 1 || lname.length > 30)
    {
        alert("Last name must be between 1 and 30 characters.");
        return false;
    }

    if (!lettersOnly(lname))
    {
        alert("Last name can only contain letters, apostrophes, and dashes.");
        return false;
    }
    
    return true;
}

function validateLengthAddr()
{
    let addrone = document.getElementById("addrone").value;
    //must be 2-30 characters
    if (addrone.length < 2 || addrone.length > 30)
    {
        alert("Address must be between 2 and 30 characters.");
        return false;
    }
    return true;
}

function validateLengthAddrTwo()
{
    let addrtwo = document.getElementById("addrtwo").value;
    //if entered, must be 2-30 characters
    if (addrtwo.length > 0 && (addrtwo.length < 2 || addrtwo.length > 30))
    {
        alert("Address line 2 must be between 2 and 30 characters.");
        return false;
    }
    return true;
}

function validateLengthCity()
{
    let city = document.getElementById("city").value;
    //must be 2-30 characters
    if (city.length < 2 || city.length > 30)
    {
        alert("City must be between 2 and 30 characters.");
        return false;
    }
    return true;
}

function validateLengthCitytwo()
{
    let citytwo = document.getElementById("citytwo").value;
    //if entered, must be 2-30 characters
    if (citytwo.length > 0 && (citytwo.length < 2 || citytwo.length > 30))
    {
        alert("City line 2 must be between 2 and 30 characters.");
        return false;
    }
    return true;
}

function validateLengthZip()
{
    let zip = document.getElementById("zip").value;
    //must be 5 digits
    if (!/^\d{5}$/.test(zip))
    {
        alert("Zip code must be 5 digits.");
        return false;
    }
    return true;
}

function validateLengthZiptwo()
{
    let ziptwo = document.getElementById("ziptwo").value;
    //if entered, must be 5 digits
    if (ziptwo.length > 0 && !/^\d{5}$/.test(ziptwo))
    {
        alert("Zip code line 2 must be 5 digits.");
        return false;
    }
    return true;
}

function validateLengthUserID()
{
    let userid = document.getElementById("userid").value;
    //must be 5-12 characters
    if (userid.length < 5 || userid.length > 12)
    {
        alert("User ID must be between 5 and 12 characters.");
        return false;
    }
    return finalUserID();
    
}