var POST_URL = "WEBBHOOK URL";

function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var items = [];

    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();
        try {
            var parts = answer.match(/[\s\S]{1,1020}/g) || [];
        } catch (e) {
            var parts = answer;
        }

        if (answer == "") {
            continue;
        }

        if(parts.length == 1) {
          items.push({
              "name": question,
              "value": parts[0],
              "inline": false
          });
        } else {
          items.push({
              "name": question,
              "value": parts[0].concat(" ..."),
              "inline": false
          });
        }
    }

    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "‌New feedback received!",
            "embeds": [{
                "title": "Feedback",
                "description": "[Open responses](".concat(form.getEditUrl(), "#responses)"),
                "color": 33023, // This is optional, you can look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html
                "fields": items,
                // "footer": {
                //     "text": "Some footer here"
                // }
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
