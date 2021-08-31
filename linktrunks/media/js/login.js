$(document).ready(function() {

    

    $('#loginButton').click( function () {


        //alert(localStorage.getItem("markme_var"));


    var username=$("#username").val();
    var password=$("#password").val();
    //alert(username+" "+password);
      
    var loginData={'username':username,'password':password};

    apiurl="/auth/token/create/";
    method="POST";
      
    $.ajax({
        type: method,
        url: apiurl,
        data:loginData, 
        success: function(data){
            //data.auth_token;
            //sessionStorage.setItem("markme_var", data.auth_token);
            localStorage.setItem("markme_var", data.auth_token);
            window.location.href="/"; 
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
              $(".form-group").addClass("has-error");
              $("#errorLabel").show();

              //alert("Wrong credentials");
            }
        }
    });

        
    });


});
