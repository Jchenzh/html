
function SideAbout(){
    $(".box1").slideUp(500);
    $(".container").slideUp(500);
    setTimeout(function(){
        $(".container").load("resume.html");
    }, 500);
    setTimeout(function(){
        $(".container").slideDown(500);
    }, 200);
    
};

function SideA(){
    
    $(".container").slideUp(500);
    $(".box1").slideDown(500);
    
}

function SideContact(){
    $(".box1").slideUp(500);
    $(".container").slideUp(500);
    setTimeout(function(){
        $(".container").load("Contact.html");
    }, 500);
    
    $(".container").slideDown(500);
};

function ClickShop(){
    $(".box1").slideUp(500);
    $(".container").slideUp(500);
    setTimeout(function(){
        $(".container").load("Shop.html");
    }, 500);
    
    $(".container").slideDown(500);
};