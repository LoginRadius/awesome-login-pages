let buttonenabled = true, scroll = 0;
$(document).on("click", ".darkmode", function(){
 if(!buttonenabled) return;
 buttonenabled = false;
 $(".clip").html($("body >.container")[0].outerHTML); 
 scrollbind($(".clip .container"));
 $(".clip .container").toggleClass("dark").scrollTop(scroll); 
 $(".clip .darkmode").toggleClass("fa-moon").toggleClass("fa-sun"); 
 $(".clip").addClass("anim"); 
 setTimeout(function(){
 $("body >.container").replaceWith($(".clip").html()) 
 scrollbind($("body >.container")); 
 $("body >.container").scrollTop(scroll);
 $(".clip").html("").removeClass("anim"); 
 buttonenabled = true;
 }, 1000); 
});
 
const scrollbind = el => el.bind("scroll", function(){
 scroll = $(this).scrollTop();
 if($(".container").length > 1)
 $(".container").scrollTop(scroll); 
 
});
scrollbind($(".container"));