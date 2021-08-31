//------------------------- Verify Token --------------------------
function firstScript(){
    token=localStorage.getItem("markme_var");


    apiurl="https://vps33281.ovh.net:8888/auth/me/";
    method="GET";


    $.ajax({
        type: method,
        url: apiurl,
        beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization","Token "+token);
        },
        success: function(data){
                    
        },
        statusCode: {
            401: function() {
                window.location.href="login.html"; 
            }
        },
        failure: function(errMsg) {
            return "ko";
        }
    });
}
