from flask import Flask
from flask_cors import CORS
from flask_rest_api import Api
from src.blueprints import claims_blueprint
from src.blueprints import plans_blueprint
from src.config import EnvConfig


def create_app():
    app = Flask("Pumpkin Fullstack Test")

    app.config.from_object(EnvConfig())

    CORS(
        app,
        send_wildcard=True,
        expose_headers='Content-Range,Access-Control-Allow-Origin,Access-Control-Allow-Headers'
    )

    api = Api(app)
    api.register_blueprint(claims_blueprint.blueprint, url_prefix='/claims')
    api.register_blueprint(plans_blueprint.blueprint, url_prefix='/plans')
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(port=8085, host='0.0.0.0', debug=True)
