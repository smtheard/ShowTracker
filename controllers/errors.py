import requests
import bottle
from bottle import request # pylint: disable=unused-import
from config import app, PROD, MAILGUN_API_KEY

ERROR_PAGE_TEMPLATE = """
%%try:
    %%from %s import request
    <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
    <html>
        <head>
            <title>Error: {{e.status}}</title>
            <style type="text/css">
              html {background-color: #eee; font-family: sans-serif;}
              body {background-color: #fff; border: 1px solid #ddd;
                    padding: 15px; margin: 15px;}
              pre {background-color: #eee; border: 1px solid #ddd; padding: 5px;}
            </style>
        </head>
        <body>
            <h1>Error: {{e.status}}</h1>
            <p>Sorry, the requested URL <tt>{{repr(request.url)}}</tt>
               caused an error:</p>
            <pre>{{e.body}}</pre>
            %%if e.exception:
              <h2>Exception:</h2>
              %%try:
                %%exc = repr(e.exception)
              %%except:
                %%exc = '<unprintable %%s object>' %% type(e.exception).__name__
              %%end
              <pre>{{exc}}</pre>
            %%end
            %%if e.traceback:
              <h2>Traceback:</h2>
              <pre>{{e.traceback}}</pre>
            %%end
        </body>
    </html>
%%except ImportError:
    <b>ImportError:</b> Could not generate the error page. Please add bottle to
    the import path.
%%end
""" % __name__

@app.error(500)
def error_handler_500(error):
    html_error = bottle.template(ERROR_PAGE_TEMPLATE, e=error)
    try:
        exception_name = repr(error.exception)
    except: # pylint: disable=bare-except
        exception_name = '<unprintable %s object>' % type(error.exception).__name__
    if PROD:
        requests.post(
        "https://api.mailgun.net/v3/sandbox833bf39c440e45b485e60456e15581f2.mailgun.org/messages",
        auth=("api", MAILGUN_API_KEY),
        data={"from": "Overseer.TV Error <overseertverrors@gmail.com>",
              "to": "Overseer.TV Error <overseertverrors@gmail.com>",
              "subject": "[EXCEPTION] " + exception_name,
              "html": html_error})
        return "Something went wrong. Overseer.TV Administrators have been notified."
    return html_error
