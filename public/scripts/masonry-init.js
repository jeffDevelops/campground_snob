  var container = document.querySelector('#masonry');
  var masonry = new Masonry(container, {
    itemSelector: '.item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
  });