"use strict";

$(function() {
  // Hide content divs.
  $("#categSection").hide();
  $("#servSection").hide();
  $("#servInfo").hide();

  // Begin getJSON for categories.
  $.getJSON("api/categories", function(data) {
    let categories = data;

    // Begin loop to load 1st dropdown.
    for (let i = 0; i < categories.length; i++) {
      // Append to dropdown.
      $("#categorySelector").append("<a id=catid" + i + ">");
      $("#catid" + i).text(categories[i].Category);
      $("#catid" + i).attr("href", "#");
      $("#catid" + i).attr("class", "text-reset");
      $("#catid" + i).css("text-decoration", "none");
      $("#categorySelector").append("</a><br>");

      $("#catid" + i).on("click", function() {
        getServices(categories[i].Value);
        $("#servSection").show();
      });
    }
  });
  // End getJSON for categories.

  // Begin getServices function
  function getServices(cat) {
    // Begin getJSON for **.
    $.getJSON("api/services/bycategory/" + cat, function(data) {
      let services = data;
      $("#servSection").empty();

      // Begin loop to load 2nd dropdown.
      for (let i = 0; i < services.length; i++) {
        $("#servSection").append("<a id=servid" + i + ">");
        $("#servid" + i).text(services[i].ServiceName);
        $("#servid" + i).attr("href", "#");
        $("#servid" + i).prop("class", "text-reset");
        $("#servSection").append("</a><br>");
        $("#servid" + i).on("click", function() {
          getServiceInfo(services[i].ServiceID);
          $("#servInfo").show();
        });
      }
    });
    // End getJSON for **.
  }
  // End getServices function

  // Begin getServiceInfo function
  function getServiceInfo(id) {
    // Begin getJSON for **.
    $.getJSON("api/services/" + id, function(data) {
      let servInfo = data;

      $(".card-header").text("");
      $(".card-title").text("");
      $(".card-text").text("");

      $(".card-header").text(servInfo.ServiceName);
      $(".card-title").text(servInfo.Description);
      $(".card-price").text("Price: " + servInfo.Price);
      $(".card-stock").text(
        "Length Of Service: " + servInfo.Minutes + " minutes"
      );
    });
  }
  // End getServiceInfo function

  // Begin First button click handler
  $("#firstButton").on("click", function() {
    $("#categSection").show();
    // Disables first button and changes color to red on click.
    $("#firstButton")
      .attr("disabled", "true")
      .attr("class", "btn btn-danger mt-4 col-4 offset-4");
  });
  // End First button click handler
});
