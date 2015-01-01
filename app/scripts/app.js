(function(document) {
  'use strict';
  document.addEventListener('polymer-ready', function() {
    // Perform some behaviour
    console.log('Polymer is ready to rock!');
    
  });

  var template = document.querySelector('#t');
  var pages, scaffold;

  template.pages = [
    {name: 'Create', title: 'Create a new mix', hash: 'create'},
    {name: 'Add', title: 'Add a song', hash: 'add'},
    {name: 'View', title: 'View a mix', hash: 'view'}
  ];

  template.addEventListener('template-bound', function() {
    pages = document.querySelector('core-animated-pages');
    scaffold = document.querySelector('#scaffold');
    this.route = this.route || 'create';
  });

  document.addEventListener('keydown', function(e) {
    var direction = null;

    switch (e.keyCode) {
    case 37: // left arrow
    direction = -1;
    if (pages.selectedIndex <= 0) {
      return;
    }
    break;
    case 39: // right arrow
    direction = 1;
    if (pages.selectedIndex >= pages.items.length - 1) {
      return;
    }
    break;
  }

  template.route = pages.items[pages.selectedIndex + direction].getAttribute('hash');
});

  template.menuItemSelected = function(e, detail, sender) {
    if (detail.isSelected) {
      this.async(function() {
        scaffold.closeDrawer();
      });
    }
  };

  window.spotifyApi = new SpotifyWebApi();


// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
