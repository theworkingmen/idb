import sys
import os
import unittest
try:
    sys.path.insert(1, '../app/backend/database/')
    from city import City
    from major import Major
    from university import University
    from uni_api_func import *
    from major_api_func import *
    from cities_api_func import *
except:
    sys.path.insert(1, os.path.abspath('app/backend/database/'))
    from city import City
    from major import Major
    from university import University
    from uni_api_func import *
    from major_api_func import *
    from cities_api_func import *

import json


class APITests(unittest.TestCase):

    def test_all_uni(self) :
        print("Testing all uni")
        uni_list = get_uni()
        self.assertTrue(len(uni_list) > 1)
        uni = uni_list[0]
        for i in range(1, len(uni_list)) :
            uni2 = uni_list[i]
            self.assertFalse(uni['id'] == uni2['id'])
        print("Done")

    def test_all_uni_limited(self) :
        print("Testing limited uni")
        uni_list = get_uni_limited()
        self.assertTrue(len(uni_list) > 1)
        uni = uni_list[0]
        for i in range(1, len(uni_list)) :
            uni2 = uni_list[i]
            self.assertFalse(uni['id'] == uni2['id'])
        try :
            badval = uni['city']
            assert False # pragma: no cover
        except :
            pass
        print("Done")

    def test_single_uni(self) :
        print("Testing one uni")
        ut_id = "228778"
        uni = single_uni(ut_id)
        self.assertTrue(len(uni) > 0)
        self.assertTrue(uni['name'] == "The University of Texas at Austin")
        self.assertTrue(uni['state'] == "Texas")
        self.assertTrue(uni['state_tuition'] == 9806)
        bad_id = "228779"
        bad_uni = single_uni(bad_id)
        self.assertTrue(len(bad_uni) == 0)
        print("Done")


    def test_all_city(self) :
        print("Testing all city")
        city_list = get_city_limited()
        self.assertTrue(len(city_list) > 1)
        for city in city_list :
            for city2 in city_list :
                if city is not city2 :
                    self.assertFalse(city['id'] == city2['id'])
        print("Done")

    def test_all_city_limited(self) :
        print("Testing limited city")
        city_list = get_city_limited()
        self.assertTrue(len(city_list) > 1)
        for city in city_list :
            for city2 in city_list :
                if city is not city2 :
                    self.assertFalse(city['id'] == city2['id'])
            try :
                badval = uni['primary_care_physicians_in_county']
                assert False # pragma: no cover
            except :
                pass
        print("Done")

    def test_single_city(self) :
        print("Testing one city")
        austin_id = "31000US12420"
        city = single_city(austin_id)
        self.assertTrue(len(city) > 0)
        self.assertTrue(city['city_name'] == "Austin-Round Rock, TX")
        self.assertTrue(city['county_id'] == "05000US48453")
        self.assertTrue(city['primary_care_physicians_in_county'] == 85)
        bad_id = "31000US1"
        bad_city = single_city(bad_id)
        self.assertTrue(len(bad_city) == 0)
        print("Done")

    def test_all_major(self) :
        print("Testing all major")
        maj_list = get_major()
        self.assertTrue(len(maj_list) > 1)
        for maj in maj_list :
            for maj2 in maj_list :
                if maj is not maj2 :
                    self.assertFalse(maj['id'] == maj2['id'])
        print("Done")

    def test_all_major_limited(self) :
        print("Testing limited major")
        maj_list = get_major_limited()
        self.assertTrue(len(maj_list) > 1)
        for maj in maj_list :
            for maj2 in maj_list :
                if maj is not maj2 :
                    self.assertFalse(maj['id'] == maj2['id'])
            try :
                badval = maj['is_stem']
                assert False # pragma: no cover
            except :
                pass
        print("Done")


    def test_single_major(self) :
        print("Testing one major")
        animal_id = "0109"
        maj = single_major(animal_id)
        self.assertTrue(len(maj) > 0)
        self.assertTrue(maj['name'] == "Animal Sciences")
        self.assertTrue(maj['is_stem'] == 0)
        self.assertTrue(maj['average_age_work_force'] == "44.6")
        bad_id = "0110"
        bad_maj = single_major(bad_id)
        self.assertTrue(len(bad_maj) == 0)
        print("Done")


if __name__ == "__main__":
    unittest.main()
