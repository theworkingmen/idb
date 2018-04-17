from base import Session, engine, Base
from city import City
from major import Major
from university import University
from sqlalchemy import or_
import json
import re

def get_city(sort_name, sort_pop, state):
    all_cities =[]
    session = Session()
    cities = session.query(City)

    #print("Sort by name " + sort_name + "\nSort by population " + sort_pop + "\nFilter by state " + state)

    cities = parseInputs (sort_name, sort_pop, state, cities)

    print('\n### All Cities')
    for c in cities :

        top_majors = []
        for m in c.top_grad_majors :
            top_majors.append(m.id)

        universities = session.query(University).filter_by(city_id=c.id).all()

        all_uni = []
        for uni in universities :
            temp_dict = {
                'id' : uni.id,
                'name' : uni.name,
                'image_link' : uni.image_link
            }
            all_uni.append(temp_dict)

        u = {

            'id' : c.id,
            'city_name' : c.city_name,
            'city_image_link' : c.city_image_link,
            'image_description' : c.image_description,
            'county_id' : c.county_id,
            'county_name' : c.county_name,
            'unemployment_in_county' : c.unemployment_in_county,
            'motor_vehicle_crash_deaths_in_county' : c.motor_vehicle_crash_deaths_in_county,
            'high_school_graduation_rate_in_county' : c.high_school_graduation_rate_in_county,
            'violent_crime_in_county' : c.violent_crime_in_county,
            'population_in_county' : c.population_in_county,
            'primary_care_physicians_in_county' : c.primary_care_physicians_in_county,
            'median_household_income_in_county' : c.median_household_income_in_county,
            'people_with_college_education_in_county' : c.people_with_college_education_in_county,
            'survey_year_in_county' : c.survey_year_in_county,
            'top_grad_majors' : top_majors,
            'universities_in_city' : all_uni
        }
        all_cities.append(u)

    session.commit()
    session.close()

    return all_cities

def single_city (city_id) :
    try:
        session = Session()
        c = session.query(City).filter_by(id=city_id).first()

        universities = session.query(University).filter_by(city_id=city_id).all()

        all_uni = []
        for u in universities :
            temp_dict = {
                'id' : u.id,
                'name' : u.name,
                'image_link' : u.image_link
            }
            all_uni.append(temp_dict)

        top_majors = []
        for m in c.top_grad_majors :
            temp_dict = {
                'id' : m.id,
                'name' : m.name,
                'image_link' : m.image_link
            }
            top_majors.append(temp_dict)


        u = {

            'id' : c.id,
            'city_name' : c.city_name,
            'city_image_link' : c.city_image_link,
            'image_description' : c.image_description,
            'county_id' : c.county_id,
            'county_name' : c.county_name,
            'unemployment_in_county' : c.unemployment_in_county,
            'motor_vehicle_crash_deaths_in_county' : c.motor_vehicle_crash_deaths_in_county,
            'high_school_graduation_rate_in_county' : c.high_school_graduation_rate_in_county,
            'violent_crime_in_county' : c.violent_crime_in_county,
            'population_in_county' : c.population_in_county,
            'primary_care_physicians_in_county' : c.primary_care_physicians_in_county,
            'median_household_income_in_county' : c.median_household_income_in_county,
            'people_with_college_education_in_county' : c.people_with_college_education_in_county,
            'survey_year_in_county' : c.survey_year_in_county,
            'top_grad_majors' : top_majors,
            'universities_in_city' : all_uni
        }
    except AttributeError:
        u= {}
    session.commit()
    session.close()
    return u

def get_city_limited(sort_name, sort_pop, state):
    all_cities =[]
    session = Session()
    cities = session.query(City)

    #print("Sort by name " + sort_name + "\nSort by population " + sort_pop + "\nFilter by state " + state)

    cities = parseInputs (sort_name, sort_pop, state, cities)

    print('\n### All Cities')
    for c in cities :

        u = {
            'id' : c.id,
            'city_name' : c.city_name,
            'city_image_link' : c.city_image_link,
            'population' : c.population_in_county,
        }
        all_cities.append(u)

    session.commit()
    session.close()

    return all_cities

def search_Cities (terms):
    all_city =[]
    session = Session()
    cities = session.query(City)
    for t in terms :
        # search name (including state), county
        cities = cities.filter(or_(City.city_name.ilike('%' + t + '%'), \
            City.county_name.ilike('%' + t + '%') ))
    for c in cities :
        u = {

            'id' : c.id,
            'name' : c.city_name,
            'image_link' : c.city_image_link,
            'county' : c.county_name,
            'population' : c.population_in_county,
            'median income' : c.median_household_income_in_county,
            'unemployment rate in county' : c.unemployment_in_county
        }
        all_city.append(u)
    session.commit()
    session.close()
    return all_city


def parseInputs (sort_name, sort_pop, state, cities) :
    if state != 'None' and len(state) == 2 :
        state = state.upper()
        #cities = cities.filter(City.city_name.match(state))
        cities = cities.filter(City.city_name.op('~')(", " + state + "|-" + state))

    if sort_name == 'Desc':
        # Sort by name, descending
        cities = cities.order_by(City.city_name.desc()).all()
    elif sort_pop == 'Asc' or sort_pop == 'Desc' :
        # Null-value bug: remove all instances with "None" population
        cities = cities.filter(City.population_in_county != None)
        if sort_pop == 'Asc' :
            # Sort by population, ascending
            cities = cities.order_by(City.population_in_county).all()
        else :
            # Sort by population, descending
            cities = cities.order_by(City.population_in_county.desc()).all()
    else :
        # Sort by name, ascending (default)
        cities = cities.order_by(City.city_name).all()

    return cities