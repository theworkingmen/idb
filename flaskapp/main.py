import logging
from flask import Flask, request, jsonify, Response, json
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://workingmen:Downingsoft@majorpotential-db.coujqf2v990h.us-east-1.rds.amazonaws.com/Major_Potential'
db = SQLAlchemy(app)
from university import *
from routes import *



"""
class University (db.Model):
    __tablename__ = "universities"
    pk = db.Column(db.VARCHAR(60), primary_key = True)
    name = db.Column(db.VARCHAR(60))
    summary = db.Column(db.TEXT)
    city = db.Column(db.VARCHAR(22))
    state = db.Column(db.CHAR(2))
    #social assoicated table
    num_restaurants = db.Column(db.Integer)
    ranking = db.Column(db.Integer)
    acceptance_rate= db.Column(db.DECIMAL(4,1))
    in_state_tuition = db.Column(db.Integer)
    out_state_tuition = db.Column(db.Integer)
    image = db.Column(db.VARCHAR(300))

    @property
    def serializeName(self):
        return self.name

@app.route('/universities', methods=['GET'])
def getUniversities():
    allUni = []

    #aditional parameters to be implemented later
#    off = request.args.get('limit', '30').encode('utf-8')
#    limit = request.args.get('offset','0').encode('utf-8')

    query = db.session.query(University)
#    universities = query.limit(limit).offset(off).all()
    universities = query.all()

    totalCount = query.count()

    for uni in universities:
        u = {

            'type' : "university",
            'pk' : uni.pk,
            'name': uni.name,
            'summary': uni.summary,
            'city': uni.city,
            'state': uni.state,
            'num_restaurants': uni.num_restaurants,
            'ranking': uni.ranking,
            'acceptance_rate': uni.acceptance_rate,
            'tutionin': uni.in_state_tuition,
            'tutionout': uni.out_state_tuition,
            'image': uni.image
        }
        allUni.append(u)

    payload = {'totalCount': totalCount, 'records': allUni}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200

    return response
    #return 'test_test'

@app.route('/universities/<university_name>', methods = ['GET'])
def getSingleUniversity(university_name):
    try:
        uni = db.session.query(University).filter_by(pk=university_name).first()
        u = {

            'type' : "university",
            'pk' : uni.pk,
            'name': uni.name,
            'summary': uni.summary,
            'city': uni.city,
            'state': uni.state,
            'num_restaurants': uni.num_restaurants,
            'ranking': uni.ranking,
            'acceptance_rate': uni.acceptance_rate,
            'tutionin': uni.in_state_tuition,
            'tutionout': uni.out_state_tuition,
            'image': uni.image
        }
        response = Response(json.dumps(u), mimetype='application/json')
    except AttributeError:
        response = "Server Error 500: Invalid university_name"
    return response

@app.route('/')
def hello_world():
    return 'hello_world'
"""
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)