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
  if (team.ig) {
    buttonGroup.append(initSocialButton(2, team.ig));
  }
  if (team.podcast) {
    buttonGroup.append(initSocialButton(3, team.podcast));
  }
}
function initSocialButton(type, url) {
  var icon = '';
  switch (type) {
    case 0:
      icon = 'fa fa-globe';
      break;
    case 1:
      icon = 'fa fa-facebook';
      break;
    case 2:
      icon = 'fa fa-instagram';
      break;
    case 3:
      icon = 'fa fa-bullhorn';
      break;
    default:
      return;
  }
  var btn = $('<button>').attr('type', 'button').addClass('btn');
  $('<i>').addClass(icon).appendTo(btn);
  btn.bind('click', function () {
    window.open(url, '_blank').focus();
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
    var container = $('<div>').addClass('video-container').appendTo(item);
    $('<div>').attr('id', 'player').appendTo(container);
    $('<li>')
      .attr('data-target', '#myCarousel')
      .attr('data-slide-to', indicatorIndex)
      .appendTo(indicator);
    indicatorIndex++;
  }
  for (var i = 0; i < 2; i++) {
    var item = $('<div>').addClass('item').appendTo(list);
    var img = `./assets/images/${year}/${index}/carousel${i + 1}.jpg`;
    $('<img>')
      .attr('src', img)
      .attr('onerror', 'this.src="./assets/images/sme.jpg"')
      .css('width', '100%')
      .appendTo(item);
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
  player = new YT.Player('player', {
    videoId: TEAMS[getTeamYear()][getTeamIndex()].youtube,
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

  var carouselInner = $('.carousel-inner');
  carouselInner.height(Math.ceil($(carouselInner).width() / 16 * 9));
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
