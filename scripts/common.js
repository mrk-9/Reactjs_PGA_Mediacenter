$('.slide-menu__primary > li > a').on('click', function(e) {

  if(!$(this).hasClass('linkable')) {
    e.preventDefault();
    $(this).parents('.slide-menu').addClass('indent-first');
    $(this).parents('li').addClass('active');
  }
});

if ($('.slide-menu__secondary li').hasClass('active')) {
  $('.slide-menu').addClass('indent-second')
}
if ($('.slide-menu__inner li').hasClass('active')) {
  $('.slide-menu').addClass('indent-second')
}

$('.slide-menu__secondary > li > .slide-menu-control').click(function(e) {
  e.preventDefault();
  $(this).parents('.slide-menu').removeClass('indent-first');
  $(this).parents('li').removeClass('active');
});

$('.slide-menu__inner > li > .slide-menu-control').click(function(e) {
  e.preventDefault();
  if($(this).hasClass('remove-all-indents')){
    $(this).parents('.slide-menu').removeClass('indent-first');
    $(this).parents('li').removeClass('active');
  } else {
    $('.slide-menu').removeClass('indent-second').addClass('indent-first');
  }
});

// Toggle Mobile Sidebar

$('#navbarMobileButton').click(function(e) {
  e.preventDefault();
  $('.sidebar-fixed').addClass('active');
  $('.overlay').addClass('show');
});

$('#closeMobileButton').click(function(e) {
  e.preventDefault();
  $('.sidebar-fixed').removeClass('active');
  $('.overlay').removeClass('show');
});

$('select').each(function() {
  var $this = $(this),
    numberOfOptions = $(this).children('option').length;

  $this.addClass('select-hidden');
  $this.wrap('<div class="select"></div>');
  $this.after('<div class="select-styled"></div>');
  $('.select').addClass('select-custom');

  var $styledSelect = $this.next('div.select-styled');
  $styledSelect.text($this.children('option').eq(0).text());

  var $list = $('<ul />', {
    'class': 'select-options'
  }).insertAfter($styledSelect);

  for (var i = 0; i < numberOfOptions; i++) {
    $('<li />', {
      text: $this.children('option').eq(i).text(),
      rel: $this.children('option').eq(i).val()
    }).appendTo($list);
  }

  var $listItems = $list.children('li');

  $styledSelect.click(function(e) {
    e.stopPropagation();
    $('div.select-styled.active').not(this).each(function() {
      $(this).removeClass('active').next('ul.select-options').hide();
    });
    $(this).toggleClass('active').next('ul.select-options').toggle();
  });


  $(document).click(function() {
    $styledSelect.removeClass('active');
    $list.hide();
  });

});

var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
  isMobile = true;
}
if (isMobile) {

  // MOBILE VIEW
  $("p").each(function() {
    if ($(this).html() == '[expand]') {
      $(this).addClass('expand_start');
    }
    if ($(this).html() == '[/expand]') {
      $(this).addClass('expand_end');
    }
  });
  $("p.expand_start").each(function() {
    $(this).nextUntil($("p.expand_end")).wrapAll("<div class='expand' style='overflow: hidden;'></div>");
    $(this).prev().append('<span>..&nbsp; <a class="link-expand text-info d-block" href="#">Read&nbsp;More&nbsp</a></span>');
    // console.log($(this).next());
    $('.expand').append('<p><a class="link-collapse text-info d-block">Show&nbsp;Less&nbsp</a></p>');

    $(this).remove()
  });
  $(".expand").hide();
  $("p.expand_end").hide();

} else {

  // DESKTOP VIEW
  $("p").each(function() {
    if ($(this).html() == '[expand]' || $(this).html() == '[/expand]') {
      $(this).remove();
    }
  });
}

$('.link-expand').on('click', function(e) {
  e.preventDefault();
  $(this).parent().parent().next().slideToggle();
  $(this).parent().hide();
})

$('.link-collapse').on('click', function(e) {
  e.preventDefault();
  $('.link-expand').parent().show();
  $(".expand").slideToggle();
})

/**
 * Text collapse/expand - championship layout
 */

var wordLimit = 40;

$('.championship-content p').contents().unwrap().wrapAll('<p>');
$truncate = $('.championship-content p');
var content = $truncate.html();

function truncator(content) {
  var contentArray = content.split(' ');

  if (contentArray.length > wordLimit) {
    var less = contentArray.slice(0, wordLimit);
    var more = contentArray.slice(wordLimit, content.length);
    var html = less.join(' ');
    html += '<span style="display:none;">';
    html += '<span>' + more.join(' ') + '</span>';
    html += '</span>';
    html += '<a href="" class="morelink less text-info d-block">Read More</a>';
    $truncate.html(html);
  }
}

if (isMobile && content) truncator(content);

$(".morelink").click(function() {
  if ($(this).hasClass("less")) {
    $(this).removeClass("less");
    $(this).html('Read Less');
  }
  else {
    $(this).addClass("less");
    $(this).html('Read More');
  }
  $(this).parent().prev().toggle();
  $(this).prev().toggle();
  return false;
});