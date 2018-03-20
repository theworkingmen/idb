from application import application
import logging
from uni_api_func import *
from major_api_func import *
from cities_api_func import *
from flask import Flask, request, jsonify, Response, json


@application.route('/')
def home():
    return "hello world"

@application.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

@application.route('/universities', methods = ['GET'])
def get_Universities ():
    allUni = get_uni()
    totalCount = len(allUni)
    payload = {'totalCount': totalCount, 'records': allUni}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/universities/<id>', methods = ['GET'])
def get_Single_Uni(id):
    u = single_uni(id)
    if not bool(u) :
        response = "Server Error 500: Invalid university_id"
    else :
        response = Response(json.dumps(u), mimetype='application/json')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/universities_limited', methods = ['GET'])
def get_Universities_Limited ():
    allUni = get_uni_limited()
    totalCount = len(allUni)
    payload = {'totalCount': totalCount, 'records': allUni}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/majors', methods = ['GET'])
def get_Majors ():
    allMajor = get_major()
    totalCount = len(allMajor)
    payload = {'totalCount': totalCount, 'records': allMajor}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/majors/<id>', methods = ['GET'])
def get_Single_Major(id):
    u = single_major(id)
    if not bool(u) :
        response = "Server Error 500: Invalid major_id"
    else :
        response = Response(json.dumps(u), mimetype='application/json')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/majors_limited', methods = ['GET'])
def get_Majors_Limited ():
    allMajor = get_major_limited()
    totalCount = len(allMajor)
    payload = {'totalCount': totalCount, 'records': allMajor}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/cities', methods = ['GET'])
def get_Cities ():
    allCity = get_city()
    totalCount = len(allCity)
    payload = {'totalCount': totalCount, 'records': allCity}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/cities/<id>', methods = ['GET'])
def get_Single_City(id):
    u = single_city(id)
    if not bool(u) :
        response = "Server Error 500: Invalid city_id"
    else :
        response = Response(json.dumps(u), mimetype='application/json')

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/cities_limited', methods = ['GET'])
def get_Cities_Limited ():
    allCity = get_city_limited()
    totalCount = len(allCity)
    payload = {'totalCount': totalCount, 'records': allCity}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
