"use strict";

$(function() {
  // Hide content divs.
  $("#categSection").hide();
  $("#servSection").hide();
  $("#servInfo").hide();

  // Begin getJSON for categories.
  $.getJSON("api/categories", function(data) {
    let categories = data;
    let catlength = categories.length;

    // Begin loop to load 1st dropdown.
    for (let i = 0; i < catlength; i++) {
      // Append to dropdown.
      $("#categorySelector").append("<a id=catid" + i + ">");
      $("#catid" + i).text(categories[i].Category);
      $("#catid" + i).attr("href", "#");
      $("#catid" + i).attr("class", "text-reset");
      $("#categorySelector").append("</a><br>");

      // Wire click handlers to each category option.
      $("#catid" + i).on("click", function() {
        getServices(categories[i].Value);
        $("#servSection").show();
        $("#servInfo").hide();
      });
    }
  });
  // End getJSON for categories.

  // Begin getServices function
  function getServices(cat) {
    // Begin getJSON for services.
    $.getJSON("api/services/bycategory/" + cat, function(data) {
      let services = data;
      $("#servSection").empty();
      let slength = services.length;

      $("#servSection").append("<h2>Services We Offer</h2>");
      // Begin loop to load 2nd dropdown.
      for (let i = 0; i < slength; i++) {
        $("#servSection").append("<ul><li><a id=servid" + i + ">");
        $("#servid" + i).text(services[i].ServiceName);
        $("#servid" + i).attr("href", "#");
        $("#servid" + i).prop("class", "text-reset");
        $("#servSection").append("</a></li></ul><br>");
        $("#servSection").prop("class", "p-3 m-5");
        // Wire click handler for each service option.
        $("#servid" + i).on("click", function() {
          getServiceInfo(services[i].ServiceID);
          $("#servInfo").show();
        });
      }
    });
    // End getJSON for services.
  }
  // End getServices function

  // Begin getServiceInfo function
  function getServiceInfo(id) {
    // Begin getJSON for service info.
    $.getJSON("api/services/" + id, function(data) {
      let servInfo = data;
      // Clears previous card info.
      $(".card-header").text("");
      $(".card-title").text("");
      $(".card-text").text("");

      // Populates info into clean card.
      $(".card-header").text(servInfo.ServiceName);
      $(".card-title").text(servInfo.Description);
      $(".card-price").text("Price: $" + servInfo.Price);
      $(".card-time").text(
        "Length Of Service: " + servInfo.Minutes + " minutes"
      );
    });
  }
  // End getServiceInfo function

  // Begin First button click handler
  $("#firstButton").on("click", function() {
    $("#homeSection").hide();
    $("#categSection").show();
  });
  // End First button click handler
  // Begin Home button click handler
  $("#homeButton").on("click", function() {
    $("#homeSection").show();
    $("#categSection").hide();
    $("#servSection").hide();
    $("#servInfo").hide();
  });
  // End Home Button click handler
});
