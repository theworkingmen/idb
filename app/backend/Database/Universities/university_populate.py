import sys
sys.path.append("..")
from base import Session, engine, Base
from Cities.city import City
from Majors.major import Major
from university import University
import json

def university_basic_populate():
    Base.metadata.create_all(engine)
    with open('../scrapers/university.json', 'r') as f:
        university_data = json.load(f)

    for uni in university_data:
        session = Session()
        university = University(uni["university_id"], uni["name"])

        university.set_extra_info(uni["type"], uni["website"], uni["oos_tuition"],uni["state_tuition"], uni["survey_year"])

        university.set_location(uni["longitude"], uni["latitude"], uni["county_id"], uni["state"])
        university.set_enrollment(uni["enrolled_men"], uni["enrolled_women"])

        university.set_demographics(uni["demographics_asian"], uni["demographics_white"], uni["demographics_black"],
        uni["demographics_hispanic"], uni["demographics_other"])
        session.add(university)
        print("Added " + uni["name"])
        session.commit()
        session.close()

def add_university_image_link():
    with open('../scrapers/university.json', 'r') as f:
        university_data = json.load(f)

    for uni in university_data:
        session = Session()
        university = session.query(University).filter(University.id == uni["university_id"]).first()
        university.set_image_link(uni["image_link"])
        session.add(university)
        session.commit()
        print(university.image_link)
        session.close()

def add_city_relationship():
    with open('../scrapers/university.json', 'r') as f:
        university_data = json.load(f)

    for uni in university_data:
        session = Session()
        university = session.query(University).filter(University.id == uni["university_id"]).first()
        city = session.query(City).filter(City.id == uni["city_id"]).first()
        university.set_city(city)
        session.add(university)
        session.commit()
        print(city.city_name)
        session.close()

def add_major_relationship():
    with open('../scrapers/university.json', 'r') as f:
        university_data = json.load(f)

    session = Session()
    for uni in university_data:
        university = session.query(University).filter(University.id == uni["university_id"]).first()
        top_majors_objects = []

        for major_id in uni["top_grad_majors"]:
            if major_id != "data_year":
                major = session.query(Major).filter(Major.id == major_id).first()
                top_majors_objects.append(major)
                print(major.name)

        print("*************")

        university.set_top_majors(top_majors_objects)

    session.commit()
    session.close()

def print_university():
    session = Session()
    universities = session.query(University).all()#.delete()

    print('\n### All Universities')
    for uni in universities:
        print(str(uni.name) + " has id "  + uni.id + " and major " + uni.majors[0].id + " and is located in " + uni.city.city_name + " Image " + uni.image_link + "should not be null" + str(uni.oos_tuition))
    print('all')

    session.commit()
    session.close()

if __name__ == "__main__":
    print_university()
