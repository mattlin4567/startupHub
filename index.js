function createCard(data) {
  var card = $('<div>')
    .addClass('card')
    .attr('data-toggle', 'modal')
    .attr('data-target', '#teamModal')
    .attr('data-index', data.index);
  var img = $('<img>')
    .addClass('card-img-top')
    .attr('src', data.image)
    .attr('alt', 'test')
    .appendTo(card);
  var body = $('<div>')
    .addClass('card-body')
    .appendTo(card);
  $('<h5>')
    .addClass('card-title')
    .text(data.name)
    .appendTo(body);
  $('<span>')
    .addClass('badge badge-primary')
    .text(TAGS[data.tags])
    .appendTo(body);
  return card;
}

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

function createbubba(data) {
  var card = $('<div>')
    .addClass('thumbnail effect-bubba')
    .attr('data-index', data.index);
  $('<img>')
    .attr('src', data.image)
    .attr('alt', 'test')
    .appendTo(card);
  var content = $('<div>')
    .addClass('team-content')
    .appendTo(card);
  $('<h3>')
    .text(data.name)
    .appendTo(content);
  $('<p>')
    .text(TAGS[data.tags])
    .appendTo(content);
  return card;
}

function initList(data) {
  var list = $('#team-list');
  var row = null;
  list.append(row);
  row = $('<div>').addClass('row form-group');
  $(data).each(function(index, team) {
    if (index % 3 === 0) {
    }
    var col = $('<div>')
      .addClass('col-md-4 col-sm-6 col-xs-6')
      .appendTo(row);
    col.append(createCards(team));
  });
  list.append(row);
}

$(document).ready(function() {
  if (TEAMS.length > 0) {
    initList(TEAMS);
  }

  $('div.thumbnail').click(function() {
    window.location = './intro.html?team=' + $(this).attr('data-index');
  });
});
