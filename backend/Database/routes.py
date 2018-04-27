from application import application
import logging
from Universities.uni_api_func import *
from Majors.major_api_func import *
from Cities.cities_api_func import *
from exception import NotFoundException
from flask import Flask, request, jsonify, Response, json, render_template

import re

@application.route('/')
def home():

    ret = ('<!DOCTYPE html><html><body><h2>Welcome to the majorpotential API'+
    '</h2><a href="https://theworkingmen.gitbooks.io/api/">Here is our API Doc</a></html>')
    return ret

@application.errorhandler(404)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return render_template('404.html'), 404

@application.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return render_template('500.html'), 500

@application.errorhandler(NotFoundException)
def server_error(e):
    logging.exception(e.message)
    return render_template('404.html'), 404

@application.route('/universities', methods = ['GET'])
def get_Universities ():

    sort_tut = request.args.get('sort_tut', 'None')
    sort_name = request.args.get('sort_name', 'None')
    #Filter by type of universitiy (public or private)
    f_type = request.args.get('type', 'None')
    state = request.args.get('state', 'None')

    allUni = get_uni(sort_tut, sort_name, f_type, state)
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
        raise NotFoundException("University with id " + str(id) + " not found.")
    else :
        response = Response(json.dumps(u), mimetype='application/json')
        response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/universities_limited', methods = ['GET'])
def get_Universities_Limited ():

    sort_tut = request.args.get('sort_tut', 'None')
    sort_name = request.args.get('sort_name', 'Asc')
    #Filter by type of universitiy (public or private)
    f_type = request.args.get('type', 'None')
    state = request.args.get('state', 'None')

    allUni = get_uni_limited(sort_tut, sort_name, f_type, state)
    totalCount = len(allUni)
    payload = {'totalCount': totalCount, 'records': allUni}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/majors', methods = ['GET'])
def get_Majors ():
    #sort by major name
    sort_name = request.args.get('sort_name', 'Asc')
    #sort by average wage major makes
    sort_wage = request.args.get('sort_wage', 'None')
    #sort by number in workforce for major
    sort_work = request.args.get('sort_work', 'None')
    #filter by if the major is in STEM field
    stem = request.args.get('is_stem', 'None')
    #range filtering, set thresholds for filtering

    allMajor = get_major(sort_name, sort_wage, sort_work, stem)
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
        raise NotFoundException("Major with id " + str(id) + " not found.")
    else :
        response = Response(json.dumps(u), mimetype='application/json')
        response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/majors_limited', methods = ['GET'])
def get_Majors_Limited ():
    #sort by major names
    sort_name = request.args.get('sort_name', 'Asc')
    #sort by average wage major makes
    sort_wage = request.args.get('sort_wage', 'None')
    #sort by number in workforce for major
    sort_work = request.args.get('sort_work', 'None')
    #filter by if the major is in STEM field
    stem = request.args.get('is_stem', 'None')
    #range filtering, set thresholds for filtering
    allMajor = get_major_limited(sort_name, sort_wage, sort_work, stem)
    totalCount = len(allMajor)
    payload = {'totalCount': totalCount, 'records': allMajor}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/cities', methods = ['GET'])
def get_Cities ():
    sort_name = request.args.get('sort_name', 'Asc')
    sort_pop = request.args.get('sort_pop', 'None')
    state = request.args.get('state', 'None')
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
        raise NotFoundException("City with id " + str(id) + " not found.")
    else :
        response = Response(json.dumps(u), mimetype='application/json')
        response.status_code = 200

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/cities_limited', methods = ['GET'])
def get_Cities_Limited ():
    sort_name = request.args.get('sort_name', 'Asc')
    sort_pop = request.args.get('sort_pop', 'None')
    state = request.args.get('state', 'None')
    allCity = get_city_limited(sort_name, sort_pop, state)
    totalCount = len(allCity)
    payload = {'totalCount': totalCount, 'records': allCity}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/search/', methods = ['GET'])
def search_empty():
    return search("");

@application.route('/search/<query>', methods = ['GET'])
def search (query):
    query = str(query)
    # Sanitize input, only allow alphanumerics and hyphens (and whitespace)
    query = re.sub('[^a-zA-Z0-9-\s]','',query)
    # Split the query string into separate words
    terms = list(query.split(' '))
    # Generate individual payloads for each model, appended to giant list
    pre_payload = []
    pre_payload.append(search_Universities(terms))
    pre_payload.append(search_Majors(terms))
    pre_payload.append(search_Cities(terms))
    # Build final payload
    final_size = len(pre_payload[0]) + len(pre_payload[1]) + len(pre_payload[2])
    final_payload = {'totalCount': final_size, 'records': {'Universities': pre_payload[0], \
        'Majors' : pre_payload[1], 'Cities' : pre_payload[2]}}
    response = Response(json.dumps(final_payload), mimetype='application/json')
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
