function initIntro(team) {
  var description = $('.project_description');
  var buttonGroup = $('#social-link');
  $('#team_name h4 span').text(team.name);
  team.intro.forEach(element => {
    $('<p>')
      .text(element)
      .appendTo(description);
  });
  if (team.web) {
    var btn = $('<button>')
      .attr('type', 'button')
      .addClass('btn');
    $('<i>')
      .addClass('fa fa-globe')
      .appendTo(btn);
    btn.bind('click', function() {
      window.location = team.web;
    });
    buttonGroup.append(btn);
  }
  if (team.fb) {
    var btn = $('<button>')
      .attr('type', 'button')
      .addClass('btn');
    $('<i>')
      .addClass('fa fa-facebook')
      .appendTo(btn);
    btn.bind('click', function() {
      window.location = team.fb;
    });
    buttonGroup.append(btn);
  }
}

function initImagesCarousel(index) {
  var list = $('.carousel-inner');
  for (var i = 0; i < 2; i++) {
    if (i === 1 && index === '8') {
      continue;
    }
    var img = `./assets/images/${index}/carousel${i + 1}.jpg`;
    var item = $('<div>').addClass('item');
    $('<img>')
      .attr('src', img)
      .css('width', '100%')
      .appendTo(item);
    list.append(item);
  }
  list
    .children()
    .first()
    .addClass('active');
}

function initTeamsCarousel(data) {
  var list = $('#carousel_list');
  $(data).each(function(index, team) {
    var img = `./assets/images/${index}/logo.jpg`;
    var card = $('<div>')
      .addClass('thumbnail our-team')
      .attr('data-index', team.index);
    $('<img>')
      .attr('src', img)
      .attr('alt', 'test')
      .appendTo(card);
    var content = $('<div>')
      .addClass('team-content')
      .appendTo(card);
    $('<h3>')
      .addClass('title')
      .text(team.name)
      .appendTo(content);
    $('<span>')
      .addClass('post')
      .text(TAGS[team.tags])
      .appendTo(content);
    list.append(card);
  });
}

function getTeamIndex() {
  var results = new RegExp('[?&]team=([^&#]*)').exec(window.location.search);
  return results !== null ? results[1] || 0 : false;
}

$(document).ready(function() {
  var teamIndex = getTeamIndex();
  initIntro(TEAMS[teamIndex]);
  initImagesCarousel(teamIndex);
  initTeamsCarousel(TEAMS);
  $('.owl-carousel').owlCarousel({
    startPosition: teamIndex,
    loop: true,
    margin: 10,
    nav: true,
    navText: ['', ''],
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });

  $('div.thumbnail').click(function() {
    window.location = './intro.html?team=' + $(this).attr('data-index');
  });
});
