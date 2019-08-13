function createCards(data) {
  var img = `./assets/images/${data.index}/logo.jpg`;
  var card = $('<div>')
    .addClass('thumbnail our-team')
    .attr('data-index', data.index);
  $('<img>')
    .attr('src', img)
    .attr('alt', 'test')
    .appendTo(card);
  var content = $('<div>')
    .addClass('team-content')
    .appendTo(card);
  $('<h3>')
    .addClass('title')
    .text(data.name)
    .appendTo(content);
  $('<span>')
    .addClass('post')
    .text(TAGS[data.tags])
    .appendTo(content);
  return card;
}

function createSideMenu(data) {
  var item = $('<div>')
    .text(data.name)
    .attr('data-index', data.index);
  return item;
}

function createMobileList(data) {
  var img = `./assets/images/${data.index}/logo.jpg`;
  var item = $('<div>')
    .addClass('list-item')
    .attr('data-index', data.index);
  var avatar = $('<div>').addClass('list-item-avatar');
  $('<img>')
    .addClass('avatar')
    .attr('src', img)
    .appendTo(avatar);
  var content = $('<div>')
    .addClass('list-item-content')
    .text(data.name);
  var chevron = $('<div>').addClass('list-item-chevron');
  $('<i>')
    .addClass('fa fa-chevron-right')
    .appendTo(chevron);
  item.append(avatar);
  item.append(content);
  item.append(chevron);
  return item;
}

function initPage(data) {
  var list = $('#team-list');
  var sideMenu = $('.side-menu');
  var row = $('<div>').addClass('row form-group hidden-xs');
  var mobile = $('<div>').addClass('visible-xs-block');
  $(data).each(function(index, team) {
    var col = $('<div>')
      .addClass('col-sm-3 col-xs-6')
      .appendTo(row);
    col.append(createCards(team));
    sideMenu.append(createSideMenu(team));
    mobile.append(createMobileList(team));
  });
  list.append(row);
  list.append(mobile);
}

function navgation() {
  window.location = './intro.html?team=' + $(this).attr('data-index');
}

$(document).ready(function() {
  if (TEAMS.length > 0) {
    initPage(TEAMS);
  }
  $('.float').hover(
    function() {
      $(this)
        .stop()
        .animate({ right: '0' }, 'medium');
    },
    function() {
      $(this)
        .stop()
        .animate({ right: '-20vw' }, 'medium');
    },
    500
  );
  $('div.thumbnail').click(navgation);
  $('.side-menu div').click(navgation);
  $('.list-item').click(navgation);
});
