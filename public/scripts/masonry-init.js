  var container = document.querySelector('#masonry');
  
  window.addEventListener('load', function() {
    var masonry = new Masonry(container, {
      itemSelector: '.item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
    }); 
  });
  
  