from sqlalchemy import Column, String, Integer, Date, Table, ForeignKey, Float
from sqlalchemy.orm import relationship

from base import Base

university_top_major_association = Table(
    'university_top_major', Base.metadata,
    Column('uni_id', String, ForeignKey('universities.id')),
    Column('major_id', String, ForeignKey('majors.id'))
)

class University(Base):
    __tablename__ = 'universities'

    id = Column(String, primary_key=True)
    name = Column(String)

    city_id = Column(String, ForeignKey('cities.id'))
    city = relationship("City", backref="universities")
    majors = relationship("Major", secondary=university_top_major_association)

    website = Column(String)
    survey_year = Column(Integer)
    oos_tuition = Column(Integer)
    state_tuition = Column(Integer)
    image_link = Column(String)
    name = Column(String)
    demographics_asian = Column(Float)
    demographics_black = Column(Float)
    demographics_white = Column(Float)
    demographics_other = Column(Float)
    demographics_hispanic = Column(Float)
    enrolled_women = Column(Float)
    enrolled_men = Column(Float)
    longitude = Column(Float)
    latitude = Column(Float)
    state = Column(String)
    county_id = Column(String)
    uni_type = Column(String)


    def __init__(self, id, name):
        self.id = id
        self.name = name

    def set_demographics(self, asian, white, black, hispanic, other):
        self.demographics_other = other
        self.demographics_white = white
        self.demographics_hispanic = hispanic
        self.demographics_black = black
        self.demographics_asian = asian

    def set_image_link(self, image_link):
        self.image_link = image_link

    def set_enrollment(self, men, women):
        self.enrolled_men = men
        self.enrolled_women = women

    def set_location(self, longitude, latitude, county_id, state):
        self.longitude = longitude
        self.latitude = latitude
        self.county_id = county_id
        self.state = state

    def set_extra_info(self, uni_type, website, oos_tuition, state_tuition):
        self.uni_type
        self.website
        self.oos_tuition
        self.state_tuition

    def set_city(self, city):
        self.city = city

    def set_top_majors(self, majors):
        self.majors = majors
