
var runOnLoad = function()
{     
    $('.pager-row').click(function() {
        $("#edit-device-button").css("display","block");
        $("#delete-device-button").css("display","block");
        $("#edit-device-button1").css("display","block");
        $("#save-device-button").css("display","none");
        $("#device-save-result").css("display", "none");
        $("#device-deleted").css("display","none");
        $('#device-last-audit').removeClass('text-primary');
        $('#device-last-audit').addClass('text-danger');
        $('#device-last-audit').empty().append("This device has never been audited.");
        
        $.getJSON('systemsinventory/system/getDeviceAudits/',{
            'device_id': $(this).data('rowId') }, function(jsondata) {
            if(jsondata != null){
               printLastAudit(jsondata); 
           }
           });
        $.getJSON('systemsinventory/system/getDetails/',{
            'device_id': $(this).data('rowId'),
            'row_index': $(this).index() }, function(jsondata) {
            // display data
            var device_type_id = jsondata['device_type_id'];
            var user_data = true;
            var modal_title = 'PC/Server Details';
            
            switch(device_type_id){
                case 3:
                    device_template = "Edit_Ipad.html";
                    var modal_title = 'Ipad Details';
                    break;
                case 4:
                    device_template = "Edit_Printer.html";
                    var modal_title = 'Printer Details';
                    break;
                case 5:
                    device_template = "Edit_Camera.html";
                    user_data = false;
                    var modal_title = 'Camera Details';
                    break;    
                case 6:
                    device_template = "Edit_Digital_Sign.html";
                    user_data = false;
                    var modal_title = 'Digital Sign Details';
                    break;    
                case 7:
                    device_template = "Edit_Time_Clock.html";
                    user_data = false;
                    var modal_title = 'Time Clock Details';
                    break;    
                default:
                    var device_template = "Edit_PC.html";
                    break;
                            
            }
            if(user_data){
                $("#system-body").load(source_http + "mod/systemsinventory/templates/"+device_template);
                $("#user-body").load(source_http + "mod/systemsinventory/templates/Edit_User.html", function(){
                    $("h4.modal-title").text(modal_title);
                    loadSystemDetails(jsondata,device_type_id);
                });
            }else{
                $("#system-body").load(source_http + "mod/systemsinventory/templates/"+device_template, function(){
                    $("h4.modal-title").text(modal_title);
                    loadSystemDetails(jsondata,device_type_id);
                });
            }
                        
            $("#device-modal").modal('show');
            
        });
    });
}
    function printLastAudit(jsondata){
        var username = jsondata['0']['username'];
        var date = jsondata['0']['timestamp'];
        if(jsondata['audit_overdue']){
            $('#device-last-audit').removeClass('text-primary');
            $('#device-last-audit').addClass('text-danger');
        }else{
            $('#device-last-audit').removeClass('text-danger');
            $('#device-last-audit').addClass('text-primary');  
        }
        
        $('#device-last-audit').empty().append("Device last inventoried on "+date+" by "+username);
    }
    
    function loadSystemDetails(jsondata,device_type_id){
        $.each(jsondata, function(index, d){
            var element_id = index.replace("_","-");
            if(index == "departments"){
                $("#department").append(d);
                $("#department").val(jsondata['department_id']);
            }
            if(index == "locations"){
                $("#location").append(d);
                $("#location").val(jsondata['location_id']);
            }
            if(index == "system_usage"){
                $("#system-usage").val(d);
            }
            if(index == "hd_size")
                $("#hd").val(d);
            
            if(index == "id")
                $("#device-id").val(d);

            if(d != undefined || d != null)
                $("#"+element_id).val(d);
        });
        if(device_type_id == 2)
            $("#server").prop("checked",true);
        switch(device_type_id){
            case 1:
            case 2:
                $("#battery-backup").prop("checked",jsondata['battery_backup']);
                $("#redundant-backup").prop("checked",jsondata['redundant_backup']);
                $("#touch-screen").prop("checked",jsondata['touch_screen']);
                $("#dual-monitor").prop("checked",jsondata['dual_monitor']);
                $("#rotation").prop("checked",jsondata['rotation']);
                $("#stand").prop("checked",jsondata['stand']);
                $("#smart-room").prop("checked",jsondata['smart_room']);
                $("#check-in").prop("checked",jsondata['check_in']);
                break;
            case 3:
                $("#case").prop("checked",jsondata['protective_case']);
                break;
            case 4:
                $("#color").prop("checked",jsondata['color']);
                $("#duplex").prop("checked",jsondata['duplex']);
                $("#network").prop("checked",jsondata['network']);
                break;
            case 5:
                 $("#sd-support").prop("checked",jsondata['sd_support']);
                $("#hi-def").prop("checked",jsondata['hi_def']);
                $("#exterior").prop("checked",jsondata['exterior']);
                $("#covert").prop("checked",jsondata['covert']);
                $("#is-on").prop("checked",jsondata['is_on']);
                break;    
            case 6:
                $("#hi-def").prop("checked",jsondata['hi_def']);
                break;    
            case 7:
                break;    
            default:
                break;
            
        }
    
    }

