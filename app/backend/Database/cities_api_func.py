from base import Session, engine, Base
from city import City
from major import Major
from university import University
import json

def get_city():
    all_cities =[]
    session = Session()
    cities = session.query(City).all()

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

def get_city_limited():
    all_cities =[]
    session = Session()
    cities = session.query(City).all()

    print('\n### All Cities')
    for c in cities :

        u = {

            'id' : c.id, 
            'city_name' : c.city_name,
            'city_image_link' : c.city_image_link,
        }
        all_cities.append(u)

    session.commit()
    session.close()

    return all_cities
