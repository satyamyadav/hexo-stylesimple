(function($){
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    console.log("share ---");
    $('.article-share-box.show').removeClass('show');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('show')){
        box.removeClass('show');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box dropdown-menu p-0">',
          '<div><input class="article-share-input form-control form-control-sm" value="' + url + '"></div>',
          '<div class="article-share-links btn-group btn-group-sm">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter btn" target="_blank" title="Twitter">',
            '<img width="24" width="24" src="https://unpkg.com/simple-icons@latest/icons/twitter.svg" />',
            '</a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google btn" target="_blank" title="Google+">',
            '<img width="24" width="24" src="https://unpkg.com/simple-icons@latest/icons/googleplus.svg" />',
            '</a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook btn" target="_blank" title="Facebook">',
            '<img width="24" width="24" src="https://unpkg.com/simple-icons@latest/icons/facebook.svg" />',
            '</a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest btn" target="_blank" title="Pinterest"> ',
            '<img width="24" width="24" src="https://unpkg.com/simple-icons@latest/icons/pinterest.svg" />',
            '</a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.share').hide();

    box.css({
      top: offset.top + 30,
      left: offset.left - 210
    }).addClass('show');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });



})(jQuery);
