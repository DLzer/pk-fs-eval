from flask_rest_api import Blueprint
from flask.views import MethodView
from flask import request

from src.database import plans as orm
from src.schemas.plans import ResponsePlanSchema

blueprint = Blueprint(
    'plan',
    __name__
)


@blueprint.route("", methods=['GET'])
class NotesView(MethodView):

    @blueprint.response(schema=ResponsePlanSchema(many=True))
    def get(self):
        return orm.get_plans()