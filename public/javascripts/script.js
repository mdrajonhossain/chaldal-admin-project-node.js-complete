$(document).ready(function () {
  $("#basic-addon2").click(function () {
    let passwordField = $("#password");
    let passwordFieldAttr = passwordField.attr("type");

    if (passwordFieldAttr == "password") {
      passwordField.attr("type", "text");
      $(this).html('<i class="fa fa-eye-slash" aria-hidden="true"></i>');
    } else {
      passwordField.attr("type", "password");
      $(this).html('<i class="fa fa-eye" aria-hidden="true"></i>');
    }
  });
});