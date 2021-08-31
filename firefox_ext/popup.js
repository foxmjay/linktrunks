

//-------------------- check if token still valid ---------------
function checkToken(api,token,callback){

   /*chrome.storage.local.get(['token'], function(result) {
         alert(result.token);
   });*/

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState == 4 ) {
            callback(this);
        }
      };

    //alert(token);
    xmlhttp.open("GET",api);
    //xmlhttp.setRequestHeader("Authorization", "Token f2c47579d04163e5a67bc9ab81063f12c55d502c");
    xmlhttp.setRequestHeader("Authorization", "Token "+token);
    xmlhttp.send();

}
//-----------------------------------------------------------------


function destoryToken(api,token,callback){

   /*chrome.storage.local.get(['token'], function(result) {
         alert(result.token);
   });*/

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState == 4 ) {
            callback(this);
        }
      };

    //alert(token);
    xmlhttp.open("POST",api);
    //xmlhttp.setRequestHeader("Authorization", "Token f2c47579d04163e5a67bc9ab81063f12c55d502c");
    xmlhttp.setRequestHeader("Authorization", "Token "+token);
    xmlhttp.send();

}


function bookmarkApiRequest(api,token,data,callback){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState == 4 ) {
            callback(this);
        }
      };

    xmlhttp.open("POST",api,"/json-handler",true);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8 "+ " Authorization", "Token "+token);
    xmlhttp.setRequestHeader("Authorization", "Token "+token);
    xmlhttp.send(JSON.stringify(data));

}


function bookmarkPopup(){

   var bookmarkForm = document.getElementById("bookmarkForm");
   bookmarkForm.style.display="block"; // hide bookmark form
   var errorMsgDiv = document.getElementById("errorMsgDiv");
   errorMsgDiv.style.display ="none";  // hide error div
   var yb_time = document.getElementById("yb_time");
   yb_time.style.display ="none";  // hide remove time checkbox form


   var tagsList = [];
   var title;
   var url;

   browser.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    title = tabs[0].title;
    url = tabs[0].url;
    document.getElementById('title').value=title;
    document.getElementById('url').value=url;



    if(url.includes("youtube")){

      var yb_time = document.getElementById("yb_time");
      yb_time.style.display ="block";  // show remove time checkbox form
  
        let msg = {
        txt : "hello"
        }
  
        var ybtime;
  
  
        browser.tabs.sendMessage(tabs[0].id,msg,function(response){
            ybtime=response.txt;
            gettime_callback();       
        });
  
          function  gettime_callback(){
            if(ybtime != "undefined" && ybtime != ""){
              ybtimearray=ybtime.split(":");
              document.getElementById('url').value=url+"&t="+ybtimearray[0]+"m"+ybtimearray[1]+"s";
              document.getElementById('ybtime_hidden').value="&t="+ybtimearray[0]+"m"+ybtimearray[1]+"s";
            }else{
              document.getElementById('url').value=url;
            }
            
  
          }
  
      }else{
        document.getElementById('url').value=url;
      }
  
        document.getElementById('title').value=title;


   });

  var addTag = document.getElementById('addtag');

  addTag.addEventListener('click', function() {

    browser.tabs.query({'active': true, 'currentWindow': true}, function(tab) {
    var tag= document.getElementById('tags').value;
    tagsList.push(tag);

    var tagsdiv = document.getElementById("tagsdiv");
    var tagContent = document.createElement("p");
    tagContent.appendChild(document.createTextNode(tag));
    tagsdiv.appendChild(tagContent);

    });
  }, false);

  var addTag = document.getElementById('save');

  addTag.addEventListener('click', function() {

   var title;
   var url;

   browser.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    
    title=document.getElementById('title').value;
    url=document.getElementById('url').value;
   });


      rslt = browser.storage.local.get(['token'],function(result) {
        var api='https://linktrunks.com/api/bookmarks/';
        var data={title:title,url:url,tag:tagsList.join()};
        bookmarkApiRequest(api,result.token,data,checkTokenResponse);


        function checkTokenResponse(xmlhttp){


        if( xmlhttp.response == "" ) {
           ErrorPopup("Server not responding ...");
           return 1;
        }

        //alert(xmlhttp.status);
        if (xmlhttp.readyState == 4 ) {
        //callback(xmlhttp.response);
           window.close();
        }

      }
     });

  }, false);


   var logout = document.getElementById('logout');

   logout.addEventListener('click', function() {


   rslt = browser.storage.local.get(['token'],function(result) {

    var api='https://linktrunks.com/auth/token/destroy/';
    destoryToken(api,result.token,checkTokenResponse);


  function checkTokenResponse(xmlhttp){

    //Notification.requestPermission();
    var notification = new Notification('Logged out');
    setTimeout(notification.close.bind(notification), 2000);

    setTimeout(function () { window.close();}, 2000);


    }
  });


  }, false);


  var dashboard = document.getElementById('dashboard');

   dashboard.addEventListener('click', function() {

        browser.tabs.create({ url: "https://linktrunks.com/" });


  }, false);

  var removetimeCheckbox = document.getElementById('removetimeCheckbox');
  removetimeCheckbox.addEventListener('change', function(e) {
    var nurl=document.getElementById('url').value;
    nurl=nurl.split("&t");
    
    if(e.target.checked==true){
      document.getElementById('url').value=nurl[0];
    }else{
      var tmpstring=document.getElementById('ybtime_hidden').value;
      document.getElementById('url').value=nurl[0]+tmpstring;
    }
  
}, false);

}

