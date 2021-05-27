$(() => {
  $("#submitBtn").click((evt) => {
    evt.preventDefault();
    var jsonBody = {};
    jsonBody.fromEmail = $("#fromEmail").val();
    jsonBody.fromName = $("#fromName").val();
    jsonBody.subject = $("#subject").val();
    jsonBody.htmlBody = escape($("#MailBody").val());
    jsonBody.toEmails = $("#toEmails").val().split("\n");

    if (jsonBody.toEmails[jsonBody.toEmails.length - 1] === "")
      jsonBody.toEmails.pop();

    console.log(jsonBody);

    fetch(window.location.origin+"/sendmail", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status === "success") alert("Mail Sent Successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  $("#seePreview").click((evt) => {
    evt.preventDefault();
    $("#previewWindow").attr("srcdoc", $("#MailBody").val());
  });
});
