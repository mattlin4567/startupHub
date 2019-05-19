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

function initList(data) {
  var list = $("#teamList");
  var row = null;
  $(data).each(function(index, team) {
    if (index % 4 === 0) {
      list.append(row);
      row = $("<div>").addClass("row");
    }
    var col = $("<div>")
      .addClass("col-6 col-sm-6 col-md-3 mb-4")
      .appendTo(row);
    col.append(createCard(team));
  });
  list.append(row);
}

$(document).ready(function() {
  if (TEAMS.length > 0) {
    initList(TEAMS);
  }
  $("#teamModal").on("show.bs.modal", function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var teamIndex = button.data("index"); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var team = TEAMS[teamIndex];
    var modal = $(this);
    modal.find(".modal-title").text(team.name);
    modal
      .find("img")
      .attr("src", team.image)
      .attr("alt", team.name);
    var list = modal.find("#modal-detail");
    $("<li>")
      .text(team.name)
      .appendTo(list);
    $("<li>")
      .text(team.intro)
      .appendTo(list);
  });

  $("#teamModal").on("hide.bs.modal", function(event) {
    var modal = $(this);
    modal.find("#modal-detail").empty();
  });
});
