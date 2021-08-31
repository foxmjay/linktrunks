$(document).ready(function() {

    $.fn.dataTable.ext.errMode = 'none';
    
    token=localStorage.getItem("markme_var");


    //------------------------- Get User infos --------------------------
    apiurl="/auth/me/";
    method="GET";

    $.ajax({
        type: method,
        url: apiurl,
        beforeSend: function(xhr){
              xhr.setRequestHeader("Authorization","Token "+token);
        },
        success: function(data){
            $("#user_name_bar").text(data.username);
            $("#user_name_p").text(data.username);   
            continueloding=true;        
        },
        statusCode: {
            401: function() {
                window.location.href="/login/"; 
            }
        },
        failure: function(errMsg) {
            return "ko";
        }
    });


    //-----------------------------------------------------------------------


    //alert(token);
    //------------------------ Get Data------------------
    selected = null;
    selectedRow = null;
    $("#bkform").hide();
    $("#edit_bookmark").addClass("disabled");
    $("#delete_bookmark").addClass("disabled");
   

    var bktable = $('#example2').DataTable( {
        sAjaxDataProp: "",
        "ajax":{          
          "url": '/api/bookmarks/',
          "type": "GET",
          "beforeSend": function(xhr){
              //xhr.setRequestHeader("Access-Control-Allow-Origin","*");
              xhr.setRequestHeader("Authorization","Token "+token);
          },
	  //"headers": { 'Access-Control-Allow-Origin': "*" }
        },
        "columns":[
            {"data":"id",
            "visible": false
            },
            {"data":"title"},
            {"data":"url",
            "render": function(data,type,row,meta){
              return "<a href='"+data+"' target='_blank'>"+data+"</a>";
            }
            },
            {"data":"tag"},
            {"data":"remindme"},
            {"data":"created",
            "render": function(d) {
                      return moment(d).format('MMM Do YYYY, H:mm:ss');
              }
            }
          ]
    } );
    //-------------------------------------------------------------------------

    //---------------------------- Row selection -------------------------
    $('#example2 tbody').on( 'click', 'tr', function () {

            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
                selected = null;
                $("#edit_bookmark").addClass("disabled");
                $("#delete_bookmark").addClass("disabled");

            }
            else {
                bktable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                $("#edit_bookmark").removeClass("disabled");
                $("#delete_bookmark").removeClass("disabled");

                selectedRowData = bktable.row(this).data();
                selectedRow= bktable.row(this);
              
                $("#edit_title").val(selectedRowData.title);
                $("#edit_url").val(selectedRowData.url);
                $("#edit_tags").val(selectedRowData.tag);
                $("#edit_remindme").val(selectedRowData.remindme);
                selected = selectedRowData.id;
            }
            
    } );


    //------------------------  Add new button --------------------

    $('#add_bookmark').click( function () {
      selected=null;
      $(".selected").removeClass('selected');
      $("#edit_title").val("");
      $("#edit_url").val("");
      $("#edit_tags").val("");
      $("#edit_remindme").val("");
      $("#bkform").show();
      $('html, body').animate({
                    scrollTop: $("#bkform").offset().top
                }, 100);

      
    });
    //----------------------------------------------------------------


    //------------------- Edit Button ------------------------------

    $('#edit_bookmark').click( function () {
      $("#bkform").show();
      $('html, body').animate({
                    scrollTop: $("#bkform").offset().top
                }, 100);

      
    });
    //-----------------------------------------------------------------


    //------------------- Delete Button ------------------------------

    $('#delete_bookmark').click( function () {

        
        var r = confirm("Delete Bookmark?");
        if (r == true) {
            deleteRow();
        } else {
           return;
        } 

    });




    function deleteRow(){

        apiurl="/api/bookmarks/"+selected+"/";
        method="DELETE";

        $.ajax({
            type: method,
            url: apiurl,
            beforeSend: function(xhr){
                  xhr.setRequestHeader("Authorization","Token "+token);
            },
            //data:bkdata, 
            success: function(data){
                selectedRow.node().remove();
                selected=null;                
                $("#edit_bookmark").addClass("disabled");
                $("#delete_bookmark").addClass("disabled")
                return "ok";
       
            },
            failure: function(errMsg) {
                return "ko";
            }
           });
        
    }
      //-----------------------------------------------------------------



  

    //----------------------------- cancel button ------------------
    $('#cancel_bookmark').click( function () {
      $("#bkform").hide();
      $('html, body').animate({
                    scrollTop: $("#bklist").offset().top
                }, 100);
    });

    //----------------------------------------------------------------


    //----------------------- Save Button ----------------------------
    $('#save_bookmark').click( function () {

      $(".selected").removeClass('selected');
      var bk_title=$("#edit_title").val();
      var bk_url=$("#edit_url").val();
      var bk_tag=$("#edit_tags").val();

      var bkdata={title:bk_title,url:bk_url,tag:bk_tag};


      if(selected !=null){
        apiurl="/api/bookmarks/"+selected+"/";
        method="PUT";
      }else{
        apiurl="/api/bookmarks/";
        method="POST";
      }
      
       $.ajax({
        type: method,
        url: apiurl,
        beforeSend: function(xhr){
              xhr.setRequestHeader("Authorization","Token "+token);
        },
        data:bkdata, 
        success: function(data){

          if(selected!=null){

            selectedRow.id=data.id;
            selectedRowData.title= data.title;
            selectedRowData.url= data.url;
            selectedRowData.tag= data.tag;
            selectedRow.remindme=data.remindme;
            selectedRow.created=data.created;
            selectedRow.data(selectedRowData).draw();

            $(selectedRow.node()).addClass('selected');
            
          }else{

            var newrow = bktable.row.add({
                "id":data.id,
                "title":data.title,
                "url":data.url,
                "tag":data.tag,
                "remindme":data.remindme,
                "created":data.created}
            ).draw().node();  

            $(newrow).addClass('selected');
      
          }

          $("#bkform").hide();
          $('html, body').animate({
                    scrollTop: $("#bklist").offset().top
                }, 100);

        
            
        },
        failure: function(errMsg) {
            return "ko";
        }
       });


    });

    //-----------------------------------------------------------------------------



    //------------------------- side search bar ---------------------------------
    $( "#searchbar" ).keypress(function(e) {
        if(e.keyCode==13){
            return;
        }
        bktable.search($(this).val()).draw() ;
        //console.log( "Handler for .keypress() called." );
      });

    //--------------------------------------------------------------------


    $('#signout').click( function () {
        
      
        
        
        apiurl="/auth/token/destroy/";
        method="POST";
        
        $.ajax({
            type: method,
            url: apiurl,
            "beforeSend": function(xhr){
                xhr.setRequestHeader("Authorization","Token "+token);
              },
            success: function(data){
                //data.auth_token;
                //sessionStorage.setItem("markme_var", data.auth_token);
                //alert(data);
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
                alert("Error");
                }
            }
        });

    });

  

});