function loginPopup(){


     var loginDiv = document.getElementById("loginDiv");
     loginDiv.style.display ="block";  // hide login form
     var errorMsgDiv = document.getElementById("errorMsgDiv");
     errorMsgDiv.style.display ="none";  // hide error div

   var login = document.getElementById('login');

   login.addEventListener('click', function() {


     var username=document.getElementById('username').value;
     var password=document.getElementById('password').value;

     var formData = new FormData();
     formData.append("username",username);
     formData.append("password",password);

     //alert(username);
     //alert(password);

      var api='https://linktrunks.com/auth/token/create/';
      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance

      xmlhttp.onreadystatechange = function() {

            //alert(xmlhttp.readyState);
        if (xmlhttp.readyState == 4 ) {

            if( xmlhttp.response == "" ) {
            ErrorPopup("Server not responding ...");
	    return 1;
        }

        jsonResp = JSON.parse(xmlhttp.response);
        //alert(jsonResp["auth_token"]);
        browser.storage.local.set({'token': jsonResp["auth_token"]});
            //callback(xmlhttp.response);
         //Notification.requestPermission();
         var notification = new Notification('Connected');
         setTimeout(notification.close.bind(notification), 2000);

         setTimeout(function () { window.close();}, 2000);

         //window.close();


        }
      };

      xmlhttp.open("POST",api);
      xmlhttp.send(formData);
    }, false);


}


function ErrorPopup(msg){

    var bookmarkForm = document.getElementById("bookmarkForm");
    bookmarkForm.style.display="none"; // hide bookmark form
    var loginDiv = document.getElementById("loginDiv");
    loginDiv.style.display ="none";  // hide login form

    var errorMsgDiv = document.getElementById("errorMsg");
    errorMsgDiv.innerText=msg;


}

document.addEventListener('DOMContentLoaded', function() {


    var bookmarkForm = document.getElementById("bookmarkForm");
    bookmarkForm.style.display="none"; // hide bookmark form
    var loginDiv = document.getElementById("loginDiv");
    loginDiv.style.display ="none";  // hide login form


   /*Notification.requestPermission().then(function(result) {
     console.log(result);
  });*/



  //chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  //chrome.browserAction.setBadgeText({text: "Connected"});



  //chrome.storage.local.set({'token': "1111111111"});

   //chrome.storage.local.get("token", gotItem);

  rslt = browser.storage.local.get(['token'],function(result) {
    //result.token;

    var api='https://linktrunks.com/auth/me/';

    checkToken(api,result.token,checkTokenResponse);


    function checkTokenResponse(xmlhttp){


    if( xmlhttp.response == "" ) {
       ErrorPopup("Server not responding ...");
       window.open('https://linktrunks.com/', '_blank');
       return 1;
    }

    jsonResp = JSON.parse(xmlhttp.response);
    if(typeof jsonResp["username"]=="undefined"){
       loginPopup();

    }else{

        bookmarkPopup();
    }

  }
 });



}, false);
