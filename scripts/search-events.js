(function() {
  $('.select-styled').click(function(e) {
    // console.log('clicked main');
    e.stopPropagation()
    $('div.select-styled.active').not(this).each(function(){
        $(this).removeClass('active').next('ul.select-options').hide();
    });

    $(this).addClass('active').next('ul.select-options').show();
  })

  $('.select-options li').click(function(e) {
    // e.stopPropagation()
    $('.select-styled').text($(this).text()).removeClass('active')
    $(this).val($(this).attr('rel'))
    $('.select-options').hide()
  })

  $('.sidebar-fixed .form-search').submit(function(e) {
    event.preventDefault()
    var input = $(this).find('.sidebar-search-input')
    var searchBy = $(input).val()
    window.location.href = '/press-releases/?query=' + searchBy
  })

  $('.btn-all-press-releases').click(function(e) {
    const { pathname } = window.location
    e.preventDefault()
    const filterBy = pathname.split('/')[2]
    window.location.href = '/press-releases/?filter=' + filterBy
  });
  
  $( document ).ready(function() {
    $( '.dropdown-toggle' ).click(function() {
      var $list = $(".dropdown-menu");
      $list.children().detach().sort(function(a, b) {
      return $(a).text().localeCompare($(b).text());
    }).appendTo($list);
  })
  });

   $('.dropdown-toggle').click(function(e){
     $(this).addClass('active')
   });
  
  $('.dropdown-item').click(function(e){
    e.preventDefault();
    $(this).siblings().attr('data-attr', '');
    $(this).parents('.dropdown').find('.dropdown-toggle').text($(this).text()).removeClass('active');
  });

  $(document).click(function() {
    $('.dropdown-toggle').removeClass('active');
    $("[data-attr='selected']").parents('.dropdown').find('.dropdown-toggle').text($("[data-attr='selected']").text());
  });

  $( document ).ready(function() {
    $("[data-attr='selected']").parents('.dropdown').find('.dropdown-toggle').text($("[data-attr='selected']").text());
    
  });

})()
