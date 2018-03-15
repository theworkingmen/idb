from flask import Flask, request, jsonify, Response, json
from main import app, db 
from models import University

#GET ALL UNIVERSITIES
"""
/universities endpoint
?params:
    +offset - int, default 0
    +limit - int, default 30


"""

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