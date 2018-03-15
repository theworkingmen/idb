from base import Session, engine, Base
from city import City
from major import Major
from university import University
import json

def city_basic_populate():
    #Base.metadata.create_all(engine)
    with open('../cities.json', 'r') as f:
        city_data = json.load(f)

    for city in city_data:
        session = Session()
        city_db = City(city["city_id"], city["city_name"])

        city_db.add_basic_city_data(city["image_description"], city["city_image"], city["county_id"], city["county_name"])

        city_db.add_city_stat(city["unemployment_in_county"], city["motor_vehicle_crash_deaths_in_county"],
        city["high_school_graduation_rate_in_county"], city["violent_crime_in_county"], city["population_in_county"],
        city["primary_care_physicians_in_county"], city["median_household_income_in_county"],
        city["people_with_college_education_in_county"], city["survey_year_in_county"])

        print("Added " + city["city_name"])
        session.add(city_db)
        session.commit()
        session.close()


def add_major_relationship():
    with open('../cities.json', 'r') as f:
        city_data = json.load(f)

    session = Session()
    for city in city_data:
        city_db = session.query(City).filter(City.id == city["city_id"]).first()
        top_majors_objects = []

        for major_id in city["top_grad_majors"]:
            if major_id != "data_year":
                major = session.query(Major).filter(Major.id == major_id).first()
                top_majors_objects.append(major)
                print(major.name)

        print("*************")

        city_db.set_top_majors(top_majors_objects)

    session.commit()
    session.close()

def print_cities():
    session = Session()
    cities = session.query(City).all()

    print('\n### All Cities')
    for city in cities:
        print(f'{city.city_name} has id {city.id} and top_major {city.top_grad_majors[0].id}')
    print('')
    session.commit()
    session.close()


if __name__ == "__main__":
    print_cities()
