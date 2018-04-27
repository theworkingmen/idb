from sqlalchemy import Column, String, Integer, Date, Table, ForeignKey, Float
from sqlalchemy.orm import relationship

from base import Base


top_majors_in_city = Table(
    'city_top_major', Base.metadata,
    Column('city_id', String, ForeignKey('cities.id')),
    Column('major_id', String, ForeignKey('majors.id'))
)


class City(Base):
    __tablename__ = 'cities'

    id = Column(String, primary_key=True)
    city_name = Column(String)

    city_image_link = Column(String)
    image_description = Column(String)
    county_id = Column(String)
    county_name = Column(String)
    unemployment_in_county = Column(Float)
    motor_vehicle_crash_deaths_in_county = Column(Float)
    high_school_graduation_rate_in_county = Column(Float)
    violent_crime_in_county = Column(Float)
    population_in_county = Column(Integer)
    primary_care_physicians_in_county = Column(Integer)
    median_household_income_in_county = Column(Integer)
    people_with_college_education_in_county = Column(Float)
    survey_year_in_county = Column(Integer)
    top_grad_majors = relationship("Major", secondary=top_majors_in_city)

    def __init__(self, id, city_name):
        self.id = id
        self.city_name = city_name

    def add_basic_city_data(self, image_desc, city_image_link, county_id, county_name):
        self.city_image_link = city_image_link
        self.image_description = image_desc
        self.county_id = county_id
        self.county_name = county_name

    def add_city_stat(
        self, unemployment, vehicle_crash, high_school_graduation, violent_crime, population,
            physicians, median_income, college_educated, survey_year):
        self.unemployment_in_county = unemployment
        self.motor_vehicle_crash_deaths_in_county = vehicle_crash
        self.high_school_graduation_rate_in_county = high_school_graduation
        self.violent_crime_in_county = violent_crime
        self.population_in_county = population
        self.primary_care_physicians_in_county = physicians
        self.median_household_income_in_county = median_income
        self.people_with_college_education_in_county = college_educated
        self.survey_year_in_county = survey_year

    def set_top_majors(self, majors):
        self.top_grad_majors = majors
