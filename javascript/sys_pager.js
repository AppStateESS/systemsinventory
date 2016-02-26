var runOnLoad = function()
{
    $('.pager-row').click(function() {
        $("#edit-device-button").css("display","block");
        $("#edit-device-button1").css("display","block");
        $("#save-device-button").css("display","none");
        $("#device-save-result").css("display", "none");
        $.getJSON('systemsinventory/system/getDetails/',{
            'device_id': $(this).data('rowId')}, function(jsondata) {
            // display data
            var device_type_id = jsondata['device_type_id'];
            switch(device_type_id){
                case 3:
                    device_template = "Edit_Ipad.html";
                    break;
                case 4:
                    device_template = "Edit_Printer.html";
                    break;
                case 5:
                    device_template = "Edit_Camera.html";
                    break;    
                case 6:
                    device_template = "Edit_DigitalSign.html";
                    break;    
                case 7:
                    device_template = "Edit_TimeClock.html";
                    break;    
                default:
                    var device_template = "Edit_PC.html";
                    break;
                            
            }
            $("#system-body").load("./mod/systemsinventory/templates/"+device_template);
            $("#user-body").load("./mod/systemsinventory/templates/Edit_User.html", function(){
                loadSystemDetails(jsondata,device_type_id);
            });
            $("#device-modal").modal('show');

        });
    });
    
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
                break;
            case 4:
                $("#color").prop("checked",jsondata['color']);
                $("#duplex").prop("checked",jsondata['duplex']);
                $("#network").prop("checked",jsondata['network']);
                break;
            case 5:
                break;    
            case 6:
                break;    
            case 7:
                break;    
            default:
                break;
            
        }
    
    }
};

 function enableFormFields(){
       var pc_attributes = ["physical-id","model","processor","ram","hd","video-card","os","vlan","server","battery-backup","redundant-backup","rotation","smart-room","mac","mac2","primary-ip","secondary-ip","primary-monitor","secondary-monitor","purchase-date","server-type","manufacturer","vlan", "touch-screen","stand","dual-monitor","check-in"];
       var ipad_attributes = ["physical-id","hd","generation","mac","apple-id","purchase-date"];
       var printer_attributes = ["physical-id","model","toner","manufacturer","purchase-date","color","duplex","network"];
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
    
    $.each(user_attributes, function(index, d){
        $("#"+d).prop("disabled", false);
    });
    
    $("#edit-device-button").css("display","none");
    $("#edit-device-button1").css("display","none");
    $("#save-device-button").css("display","block");
    }
    
$(document).ready(function () {
    $('.pager-column').css('cursor', 'pointer');
    Pagers.callback = runOnLoad;
    
     // format mac addresses
     var length = 1;
$("#mac").focusin(function (evt) {
        $(this).keypress(function () {
            var content = $(this).val();
            var content1 = content.replace(/\:/g, '');
            length = content1.length;
            if(((length % 2) == 0) && length < 17 && length > 1){
                $('#mac').val($('#mac').val() + ':');
            }    
            $("#mac").val($("#mac").val().slice(0, 16));
        });    
    });  

 var length = 1;
$("#mac2").focusin(function (evt) {
        $(this).keypress(function () {
            var content = $(this).val();
            var content1 = content.replace(/\:/g, '');
            length = content1.length;
            if(((length % 2) == 0) && length < 17 && length > 1){
                $('#mac2').val($('#mac2').val() + ':');
            }    
            $("#mac2").val($("#mac2").val().slice(0, 16));
        });    
    });  
});

