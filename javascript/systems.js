var systems_pc_tab = new SystemsTab;

$(window).load(function() {
    systems_pc_tab.start();
    
   $('#system-profile').change(function() {
       var profile_id = $("#system-profile option:selected").val();
       $.getJSON('systemsinventory/system/getProfile/',{
        'profile_id': profile_id }, function(jsondata) {
        loadProfile(jsondata);
    });

   });
   
   $('#printer-profile').change(function() {
       var profile_id = $("#printer-profile option:selected").val();
       $.getJSON('systemsinventory/system/getProfile/',{
        'profile_id': profile_id }, function(jsondata) {
        loadProfile(jsondata);
    });

   });
   
            
    formatMAC("#mac");
    formatMAC("#mac2");
    formatMAC("#ipad-mac");
    formatMAC("#camera-mac")
        
/** Can use this keyup search if I can get all users into database or get api to do wildcard search */
$("input#pc-username").on("keyup", function( event ){
    var element_id = 'pc';
    var length = this.value.length;
    var input_val = $(this).val();
    $("#pc-username-dropdown").empty();
    searchInputAction(length,input_val,element_id);
});

$("input#ipad-username").on("keyup", function( event ){
    var element_id = 'ipad';
    var length = this.value.length;
    var input_val = $(this).val();
    $("#ipad-username-dropdown").empty();
    searchInputAction(length,input_val,element_id);
});

$("input#printer-username").on("keyup", function( event ){
    var element_id = 'printer';
    var length = this.value.length;
    var input_val = $(this).val();
    $("#printer-username-dropdown").empty();
    searchInputAction(length,input_val,element_id);
});

 $("input#physical-id").on("focusin", function(event){
     $("#add-system-error").empty();
     $("#add-system-error").fadeOut("slow",function(){
         $("#add-system-error").css("display","none");
     });         

 });
 
 $("input#physical-id").on("focusout", function(event){
    var physical_id = $(this).val();
    $.getJSON('systemsinventory/system/searchPhysicalID/',{
        'physical_id': physical_id }, function(jsondata) {
        if(jsondata['exists']){
            $("#add-system-error").append("A system with this Physical ID already exists!");
            $("#add-system-error").fadeIn("slow",function(){
                $("#add-system-error").css("display","block");
            });
        }
    });
 });
});

function formatMAC(elementname){
    $(elementname).keypress(function () {
            var length = 1;
            var content = $(this).val();
            var content1 = content.replace(/\:/g, '');
            length = content1.length;
            if(((length % 2) == 0) && length < 17 && length > 1){
                $(elementname).val($(elementname).val() + ':');
            }    
            $(elementname).val($(elementname).val().slice(0, 16));
            $(elementname).val($(elementname).val().toUpperCase());
        });
        $(elementname).focusout(function(){
            $(elementname).val($(elementname).val().toUpperCase());
        });
}

function loadProfile(jsondata){
    device_type_id = jsondata['device_type_id'];
    var prefix = '';
    if(device_type_id == 4)
        prefix = 'printer-';
    
        $.each(jsondata, function(index, d){
            var element_id = index.replace("_","-");
            element_id = prefix+element_id;
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
                break;
            case 4:
                $("#printer-color").prop("checked",jsondata['color']);
                $("#printer-duplex").prop("checked",jsondata['duplex']);
                $("#printer-network").prop("checked",jsondata['network']);
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
    
function searchInputAction(length,input_val,element_id){
    if(length >= 4) {
        $("#"+element_id+"-button-group").addClass("open");
        $.getJSON('systemsinventory/system/searchUser/',{
            'username': input_val}, function(jsondata) {
            var user_list = "";
            if(jsondata != null){
                user_list = '<ul class="dropdown-menu" id="'+element_id+'-username-dropdown" style="height:auto;max-height:200px;overflow-x: hidden;">';
                $.each(jsondata, function(index, d){
                    var username = d['userName'];
                    user_list += "<li style='cursor:pointer;' id='"+element_id+"' onclick='systemGetUser(this,\""+element_id+"\")'>"+username+"</li>";
                    //alert("username"+index+" = "+d['userName']);
                });
            }else{
                user_list = '<ul class="dropdown-menu" id="'+element_id+'-username-dropdown"><li>No user found!<li></ul>';
            }
            $("#"+element_id+"-username-dropdown").replaceWith(user_list);
            
        });
    }else{
        $("#"+element_id+"-button-group").removeClass("open");
    }    
}

function systemGetUser(el,element_id){
    $.getJSON('systemsinventory/system/getUser/',{
        'username': $(el).text()}, function(jsondata) {
        if(jsondata != null){
            $("#"+element_id+"-username").val(jsondata['userName']);
            $("#"+element_id+"-first-name").val(jsondata['firstName']);
            $("#"+element_id+"-last-name").val(jsondata['lastName']);
        }else{
            // throw error
            alert("Something went wrong! Contact your systems administrator.");
        }
        $("#"+element_id+"-button-group").removeClass("open");
    });
}

 function toggleNetwork(checked){
        if(checked) {           
        $('#printer-username').prop("disabled", true);
        $("#printer-username").removeAttr('required');
        $("#printer-username-required").css("display", "none");
        $("#printer-first-name").prop("disabled", true);
        $("#printer-last-name").prop("disabled", true);
        $("#printer-phone").prop("disabled", true);
    }else{
        $("#printer-username").prop("disabled", false);
        $("#printer-username").attr("required","");
        $("#printer-username-required").css("display", "inline");
        $("#printer-first-name").prop("disabled", false);
        $("#printer-last-name").prop("disabled", false);
        $("#printer-phone").prop("disabled", false);
    }
}
    
function SystemsTab() {
    var $this = this;
    this.active = active_tab;
    this.google_url = null;

    this.start = function() {
        this.changeTab();
        $('li.systems-pc-tab').click(function() {
            $this.setActive('systems-pc');
        });
        $('li.ipad-tab').click(function() {
            $this.setActive('ipad');
        });
        $('li.printer-tab').click(function() {
            $this.setActive('printer');
        });
        $('li.camera-tab').click(function() {
            $this.setActive('camera');
        });
        $('li.digital-sign-tab').click(function() {
            $this.setActive('digital-sign');
        });
        $('li.time-clock-tab').click(function() {
            $this.setActive('time-clock');
        });
    };

    this.resetSections = function() {
        $('.systems-section').hide();
        $('.systems-tab').removeClass('active');
    };

    this.setActive = function(now_active) {
        $this.active = now_active;
        $this.changeTab();
    };

    this.changeTab = function() {
        $('.systems-section').removeClass('active');
        var class_tab_section = '.' + this.active + '-section';
        var class_tab = '.' + this.active + '-tab';

        this.resetSections();
        $(class_tab_section).show();
        $(class_tab).addClass('active');
        
        if(this.active == 'systems-pc' || this.active == 'systems-ipad'){
            $(".systems-user-section").show();
        }
    };
}


