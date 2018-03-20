from base import Session, engine, Base
from city import City
from major import Major
from university import University
import json

def get_major():
    all_majors =[]
    session = Session()
    majors = session.query(Major).limit(25).all()

    print('\n### All Majors')
    for m in majors :
        high_grads_cities = []
        for c in m.cities_high_graduates_2015 :
            high_grads_cities.append(c.id)
        high_grads_uni = []
        for uni in m.universities_high_graduates_2015 :
            high_grads_uni.append(uni.id)
        u = {
            'id' : m.id,
            'name' : m.name,
            'image_link' : m.image_link,
            'wage_growth_rate' : m.wage_growth_rate,
            'is_stem' : m.is_stem,
            'average_wage' : m.average_wage,
            'total_degrees_awarded_in_2015' : m.total_degrees_awarded_in_2015,
            'total_people_in_work_foce' : m.total_people_in_work_foce,
            'average_age_work_force' : m.average_age_work_force,
            'cities_high_graduates_2015' : high_grads_cities,
            'universities_high_graduates_2015' : high_grads_uni
        }
        all_majors.append(u)

    session.commit()
    session.close()

    return all_majors

def single_major (major_id) :
    try:
        session = Session()
        m = session.query(Major).filter_by(id=major_id).first()

        high_grads_cities = []
        for c in m.cities_high_graduates_2015 :
            temp_dict = {
                'id' : c.id, 
                'city_name' : c.city_name,
                'city_image_link' : c.city_image_link,
            }
            high_grads_cities.append(temp_dict)
        high_grads_uni = []
        for uni in m.universities_high_graduates_2015 :
            temp_dict = {
                'id' : uni.id,
                'name' : uni.name,
                'image_link' : uni.image_link
            }
            high_grads_uni.append(temp_dict)

        u = {
            'id' : m.id,
            'name' : m.name,
            'image_link' : m.image_link,
            'wage_growth_rate' : m.wage_growth_rate,
            'is_stem' : m.is_stem,
            'average_wage' : m.average_wage,
            'total_degrees_awarded_in_2015' : m.total_degrees_awarded_in_2015,
            'total_people_in_work_foce' : m.total_people_in_work_foce,
            'average_age_work_force' : m.average_age_work_force,
            'cities_high_graduates_2015' : high_grads_cities,
            'universities_high_graduates_2015' : high_grads_uni
            }
    except AttributeError:
        u= {}
    session.commit()
    session.close()
    return u

def get_major_limited():
    all_majors =[]
    session = Session()
    majors = session.query(Major).all()

    print('\n### All Majors')
    for m in majors :
        u = {
            'id' : m.id,
            'name' : m.name,
            'image_link' : m.image_link,

        }
        all_majors.append(u)

    session.commit()
    session.close()

    return all_majors