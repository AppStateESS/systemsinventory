/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    
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
    Pagers.reload('department-list');
}

function resetTitle()
{
    $("h4.edit-department-modal-title").text('Add Department');
}