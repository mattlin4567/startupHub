function initIntro(team) {
  $("#team_name h4 span").text(team.name);
}

function initCarousel(data) {
  var list = $("#carousel_list");
  $(data).each(function(index, team) {
    var card = $("<div>")
      .addClass("thumbnail effect-bubba")
      .attr("data-index", team.index);
    $("<img>")
      .attr("src", team.image)
      .attr("alt", "test")
      .appendTo(card);
    var content = $("<div>")
      .addClass("team-content")
      .appendTo(card);
    $("<h3>")
      .text(team.name)
      .appendTo(content);
    $("<p>")
      .text(TAGS[team.tags])
      .appendTo(content);
    list.append(card);
  });
}

function getTeamIndex() {
  var results = new RegExp("[?&]team=([^&#]*)").exec(window.location.search);
  return results !== null ? results[1] || 0 : false;
}

$(document).ready(function() {
  var teamIndex = getTeamIndex();
  initIntro(TEAMS[teamIndex]);
  initCarousel(TEAMS);
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: ["", ""],
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

  $("div.thumbnail").click(function() {
    window.location = "./intro.html?team=" + $(this).attr("data-index");
  });
});
