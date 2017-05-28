<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8" />
    <title>{{title}}</title>



    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.blue_grey-blue.min.css"/>
    <link rel="stylesheet" href="http://localhost:8080/static/css/react-big-calendar.css"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js"></script>
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
            crossorigin="anonymous"></script>
    <script src="http://localhost:8080/static/js/helpers.js"></script>
  </head>

  <body>
    <script type="text/javascript" src="http://localhost:8080/static/js/bundle.js" charset="utf-8"></script>
    {{! deps }}
    <div id="__body__">
      <center style='margin:4em 0;'>
        Loading...
      </center>
    </div>

    <div aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-snackbar mdl-js-snackbar">
        <div class="mdl-snackbar__text"></div>
        <button type="button" class="mdl-snackbar__action"></button>
    </div>
  </body>
  
{{! init }}

</html>
