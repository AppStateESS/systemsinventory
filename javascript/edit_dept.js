/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    $('#department-edit-form').submit( function(event) {
        event.preventDefault();
        var posting = $.post('systemsinventory/settings/editDepartments/', $('form#department-edit-form').serialize(), null ,'json');
        //var jsondata = posting["responseText"];
        //$( "#device-save-result" ).empty().append( posting['success'] );
        posting.done(function( data ) {
            //var content = $( data ).find( "#content" );
            var result = jQuery.parseJSON(posting['responseText']);
            if(result.success)
                $( "#department-save-result" ).empty().append( "Department Saved Successfully" );
            else
                $( "#department-save-result" ).empty().append( "There was a problem saving the department!" );
            
            $("#department-save-result").css("display", "block");
            $('#edit-department-modal').animate({scrollTop:0}, 'fast');
        });
        
    }); 
});

 function editDepartment(dept_id)
{
        $.getJSON('systemsinventory/settings/getDepartments/',{
            'department_id': dept_id }, function(jsondata) {
            $('#department-id').val(jsondata['id']);
            $('#display-name').val(jsondata['display_name']);
            $('#description').val(jsondata['description']);
            $('#parent-department').val(jsondata['parent_department']);
            if(jsondata['active'])
                $('#dept-active').prop('checked',true);
            else
                $('#dept-noactive').prop('checked',true);
                            
        });
        $("h4.edit-department-modal-title").text('Edit Department');
        $("#edit-department-modal").modal('show');

}

function clearModal(){
    $('#department-id').val(0);
    $('#display-name').val('');
    $('#description').val('');
    $('#parent-department').val('');
    $('#dept-active').prop('checked',true);
    $('#dept-noactive').prop('checked',false); 
    $("#department-save-result").empty();
    $("#department-save-result").css("display", "none");
    resetTitle();
    Pagers.reload('department-list');
}

function resetTitle()
{
    $("h4.edit-department-modal-title").text('Add Department');
}