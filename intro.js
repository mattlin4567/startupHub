var player;

function initIntro(team) {
  var description = $('.project_description');
  var buttonGroup = $('#social-link');
  $('#team_name h4 span').text(team.name);
  team.intro.forEach((element) => {
    $('<p>').text(element).appendTo(description);
  });
  if (team.product && team.product.length > 0) {
    $('<h4>').text('產品與服務').appendTo(description);
    team.product.forEach((element) => {
      $('<p>').text(element).appendTo(description);
    });
  }
  if (team.web) {
    buttonGroup.append(initSocialButton(0, team.web));
  }
  if (team.fb) {
    buttonGroup.append(initSocialButton(1, team.fb));
  }
}
function initSocialButton(type, url) {
  var icon = type ? 'fa fa-facebook' : 'fa fa-globe';
  var btn = $('<button>').attr('type', 'button').addClass('btn');
  $('<i>').addClass(icon).appendTo(btn);
  btn.bind('click', function () {
    window.location = url;
  });
  return btn;
}
function initImagesCarousel(team, year) {
  var list = $('.carousel-inner');
  var indicator = $('.carousel-indicators');
  var indicatorIndex = 0;
  var index = team.index;

  if (team.youtube) {
    var item = $('<div>').addClass('item').appendTo(list);
    $('<div>').attr('id', 'player').appendTo(item);
    $('<li>')
      .attr('data-target', '#myCarousel')
      .attr('data-slide-to', indicatorIndex)
      .appendTo(indicator);
    indicatorIndex++;
  }
  for (var i = 0; i < 2; i++) {
    if (i === 1 && index == 8) {
      continue;
    }
    var img = `./assets/images/${year}/${index}/carousel${i + 1}.jpg`;
    var item = $('<div>').addClass('item');
    $('<img>')
      .attr('src', img)
      .attr('onerror', 'this.src="./assets/images/sme.jpg"')
      .css('width', '100%')
      .appendTo(item);
    list.append(item);
    $('<li>')
      .attr('data-target', '#myCarousel')
      .attr('data-slide-to', indicatorIndex)
      .appendTo(indicator);
    indicatorIndex++;
  }
  list.children().first().addClass('active');
  indicator.children().first().addClass('active');
}

function initTeamsCarousel(data, year) {
  var list = $('#carousel_list');
  $(data).each(function (index, team) {
    var img = `./assets/images/${year}/${index}/logo.jpg`;
    var card = $('<div>')
      .addClass('thumbnail our-team')
      .attr('data-index', team.index)
      .attr('data-year', year);
    $('<img>').attr('src', img).attr('alt', 'test').appendTo(card);
    var content = $('<div>').addClass('team-content').appendTo(card);
    $('<h3>').addClass('title').text(team.name).appendTo(content);
    $('<span>').addClass('post').text(TAGS[team.tags]).appendTo(content);
    list.append(card);
  });
}

function getTeamIndex() {
  var results = new RegExp('[?&]team=([^&#]*)').exec(window.location.search);
  return results !== null ? results[1] || 0 : false;
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    $('#myCarousel').carousel('pause');
  }
  if (event.data === YT.PlayerState.PAUSED) {
    $('#myCarousel').carousel('cycle');
  }
}

function onYouTubeIframeAPIReady() {
  var height = '437';
  var width = '750';
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    height = '201';
    width = '345';
  }
  player = new YT.Player('player', {
    videoId: TEAMS[getTeamYear()][getTeamIndex()].youtube,
    height: height,
    width: width,
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

function getTeamYear() {
  var results = new RegExp('[?&]year=([^&#]*)').exec(window.location.search);
  return results !== null ? results[1] || 0 : false;
}

$(document).ready(function () {
  var teamIndex = getTeamIndex();
  var teamYear = getTeamYear();
  var data = TEAMS[teamYear];
  initIntro(data[teamIndex]);
  initImagesCarousel(data[teamIndex], teamYear);
  initTeamsCarousel(data, teamYear);
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

  $('div.thumbnail').click(function () {
    var team = $(this).attr('data-index');
    var year = $(this).attr('data-year');
    window.location = `./intro.html?team=${team}&year=${year}`;
  });

  $('#myCarousel').on('slide.bs.carousel', function () {
    if ($('#player').length) {
      player.stopVideo();
    }
  });

  $('#myCarousel').swipe({
    //Generic swipe handler for all directions
    swipe: function (
      event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
      if (direction === 'left') {
        $('#myCarousel').carousel('next');
      }
      if (direction === 'right') {
        $('#myCarousel').carousel('prev');
      }
    },
  });
});
