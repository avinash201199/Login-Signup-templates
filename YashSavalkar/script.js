$(function() {
    $(".input input").focus(function() {
      $(this).parent(".input").each(function() {
        $("label", this).css({
          "line-height": "18px",
          "font-size": "18px",
          "font-weight": "100",
          "top": "0px"
        });
        $(".spin", this).css({
          "width": "100%"
        });
      });
    }).blur(function() {
      $(this).parent(".input").each(function() {
        $(".spin", this).css({
          "width": "0px"
        });
        if ($("input", this).val() == "") {
          $("label", this).css({
            "line-height": "60px",
            "font-size": "24px",
            "font-weight": "300",
            "top": "10px"
          });
        }
      });
    });
  
    $(".button").click(function(e) {
      var pX = e.pageX,
        pY = e.pageY,
        oX = parseInt($(this).offset().left),
        oY = parseInt($(this).offset().top);
  
      var $span = $('<span class="click-effect" />').css({
        "margin-left": (pX - oX) + "px",
        "margin-top": (pY - oY) + "px"
      });
  
      $(this).append($span);
  
      $span.animate({
        "width": "500px",
        "height": "500px",
        "top": "-250px",
        "left": "-250px"
      }, 600, function() {
        $(this).remove();
      });
  
      $("button", this).addClass('active');
    });
  
    $(".alt-2").click(function() {
      if (!$(this).hasClass('material-button')) {
        $(".shape").css({
          "width": "100%",
          "height": "100%",
          "transform": "rotate(0deg)"
        });
  
        setTimeout(function() {
          $(".overbox").css({
            "overflow": "initial"
          });
        }, 600);
  
        $(this).animate({
          "width": "140px",
          "height": "140px"
        }, 500, function() {
          $(".box").removeClass("back");
          $(this).removeClass('active');
        });
  
        $(".overbox .title, .overbox .input, .overbox .button").fadeOut(300);
        $(".alt-2").addClass('material-buton');
      }
    });
  
    $(".material-button").click(function() {
      if ($(this).hasClass('material-button')) {
        setTimeout(function() {
          $(".overbox").css({
            "overflow": "hidden"
          });
          $(".box").addClass("back");
        }, 200);
  
        $(this).addClass('active').animate({
          "width": "700px",
          "height": "700px"
        });
  
        setTimeout(function() {
          $(".shape").css({
            "width": "50%",
            "height": "50%",
            "transform": "rotate(45deg)"
          });
  
          $(".overbox .title, .overbox .input, .overbox .button").fadeIn(300);
        }, 700);
  
        $(this).removeClass('material-button');
      }
  
      if ($(".alt-2").hasClass('material-buton')) {
        $(".alt-2").removeClass('material-buton');
        $(".alt-2").addClass('material-button');
      }
    });
  });
  