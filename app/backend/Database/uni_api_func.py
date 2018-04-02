from base import Session, engine, Base
from city import City
from major import Major
from university import University
from sqlalchemy import or_
import json

def get_uni(sort_tut, sort_name, f_type, state):
    all_uni =[]
    session = Session()
    universities = session.query(University)

    print("Sort tution: " + sort_tut + "\nSort name: " + sort_name + "\nFilter uni type: " + f_type + "\nState: " + state)
    #match is the way to go, don't use .like() for postgres
    if f_type != 'None':
        universities = universities.filter(University.uni_type.match(f_type))

    if state != 'None':
        universities = universities.filter(University.state == state)

    if sort_name == 'Desc':
        # Sort by name, descending
        universities = universities.order_by(University.name.desc()).all()
    elif sort_tut == 'Asc' or sort_tut == 'Desc' :
        if sort_tut == 'Asc' :
            # Sort by in-state tuition, ascending
            universities = universities.order_by(University.state_tuition).all()
        else :
            # Sort by in-state tuition, descending
            universities = universities.order_by(University.state_tuition.desc()).all()
    else :
        # Sort by name, ascending (default)
        universities = universities.order_by(University.name).all()

    #add in ordering later

    #universities = session.query(University).all()
    print('\n### All Universities')
    for uni in universities :
        top_majors = []
        for m in uni.majors :
            top_majors.append(m.id)

        u = {

            'type' : "university",
            'id' : uni.id,
            'name' : uni.name,

            'city_id' : uni.city_id,
            'city' :  uni.city.city_name,
            'top_majors' : top_majors,

            'website' : uni.website,
            'survey_year': uni.survey_year,
            'oos_tuition' : uni.oos_tuition,
            'state_tuition' : uni.state_tuition,
            'image_link' : uni.image_link,
            'demographics_asian' : uni.demographics_asian,
            'demographics_black' : uni.demographics_black,
            'demographics_white' : uni.demographics_white,
            'demographics_other' : uni.demographics_other,
            'demographics_hispanic' : uni.demographics_hispanic,
            'enrolled_women' : uni.enrolled_women,
            'enrolled_men' : uni.enrolled_men,
            'longitude' : uni.longitude,
            'latitude' : uni.latitude,
            'state' : uni.state,
            'county_id' : uni.county_id,
            'uni_type' : uni.uni_type

        }
        all_uni.append(u)

    session.commit()
    session.close()

    return all_uni

def single_uni (uni_id) :
    try:
        session = Session()
        uni = session.query(University).filter_by(id=uni_id).first()
        top_majors = []
        for m in uni.majors :
            temp_dict = {
                'id' : m.id,
                'name' : m.name,
                'image_link' : m.image_link
            }
            top_majors.append(temp_dict)

        u = {

            'type' : "university",
            'id' : uni.id,
            'name' : uni.name,

            'city_id' : uni.city_id,
            'city' :  uni.city.city_name,
            'majors' : top_majors,

            'website' : uni.website,
            'survey_year': uni.survey_year,
            'oos_tuition' : uni.oos_tuition,
            'state_tuition' : uni.state_tuition,
            'image_link' : uni.image_link,
            'demographics_asian' : uni.demographics_asian,
            'demographics_black' : uni.demographics_black,
            'demographics_white' : uni.demographics_white,
            'demographics_other' : uni.demographics_other,
            'demographics_hispanic' : uni.demographics_hispanic,
            'enrolled_women' : uni.enrolled_women,
            'enrolled_men' : uni.enrolled_men,
            'longitude' : uni.longitude,
            'latitude' : uni.latitude,
            'state' : uni.state,
            'county_id' : uni.county_id,
            'uni_type' : uni.uni_type

            }
    except AttributeError:
        u= {}
    session.commit()
    session.close()
    return u

def get_uni_limited(sort_tut, sort_name, f_type, state):
    all_uni =[]
    session = Session()
    universities = session.query(University)

    print("Sort tution: " + sort_tut + "\nSort name: " + sort_name + "\nFilter uni type: " + f_type + "\nState: " + state)
    #match is the way to go, don't use .like() for postgres
    if f_type != 'None':
        universities = universities.filter(University.uni_type.match(f_type))

    if state != 'None':
        universities = universities.filter(University.state == state)

    if sort_name == 'Desc':
        # Sort by name, descending
        universities = universities.order_by(University.name.desc()).all()
    elif sort_tut == 'Asc' or sort_tut == 'Desc' :
        if sort_tut == 'Asc' :
            # Sort by in-state tuition, ascending
            universities = universities.order_by(University.state_tuition).all()
        else :
            # Sort by in-state tuition, descending
            universities = universities.order_by(University.state_tuition.desc()).all()
    else :
        # Sort by name, ascending (default)
        universities = universities.order_by(University.name).all()

    print('\n### Universities Limited')
    for uni in universities :
        u = {

            'id' : uni.id,
            'name' : uni.name,
            'image_link' : uni.image_link,
            'type' : uni.uni_type
        }
        all_uni.append(u)

    session.commit()
    session.close()

    return all_uni

def search_Universities (terms):
    all_uni =[]
    session = Session()
    universities = session.query(University)
    for t in terms :
        # search name, state, city, and type
        universities = universities.filter(or_(University.name.ilike('%' + t + '%'), \
            University.state.ilike('%' + t + '%'), \
            University.uni_type.ilike('%' + t + '%')))
    for uni in universities :
        u = {

            'id' : uni.id,
            'name' : uni.name,
            'image_link' : uni.image_link,
            'state' : uni.state,
            'type' : uni.uni_type
        }
        all_uni.append(u)
    session.commit()
    session.close()
    return all_uni
