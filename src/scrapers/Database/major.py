from sqlalchemy import Column, String, Integer, Date, Table, ForeignKey, Float
from sqlalchemy.orm import relationship

from base import Base

major_top_university_association = Table(
    'major_top_university', Base.metadata,
    Column('major_id', String, ForeignKey('majors.id')),
    Column('uni_id', String, ForeignKey('universities.id'))
)

majors_top_city_association = Table(
    'majors_top_city', Base.metadata,
    Column('major_id', String, ForeignKey('majors.id')),
    Column('city_id', String, ForeignKey('cities.id'))
)

class Major(Base):
    __tablename__ = 'majors'

    id = Column(String, primary_key=True)
    name = Column(String)
    image_link = Column(String)
    wage_growth_rate = Column(String)
    is_stem = Column(Integer)
    average_wage = Column(String)
    total_degrees_awarded_in_2015 = Column(String)
    total_people_in_work_foce = Column(String)
    average_age_work_force = Column(String)
    cities_high_graduates_2015 = relationship("City", secondary=majors_top_city_association)
    universities_high_graduates_2015 = relationship("University", secondary=major_top_university_association)

    def __init__(self,id, name):
        self.id = id
        self.name = name

    def add_major_data(self, wage_growth, image_link, stem, wage, total_degree, workforce, workforce_age):
        self.image_link = image_link
        self.wage_growth_rate = wage_growth
        self.is_stem = stem
        self.average_wage = wage
        self.total_degrees_awarded_in_2015 = total_degree
        self.total_people_in_work_foce = workforce
        self.average_age_work_force = workforce_age

    def set_top_cities_major(self, cities):
        self.cities_high_graduates_2015 = cities

    def set_top_university_major(self, universities):
        self.universities_high_graduates_2015 = universities
