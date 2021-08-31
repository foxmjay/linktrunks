$(document).ready(function() {

    

    $('#registerButton').click( function () {

        //alert(localStorage.getItem("markme_var"));

        

    var username=$("#username").val();
    var email=$("#email").val();
    var password=$("#password").val();
    var confirmPassword=$("#confirmPassword").val();
    //alert(username+" "+password);
    //alert(isEmail(email));
    if(!isEmail(email)){
        $("#email_div").addClass("has-error");
        $("#errorLabel_email").show();
    }else{
        $("#email_div").removeClass("has-error");
        $("#errorLabel_email").hide();    }

    if(password != confirmPassword){
        $("#password_div").addClass("has-error");
        $("#confirmPassword_div").addClass("has-error");
        //$("#errorLabel_pass").addClass("has-error");
        $("#errorLabel_pass").show();
        $("#errorLabel_user").hide();
        return;
    }else{
        $("#errorLabel_pass").hide();
        $("#password_div").removeClass("has-error");
        $("#confirmPassword_div").removeClass("has-error");
        //$("#errorLabel_pass").removeClass("has-error");
    }


      
    var loginData={'username':username,'password':password,'email':email};

    apiurl="/auth/users/create/";
    method="POST";
      
    $.ajax({
        type: method,
        url: apiurl,
        data:loginData, 
        success: function(data){
            //data.auth_token;
            //sessionStorage.setItem("markme_var", data.auth_token);
            localStorage.removeItem("markme_var");
            window.location.href="/login/"; 
            //alert(sessionStorage.getItem("markme_var"));
        },
        failure: function(errMsg) {
            alert(errMsg);
            localStorage.removeItem("markme_var");
            return ko;
        },
        statusCode: {
            400: function() {
              localStorage.removeItem("markme_var");
              $("#username_div").addClass("has-error");
              //$("#email_div").addClass("has-error");
              $("#errorLabel_user").addClass("has-error");
              $("#errorLabel_user").show();

              //alert("Wrong credentials");
            }
        }
    });

        
    });


});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
