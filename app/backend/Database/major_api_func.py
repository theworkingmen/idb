from base import Session, engine, Base
from city import City
from major import Major
from university import University
from sqlalchemy import or_
import json

def get_major(sort_name, sort_wage, sort_work, stem):
    all_majors =[]
    session = Session()
    majors = session.query(Major)

    if stem == 'yes' :
        majors = session.query(Major).filter(Major.is_stem != 0)
    elif stem == 'no' :
        majors = session.query(Major).filter(Major.is_stem == 0)

    print("Sort name: " + sort_name + "\nSort wage: "+ sort_wage + "\nSort_work: " + sort_work + "\nis stem: " + stem)
    #Note, for now you can only call one sort function, wage or work, and can
    #choose the ordering.
    cast = majors.all()

    if sort_wage == 'Asc' or sort_wage == 'Desc':
        if sort_wage == 'Desc':
            # Sort by average wage, descending
            majors = majors.order_by(Major.average_wage.desc()).all()
        else :
            # Sort by average wage, ascending
            majors = majors.order_by(Major.average_wage).all()
    elif sort_work == 'Asc' or sort_work == 'Desc':
        if sort_work == 'Desc':
            # Sort by size of workforce, descending
            majors = majors.order_by(Major.total_people_in_work_foce.desc()).all()
        else :
            # Sort by size of workforce, ascending
            majors = majors.order_by(Major.total_people_in_work_foce).all()
    elif sort_name == 'Desc' :
        # Sort by name, descending
        majors = majors.order_by(Major.name.desc()).all()
    else :
        # Sort by name, ascending (default)
        majors = majors.order_by(Major.name).all()


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

def get_major_limited(sort_name, sort_wage, sort_work, stem):
    all_majors =[]
    session = Session()
    majors = session.query(Major)

    if stem == 'yes' :
        majors = session.query(Major).filter(Major.is_stem != 0)
    elif stem == 'no' :
        majors = session.query(Major).filter(Major.is_stem == 0)

    print("Sort name: " + sort_name + "\nSort wage: "+ sort_wage + "\nSort_work: " + sort_work + "\nis stem: " + stem)
    #Note, for now you can only call one sort function, wage or work, and can
    #choose the ordering.
    cast = majors.all()

    if sort_wage == 'Asc' or sort_wage == 'Desc':
        if sort_wage == 'Desc':
            # Sort by average wage, descending
            majors = majors.order_by(Major.average_wage.desc()).all()
        else :
            # Sort by average wage, ascending
            majors = majors.order_by(Major.average_wage).all()
    elif sort_work == 'Asc' or sort_work == 'Desc':
        if sort_work == 'Desc':
            # Sort by size of workforce, descending
            majors = majors.order_by(Major.total_people_in_work_foce.desc()).all()
        else :
            # Sort by size of workforce, ascending
            majors = majors.order_by(Major.total_people_in_work_foce).all()
    elif sort_name == 'Desc' :
        # Sort by name, descending
        majors = majors.order_by(Major.name.desc()).all()
    else :
        # Sort by name, ascending (default)
        majors = majors.order_by(Major.name).all()

    print('\n### All Majors')
    for m in majors :
        u = {
            'id' : m.id,
            'name' : m.name,
            'image_link' : m.image_link,
            'is_stem' : m.is_stem,
        }
        all_majors.append(u)

    session.commit()
    session.close()

    return all_majors

def search_Majors (terms):
    all_maj =[]
    session = Session()
    majors = session.query(Major)
    for t in terms :
        # search name only
        majors = majors.filter(or_(Major.name.ilike('%' + t + '%') \
            )) # future thinking
    for uni in majors :
        u = {

            'id' : uni.id,
            'name' : uni.name,
            'image_link' : uni.image_link,
        }
        all_maj.append(u)
    session.commit()
    session.close()
    return all_maj
