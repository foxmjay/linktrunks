
console.log("content running");

/*ytplayer = document.getElementsByClassName("ytp-time-current");
//var yttime = ytplayer.getCurrentTime();
alert(ytplayer.innerHTML);*/

//chrome.browserAction.setPopup({popup:"booker_popup.html"});

chrome.runtime.onMessage.addListener(receivedMessage);

function receivedMessage(message,sender,sendResponse){

   /* chrome.browserAction.setPopup({
              popup: 'booker_popup.html'
   });

   chrome.browser.pageAction.setPopup({
      popup : "booker_popup.html"
   });*/

   //ytplayer = document.getElementById("info");
    ytplayer = document.getElementsByClassName("ytp-time-current");
    yttime = ytplayer[0].innerText;
   //alert(ytplayer[0].getElementsByClassName("ytp-time-current")[0].innerText)
   //var yttime = ytplayer.getCurrentTime();
   //alert(yttime);

   console.log(message.txt);

    let msg = {
      txt : yttime
    }

   sendResponse(msg);

   
}
