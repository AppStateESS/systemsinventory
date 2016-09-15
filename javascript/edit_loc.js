/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    $('#location-edit-form').submit( function(event) {
        event.preventDefault();
        var posting = $.post('systemsinventory/settings/editLocations/', $('form#location-edit-form').serialize(), null ,'json');
        //var jsondata = posting["responseText"];
        //$( "#device-save-result" ).empty().append( posting['success'] );
        posting.done(function( data ) {
            //var content = $( data ).find( "#content" );
            var result = jQuery.parseJSON(posting['responseText']);
            if(result.success)
                $( "#location-save-result" ).empty().append( "Location Saved Successfully" );
            else
                $( "#location-save-result" ).empty().append( "There was a problem saving the location!" );
            
            $("#location-save-result").css("display", "block");
            $('#edit-location-modal').animate({scrollTop:0}, 'fast');
        });
        
    }); 
});

 function editLocation(loc_id)
{
        $.getJSON('systemsinventory/settings/getLocation/',{
            'location_id': loc_id }, function(jsondata) {
            $('#location-id').val(jsondata['id']);
            $('#display-name').val(jsondata['display_name']);
            $('#description').val(jsondata['description']);
            if(jsondata['active'])
                $('#location-active').prop('checked',true);
            else
                $('#location-noactive').prop('checked',true);
                            
        });
        
        $("h4.edit-location-modal-title").text('Edit Location');
        $("#edit-location-modal").modal('show');

}

function clearModal(){
    $('#location-id').val(0);
    $('#display-name').val('');
    $('#description').val('');
    $('#location-active').prop('checked',true);
    $('#location-noactive').prop('checked',false);  
    $("#location-save-result").empty();
    $("#location-save-result").css("display", "none");
    resetTitle();
    Pagers.reload('location-list');
}

function resetTitle()
{
    $("h4.edit-location-modal-title").text('Add Location');
}