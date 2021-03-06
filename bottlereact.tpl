<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8" />
    <title>{{title}}</title>

    <link rel="apple-touch-icon" sizes="180x180" href="/static/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon-16x16.png">
    <link rel="manifest" href="/static/img/manifest.json">
    <link rel="mask-icon" href="/static/img/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="/static/img/favicon.ico">
    <meta name="msapplication-config" content="/static/img/browserconfig.xml">
    <meta name="theme-color" content="#607d8b">

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.blue_grey-blue.min.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js" integrity="sha256-WRc/eG3R84AverJv0zmqxAmdwQxstUpqkiE+avJ3WSo=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/static/css/react-big-calendar.css"/>
    <link rel="stylesheet" href="/static/css/style.css"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js"></script>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
            crossorigin="anonymous"></script>
    <script src="/static/js/helpers.js"></script>
    <script src="/static/js/overseer_google_analytics.js"></script>
  </head>

  <body>
    <script type="text/javascript" src="/static/js/bundle.js" charset="utf-8"></script>
    {{! deps }}
    <div id="__body__">

      <center style='margin:4em 0;'>
      </center>

    </div>

    <div aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-snackbar mdl-js-snackbar">
        <div class="mdl-snackbar__text"></div>
        <button type="button" class="mdl-snackbar__action"></button>
    </div>
  </body>

  {{! init }}

</html>
