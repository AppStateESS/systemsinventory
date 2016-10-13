/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {  
              
    // format mac addresses
        $("#mac").focusin(function (evt) {
            $(this).keypress(function () {
                var length = 1;
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
