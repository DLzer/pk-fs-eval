from flask_rest_api import Blueprint
from flask.views import MethodView
from flask import request
from src.database import claims as orm
from src.database import claim_line_items as cl_orm
from src.models.exceptions.http_exceptions import HTTPResourceNotFound
from src.schemas.claims import ResponseClaimSchema

blueprint = Blueprint(
    'claims',
    __name__
)


@blueprint.route("", methods=['GET'])
class NotesView(MethodView):

    @blueprint.response(schema=ResponseClaimSchema(many=True))
    def get(self):
        return orm.get_claims()


@blueprint.route("/<uuid:claim_id>", methods=['GET'])
class NotesView(MethodView):

    @blueprint.response(schema=ResponseClaimSchema)
    def get(self, claim_id):
        claim = orm.get_claims_for_id(claim_id)
        if claim is None:
            raise HTTPResourceNotFound
        return claim

@blueprint.route("/set", methods=['POST'])
class NotesView(MethodView):

    @blueprint.response()
    def post(self):
        return cl_orm.set_line_item_decision(request.get_json())