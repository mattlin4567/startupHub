function createCard(data) {
  var card = $("<div>")
    .addClass("card")
    .attr("data-toggle", "modal")
    .attr("data-target", "#teamModal")
    .attr("data-index", data.index);
  var img = $("<img>")
    .addClass("card-img-top")
    .attr("src", data.image)
    .attr("alt", "test")
    .appendTo(card);
  var body = $("<div>")
    .addClass("card-body")
    .appendTo(card);
  $("<h5>")
    .addClass("card-title")
    .text(data.name)
    .appendTo(body);
  $("<span>")
    .addClass("badge badge-primary")
    .text(TAGS[data.tags])
    .appendTo(body);
  return card;
}

function createCards(data) {
  var card = $("<div>")
    .addClass("thumbnail our-team");
  $("<img>")
    .attr("src", data.image)
    .attr("alt", "test")
    .appendTo(card);
  var content = $("<div>")
    .addClass("team-content")
    .appendTo(card);
  $("<h3>")
    .addClass("title")
    .text(data.name)
    .appendTo(content);
  $("<span>")  
    .addClass("post")
    .text(TAGS[data.tags])
    .appendTo(content);
  return card;
}

function initList(data) {
  var list = $("#teamList");
  var row = null;
  $(data).each(function(index, team) {
    if (index % 3 === 0) {
      list.append(row);
      row = $("<div>").addClass("row form-group");
    }
    var col = $("<div>")
      .addClass("col-md-4 col-sm-6")
      .appendTo(row);
    col.append(createCards(team));
  });
  list.append(row);
}

$(document).ready(function() {
  if (TEAMS.length > 0) {
    initList(TEAMS);
  }
});
