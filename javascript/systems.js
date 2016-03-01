var systems_pc_tab = new SystemsTab;

$(window).load(function() {
    systems_pc_tab.start();
    
   
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
        
    var length = 1;
    $("#ipad-mac").focusin(function (evt) {
        $(this).keypress(function () {
            var content = $(this).val();
            var content1 = content.replace(/\:/g, '');
            length = content1.length;
            if(((length % 2) == 0) && length < 17 && length > 1){
                $('#ipad-mac').val($('#ipad-mac').val() + ':');
            }    
            $("#ipad-mac").val($("#ipad-mac").val().slice(0, 16));
        });    
    });   


    
});

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
    };
}

function formatMAC(e) {
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
        str = e.target.value.replace(/[^a-f0-9]/ig, "");
    
    while (r.test(str)) {
        str = str.replace(r, '$1' + ':' + '$2');
    }

    e.target.value = str.slice(0, 17);
};

