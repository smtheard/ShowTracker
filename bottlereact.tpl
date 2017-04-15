<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8" />
    <title>{{title}}</title>

    {{! deps }}

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.blue_grey-blue.min.css"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.0/react-with-addons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.0/react-dom.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
            crossorigin="anonymous"></script>
    <script src="static/js/helpers.js"></script>
  </head>

  <body>
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