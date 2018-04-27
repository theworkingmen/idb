import sys
sys.path.append("..")
from base import Session, engine, Base
from Cities.city import City
from major import Major
from Universities.university import University
import json
import re


def major_basic_populate():
    Base.metadata.create_all(engine)
    with open('../scrapers/majors.json', 'r') as f:
        major_data = json.load(f)

    for major in major_data:
        session = Session()
        major_db = Major(major["major_id"], major["name"])

        major_db.add_major_data(major["wage_growth_rate"], major["image_link"],
        major["is_stem"], cast_int_wage(major["average_wage"]), major["total_degrees_awarded_in_2015"],
        cast_int_workforce(major["total_people_in_work_foce"]), major["average_age_work_force"])

        print("Added " + major["name"])
        session.add(major_db)
        session.commit()
        session.close()

def cast_int_workforce(val):

    try:
        if 'M' in val:
            val = float(re.sub('[#$,M]', '', val))
            val = val * 1000000
            val = int(val)
        else:
            val = int(re.sub('[#$,M]', '', val))
    except:
        val = -1
        pass

    return val


def cast_int_wage(val):
    try:
        val = int(re.sub('[#$,]', '', val))
    except:
        val = -1

    return val

def add_city_relationship():
    with open('../scrapers/majors.json', 'r') as f:
        majors_data = json.load(f)

    session = Session()
    for major in majors_data:
        if "cities_with_high_graduates_on_2015" in major:
            major_db = session.query(Major).filter(Major.id == major["major_id"]).first()
            top_cities_objects = []

            for city_id in major["cities_with_high_graduates_on_2015"]:
                city = session.query(City).filter(City.id == city_id).first()
                top_cities_objects.append(city)
                print(city.city_name)

            print("*************")

            major_db.set_top_cities_major(top_cities_objects)

    session.commit()
    session.close()

def add_univeristy_relationship():
    with open('../scrapers/majors.json', 'r') as f:
        majors_data = json.load(f)

    session = Session()
    for major in majors_data:
        if "universities_with_high_graduates_on_2015" in major:
            major_db = session.query(Major).filter(Major.id == major["major_id"]).first()
            top_universities_objects = []

            for uni_id in major["universities_with_high_graduates_on_2015"]:
                university = session.query(University).filter(University.id == uni_id).first()
                top_universities_objects.append(university)
                print(university.name)

            print("*************")

            major_db.set_top_university_major(top_universities_objects)

    session.commit()
    session.close()

def print_majors():
    session = Session()
    majors = session.query(Major).all()

    print('\n### All Majors')
    for major in majors:
        try:
            #print(f'{major.name} has id {major.id} top_city {major.cities_high_graduates_2015[0].id} top_uni = {major.universities_high_graduates_2015[0].id}')
            print("one")
        except Exception as e:
            pass
    print('')

    session.commit()
    session.close()


if __name__ == "__main__":
    print_majors()