function deleteDevice(){
    var result = confirm("Are you sure you want to delete this system?");
    if(result){
        var device_id = $("#device-id").val();
        var row_index = $("#row-index").val();
        var device_type_id = $("#device-type-id").val();
        var specific_device_id = $("#specific-device-id").val();
        row_index++;
        $.getJSON('systemsinventory/system/delete/',{
            'device_id': device_id, 'device_type_id': device_type_id, 'specific_device_id': specific_device_id}, function(jsondata) {
            
        });
        
        $("table tr:eq("+row_index+")").remove();
        $("#device-modal").modal('hide');
        $("#device-deleted").css("display","block");
    }
}

function inventoryDevice(){
    var device_id = $("#device-id").val();
    $.getJSON('systemsinventory/system/inventory/',{
        'device_id': device_id}, function(jsondata) {
        //var result = $.parseJSON(jsondata);
        if(jsondata['success']){
            var username = jsondata['username'];
            var date = jsondata['timestamp'];
            $('#device-last-audit').removeClass('text-danger');
            $('#device-last-audit').addClass('text-primary');
            $('#device-last-audit').empty().append("Device last inventoried on "+date+" by "+username);
        }
    });
    
}

 function enableFormFields(){
       var pc_attributes = ["physical-id","model","processor","ram","hd","video-card","os","vlan","server","battery-backup","redundant-backup","rotation","smart-room","mac","mac2","primary-ip","secondary-ip","primary-monitor","secondary-monitor","purchase-date","server-type","manufacturer","vlan", "touch-screen","stand","dual-monitor","check-in"];
       var ipad_attributes = ["physical-id","hd","generation","mac","primary-ip","apple-id","purchase-date","case"];
       var printer_attributes = ["physical-id","model","toner-cartridge","manufacturer","purchase-date","color","duplex","network"];
       var camera_attributes = ["physical-id","model","megapixels","manufacturer","purchase-date","room-number","department","location","notes","sd-support","exterior","covert","is-on"];
       var digital_sign_attributes = ["physical-id","model","processor","ram","hd","manufacturer","mac","primary-ip","screen-size","screen-manufacturer","purchase-date","room-number","department","location","vlan","hi-def","notes"];
       var time_clock_attributes = ["physical-id","model","manufacturer","purchase-date","room-number","department","location","vlan","notes"];
       var user_attributes = ["system-usage","username","first-name","last-name","department","location","room-number","phone","notes"];
       
       $.each(pc_attributes, function(index, d){
        $("#"+d).prop("disabled", false);
    });
    
    $.each(ipad_attributes, function(index, d){
        $("#"+d).prop("disabled", false);
    });
    
    $.each(printer_attributes, function(index, d){
        $("#"+d).prop("disabled", false);
    });
    
    $.each(camera_attributes, function(index, d){
        $("#"+d).prop("disabled", false);
    });
    
    $.each(digital_sign_attributes, function(index, d){
        $("#"+d).prop("disabled", false);
    });
    
    $.each(time_clock_attributes, function(index, d){
        $("#"+d).prop("disabled", false);
    });
    
    $.each(user_attributes, function(index, d){
        $("#"+d).prop("disabled", false);
    });
        
    //$("#edit-device-button").css("display","none");
    $("#edit-device-button").prop('disabled',true);
    $("#edit-device-button1").css("display","none");
    $("#delete-device-button").css("display","none");
    $("#save-device-button").css("display","block");
}
    

