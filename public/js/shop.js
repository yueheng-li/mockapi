$(document).ready(function() {


	$("#addshop").click(function(e) {
		self.location = "/shops/addshops";
	});


    $("#posttest").click(function(e) {
        //self.location = "/shops/addshops";
        var url = $('#url').val();
        var data = $('#data').val();
        var currentURL = window.location.protocol + '//' + window.location.host;
        var url = currentURL + url;
        $.ajax({
            url: url,
            type: 'POST',
            data: data ,
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                //alert(JSON.stringify(response));
                $('#responsedata').val(JSON.stringify(response));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {            
                $('#responsedata').val(XMLHttpRequest.responseText);
            }
        }); 
    });
});

function delShop(id, row) {
	
    var currentURL = window.location.protocol + '//' + window.location.host;
    var url = currentURL + "/shops/delshop/" + id;

    $.post(url, function (data) {
      if (data) {
                if (data.status == 'ok') {
                    $(row).parents('tr').first().remove();
                } else {
                    console.log('Sorry, there is some error.');
                }
         } else {
         	console.log('Sorry, there is some error.');
            alert('Sorry, there is some error.');
        }
    }); 
}

