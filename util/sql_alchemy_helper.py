from sqlalchemy.sql import ClauseElement


class SQLAlchemyHelper(object):
    @staticmethod
    def get_or_create(session, model, defaults=None, **kwargs):
        instance = session.query(model).filter_by(**kwargs).first()
        if instance:
            return instance, False
        else:
            params = dict((k, v) for k, v in kwargs.items()
                          if not isinstance(v, ClauseElement))
            params.update(defaults or {})
            instance = model(**params)
            session.add(instance)
            session.flush()
            return instance, True

    @staticmethod
    def generate_slug(session, model, slug, number=None):
        if number:
            current_slug = slug + "-" + str(number)
        else:
            current_slug = slug

        instance = session.query(model).filter_by(slug=current_slug).first()
        if (not instance):
            return current_slug
        else:
            return SQLAlchemyHelper.generate_slug(session, model, slug,
                                                  (number and number + 1) or 2)
