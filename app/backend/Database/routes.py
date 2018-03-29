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

    sort_tut = request.args.get('sort_tut', 'None').encode('utf-8')
    sort_name = request.args.get('sort_name', 'None').encode('utf-8')
    order = request.args.get('sort_by', 'default').encode('utf-8')
    #Filter by type of universitiy (public or private) 
    f_type = request.args.get('type', 'None').encode('utf-8')
    state = request.args.get('state', 'None').encode('utf-8')

    allUni = get_uni(sort_tut, sort_name, order, f_type, state)
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

    sort_tut = request.args.get('sort_tut', 'None').encode('utf-8')
    sort_name = request.args.get('sort_name', 'None').encode('utf-8')
    order = request.args.get('sort_by', 'default').encode('utf-8')
    #Filter by type of universitiy (public or private) 
    f_type = request.args.get('type', 'None').encode('utf-8')
    state = request.args.get('state', 'None').encode('utf-8')

    allUni = get_uni_limited(sort_tut, sort_name, order, f_type, state)
    totalCount = len(allUni)
    payload = {'totalCount': totalCount, 'records': allUni}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/majors', methods = ['GET'])
def get_Majors ():
    #sort by average wage major makes
    sort_wage = request.args.get('wage', 'None').encode('utf-8')
    #sort by number in workforce for major
    sort_work = request.args.get('work', 'None').encode('utf-8')
    #order by ascending (asc) or descending (desc)
    order = request.args.get('sort_by', 'default').encode('utf-8')
    #filter by if the major is in STEM field
    stem = request.args.get('is_stem', 'None').encode('utf-8')
    #range filtering, set thresholds for filtering 

    allMajor = get_major(sort_wage, sort_work, order, stem)
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
    #sort by average wage major makes
    sort_wage = request.args.get('wage', 'None').encode('utf-8')
    #sort by number in workforce for major
    sort_work = request.args.get('work', 'None').encode('utf-8')
    #order by ascending (asc) or descending (desc)
    order = request.args.get('sort_by', 'default').encode('utf-8')
    #filter by if the major is in STEM field
    stem = request.args.get('is_stem', 'None').encode('utf-8')
    #range filtering, set thresholds for filtering 
    allMajor = get_major_limited(sort_wage, sort_work, order, stem)
    totalCount = len(allMajor)
    payload = {'totalCount': totalCount, 'records': allMajor}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/cities', methods = ['GET'])
def get_Cities ():
    sort_name = request.args.get('sort_name', 'None').encode('utf-8')
    sort_pop = request.args.get('sort_pop', 'None').encode('utf-8')
    state = request.args.get('state', 'None').encode('utf-8')
    allCity = get_city(sort_name, sort_pop, state)
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
    sort_name = request.args.get('sort_name', 'None').encode('utf-8')
    sort_pop = request.args.get('sort_pop', 'None').encode('utf-8')
    state = request.args.get('state', 'None').encode('utf-8')
    allCity = get_city_limited(sort_name, sort_pop, state)
    totalCount = len(allCity)
    payload = {'totalCount': totalCount, 'records': allCity}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
