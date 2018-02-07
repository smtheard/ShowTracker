import json
import simplejson
import datetime


class CustomJSONEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, (datetime.date, datetime.datetime)):
            return obj.isoformat()
        return super().default(obj)

simplejson._default_encoder = CustomJSONEncoder() # pylint: disable=W0212
json._default_encoder = CustomJSONEncoder() # pylint: disable=W0212
