import sys
import os
import unittest
try:
    sys.path.insert(0, '../app/backend/Database/')
    from uni_api_func import *
    from major_api_func import *
    from cities_api_func import *
except:
    sys.path.insert(0, os.path.abspath('./app/backend/Database/'))
    print(sys.path)
    from uni_api_func import *
    from major_api_func import *
    from cities_api_func import *

import json
import re

class APITests(unittest.TestCase):

    def test_all_uni(self) :
        uni_list = get_uni('None', 'Asc', 'None', 'None')
        self.assertTrue(len(uni_list) > 1)
        uni = uni_list[0]
        for i in range(1, len(uni_list)) :
            uni2 = uni_list[i]
            self.assertFalse(uni['id'] == uni2['id'])

    def test_all_uni_limited(self) :
        uni_list = get_uni_limited('None', 'Asc', 'None', 'None')
        self.assertTrue(len(uni_list) > 1)
        uni = uni_list[0]
        for i in range(1, len(uni_list)) :
            uni2 = uni_list[i]
            self.assertFalse(uni['id'] == uni2['id'])
        try :
            badval = uni['city']
            self.assertTrue(1 == 0) # pragma: no cover
        except :
            pass

    def test_single_uni(self) :
        ut_id = "228778"
        uni = single_uni(ut_id)
        self.assertTrue(len(uni) > 0)
        self.assertTrue(uni['name'] == "The University of Texas at Austin")
        self.assertTrue(uni['state'] == "Texas")
        self.assertTrue(uni['state_tuition'] == 9806)
        bad_id = "228779"
        bad_uni = single_uni(bad_id)
        self.assertTrue(len(bad_uni) == 0)

    def test_all_city(self) :
        city_list = get_city('Asc', 'None', 'None')
        self.assertTrue(len(city_list) > 1)
        for city in city_list :
            for city2 in city_list :
                if city is not city2 :
                    self.assertFalse(city['id'] == city2['id'])

    def test_all_city_limited(self) :
        city_list = get_city_limited('Asc', 'None', 'None')
        self.assertTrue(len(city_list) > 1)
        for city in city_list :
            for city2 in city_list :
                if city is not city2 :
                    self.assertFalse(city['id'] == city2['id'])
            try :
                badval = uni['primary_care_physicians_in_county']
                self.assertTrue(1 == 0) # pragma: no cover
            except :
                pass

    def test_single_city(self) :
        austin_id = "31000US12420"
        city = single_city(austin_id)
        self.assertTrue(len(city) > 0)
        self.assertTrue(city['city_name'] == "Austin-Round Rock, TX")
        self.assertTrue(city['county_id'] == "05000US48453")
        self.assertTrue(city['primary_care_physicians_in_county'] == 85)
        bad_id = "31000US1"
        bad_city = single_city(bad_id)
        self.assertTrue(len(bad_city) == 0)

    def test_all_major(self) :
        maj_list = get_major('Asc', 'None', 'None', 'None')
        self.assertTrue(len(maj_list) > 1)
        for maj in maj_list :
            for maj2 in maj_list :
                if maj is not maj2 :
                    self.assertFalse(maj['id'] == maj2['id'])

    def test_all_major_limited(self) :
        maj_list = get_major_limited('Asc', 'None', 'None', 'None')
        self.assertTrue(len(maj_list) > 1)
        for maj in maj_list :
            for maj2 in maj_list :
                if maj is not maj2 :
                    self.assertFalse(maj['id'] == maj2['id'])
            try :
                badval = maj['is_stem']
                self.assertTrue(1 == 0) # pragma: no cover
            except :
                pass

    def test_single_major(self) :
        animal_id = "0109"
        maj = single_major(animal_id)
        self.assertTrue(len(maj) > 0)
        self.assertTrue(maj['name'] == "Animal Sciences")
        self.assertTrue(maj['is_stem'] == 0)
        self.assertTrue(maj['average_age_work_force'] == "44.6")
        bad_id = "0110"
        bad_maj = single_major(bad_id)
        self.assertTrue(len(bad_maj) == 0)
        
    def test_uni_sorting(self) :
        testvals = (('None', 'Asc', 'None', 'None', '222178'), \
            ('None', 'Desc', 'None', 'None', '206695'), \
            ('Asc', 'Asc', 'None', 'None', '197027'), \
            ('Desc', 'Asc', 'None', 'None', '122296'))
        for test in testvals:
            uni_list = get_uni_limited(test[0], test[1], test[2], test[3])
            uni = uni_list[0]
            self.assertTrue(uni['id'] == test[4])
    
    def test_uni_filtering(self) :
        uni_list = get_uni_limited('None', 'Asc', 'public', 'None')
        for u in uni_list:
            self.assertTrue('public' in u['type'].lower())
        uni_list = get_uni_limited('None', 'Asc', 'None', 'WY')
        self.assertTrue(len(uni_list) == 2)
        uni_list = get_uni_limited('None', 'Asc', 'private', 'WY')
        self.assertTrue(len(uni_list) == 1)
        self.assertTrue(uni_list[0]['id'] == "451705")
    
    def test_uni_searching(self) :
        search_terms = ['texas']
        uni_list = search_Universities(search_terms)
        self.assertTrue(len(uni_list) == 116)
        search_terms = ['rose', 'private', 'indiana']
        uni_list = search_Universities(search_terms)
        self.assertTrue(len(uni_list) == 1)
        self.assertTrue(uni_list[0]['id'] == "152318")
    
    def test_city_sorting(self) :
        testvals = (('Asc', 'None', 'None', '31000US10100'), \
            ('Desc', 'None', 'None', '31000US49780'), \
            ('Asc', 'Asc', 'None', '31000US13900'), \
            ('Asc', 'Desc', 'None', '31000US16980'))
        for test in testvals:
            city_list = get_city_limited(test[0], test[1], test[2])
            city = city_list[0]
            self.assertTrue(city['id'] == test[3])
    
    def test_city_filtering(self) :
        city_list = get_city_limited('Asc', 'None', 'TX')
        for c in city_list:
            self.assertTrue('TX' in c['city_name'])
        chicago_id = "31000US16980"
        for st in ('IN', 'IL'):
            found_chicago = False
            city_list = get_city_limited('Asc', 'None', st)
            for c in city_list:
                if c['id'] == chicago_id:
                    found_chicago = True
                    break
            self.assertTrue(found_chicago)
    
    def test_city_searching(self) :
        search_terms = ['portland']
        city_list = search_Cities(search_terms)
        self.assertTrue(len(city_list) == 2)
        search_terms = ['austin', 'rock']
        city_list = search_Cities(search_terms)
        self.assertTrue(len(city_list) == 1)
        self.assertTrue(city_list[0]['id'] == "31000US12420")
    
    
    def test_major_sorting(self) :
        testvals = (('Asc', 'None', 'None', 'None', 'name', 'Accounting'), \
            ('Desc', 'None', 'None', 'None', 'name', 'Video & Photographic Arts'), \
            ('Asc', 'Asc', 'None', 'None', 'id', '1901'), \
            ('Asc', 'Desc', 'None', 'None', 'id', '1402'), \
            ('Asc', 'None', 'Asc', 'None', 'id', '2903'), \
            ('Asc', 'None', 'Desc', 'None', 'id', '5201'))
        for test in testvals:
            major_list = get_major_limited(test[0], test[1], test[2], test[3])
            major = major_list[0]
            self.assertTrue(major[test[4]] == test[5])
    
    def test_major_filtering(self) :
        major_list = get_major_limited('Asc', 'None', 'None', 'yes')
        self.assertTrue(len(major_list) == 88)
        for m in major_list :
            self.assertTrue(m['is_stem'] != 0)
        major_list = get_major_limited('Asc', 'None', 'None', 'no')
        self.assertTrue(len(major_list) == 134)
        for m in major_list :
            self.assertTrue(m['is_stem'] == 0)
    
    def test_major_searching(self) :
        search_terms = ['engineering']
        major_list = search_Majors(search_terms)
        self.assertTrue(len(major_list) == 34)
        search_terms = ['engineering', 'chemical']
        major_list = search_Majors(search_terms)
        self.assertTrue(len(major_list) == 1)
        self.assertTrue(major_list[0]['id'] == "1407")
    


if __name__ == "__main__":
    unittest.main()
