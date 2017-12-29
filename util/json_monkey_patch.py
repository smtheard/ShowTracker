import json, datetime


class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.date) or isinstance(
                obj, datetime.datetime):
            return obj.isoformat()
        else:
            return super().default(obj)


json._default_encoder = CustomJSONEncoder()
