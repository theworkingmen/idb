import logging
from flask import Flask, request, jsonify, Response, json
import sqlalchemy

application = Flask(__name__)
application.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://theworkingmen:cs373downing@majorpotential-new.coujqf2v990h.us-east-1.rds.amazonaws.com/majorpotential'
from routes import *

if __name__ == '__main__':
    application.run(threaded=True)
