import sys
import os
import unittest
try:
    sys.path.insert(0, '../app/backend/database/')
    from uni_api_func import *
    from major_api_func import *
    from cities_api_func import *
except:
    sys.path.insert(0, os.path.abspath('./app/backend/database/'))
    print(sys.path)
    from uni_api_func import *
    from major_api_func import *
    from cities_api_func import *

import json

"""
Mitchell's note to himself: For now, these updates are incomplete.
Do not try running this until I can complete them, which will be done
tomorrow, likely in the morning.
"""

class APITests(unittest.TestCase):

    def test_all_uni(self) :
        print("Testing all uni")
        uni_list = get_uni('None', 'Asc', 'None', 'None')
        self.assertTrue(len(uni_list) > 1)
        uni = uni_list[0]
        for i in range(1, len(uni_list)) :
            uni2 = uni_list[i]
            self.assertFalse(uni['id'] == uni2['id'])
        print("Done")

    def test_all_uni_limited(self) :
        print("Testing limited uni")
        uni_list = get_uni_limited('None', 'Asc', 'None', 'None')
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
        city_list = get_city('Asc', 'None', 'None')
        self.assertTrue(len(city_list) > 1)
        for city in city_list :
            for city2 in city_list :
                if city is not city2 :
                    self.assertFalse(city['id'] == city2['id'])
        print("Done")

    def test_all_city_limited(self) :
        print("Testing limited city")
        city_list = get_city_limited('Asc', 'None', 'None')
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
        maj_list = get_major('Asc', 'None', 'None', 'None')
        self.assertTrue(len(maj_list) > 1)
        for maj in maj_list :
            for maj2 in maj_list :
                if maj is not maj2 :
                    self.assertFalse(maj['id'] == maj2['id'])
        print("Done")

    def test_all_major_limited(self) :
        print("Testing limited major")
        maj_list = get_major_limited('Asc', 'None', 'None', 'None')
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
        
    def test_uni_sorting(self) :
        print("Testing university sorting")
        uni_list = get_uni_limited('None', 'Asc', 'None', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "[alphabetically first]")
        uni_list = get_uni_limited('None', 'Desc', 'None', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "[alphabetically last]")
        uni_list = get_uni_limited('Asc', 'Asc', 'None', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "[lowest tuition]")
        uni_list = get_uni_limited('Desc', 'Asc', 'None', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "[highest tuition]")
        print("Done")
    
    def test_uni_filtering(self) :
        print("Testing university filtering")
        uni_list = get_uni_limited('None', 'Asc', 'public', 'None')
        for u in uni_list:
            self.assertTrue('public' in u['type'].lower())
        uni_list = get_uni_limited('None', 'Asc', 'None', 'WY')
        self.assertTrue(len(uni_list == __))
        uni_list = get_uni_limited('None', 'Asc', 'private', 'WY')
        self.assertTrue(len(uni_list == __))
        print("Done")
    
    def test_uni_searching(self) :
        print("Testing university searching")
        search_terms = ['texas']
        uni_list = search_Universities(search_terms)
        self.assertTrue(len(uni_list) == __)
        search_terms = ['rose', 'private', 'indiana']
        uni_list = search_Universities(search_terms)
        self.assertTrue(len(uni_list) == 1)
        self.assertTrue(uni_list[0]['id'] == __)
        print("Done")
    
    def test_city_sorting(self) :
        print("Testing city sorting")
        uni_list = get_uni_limited('Asc', 'None', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "alphabetically first")
        uni_list = get_uni_limited('Desc', 'None', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "alphabetically last")
        uni_list = get_uni_limited('Asc', 'Asc', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "lowest population")
        uni_list = get_uni_limited('Asc', 'Desc', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "Highest population")
        print("Done")
    
    def test_city_filtering(self) :
        print("Testing city filtering")
        uni_list = get_city_limited('Asc', 'None', 'TX')
        for c in uni_list:
            self.assertTrue('TX' in c['city_name'])
        chicago_id = ___
        found_chicago = False
        uni_list = get_city_limited('Asc', 'None', 'IL')
        for u in uni_list:
            if u['id'] == chicago_id:
                found_chicago = True
                break
        self.assertTrue(found_chicago)
        found_chicago = False
        uni_list = get_city_limited('Asc', 'None', 'IN')
        for u in uni_list:
            if u['id'] == chicago_id:
                found_chicago = True
                break
        self.assertTrue(found_chicago)
        print("Done")
    
    def test_city_searching(self) :
        print("Testing city searching")
        search_terms = ['portland']
        uni_list = search_Cities(search_terms)
        self.assertTrue(len(uni_list) == __)
        search_terms = ['austin', 'rock']
        uni_list = search_Cities(search_terms)
        self.assertTrue(len(uni_list) == 1)
        self.assertTrue(uni_list[0]['id'] == __)
        print("Done")
    
    def test_major_sorting(self) :
        print("Testing major sorting")
        uni_list = get_uni_limited('Asc', 'None', 'None', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "[alphabetically first]")
        uni_list = get_uni_limited('Desc', 'None', 'None', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "[alphabetically last]")
        uni_list = get_uni_limited('Asc', 'Asc', 'None', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "[lowest wage]")
        uni_list = get_uni_limited('Asc', 'Asc', 'None', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "[highest wage]")
        uni_list = get_uni_limited('Asc', 'None', 'Asc', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "[lowest size of workforce]")
        uni_list = get_uni_limited('Asc', 'None', 'Desc', 'None')
        uni = uni_list[0]
        self.assertTrue(uni['name'] == "[highest size of workforce]")
        print("Done")
    
    def test_major_filtering(self) :
        print("Testing major filtering")
        uni_list = get_uni_limited('Asc', 'None', 'None', 'yes')
        for m in uni_list :
            self.assertTrue(m['is_stem'] != 0)
        uni_list = get_uni_limited('Asc', 'None', 'None', 'no')
        for m in uni_list :
            self.assertTrue(m['is_stem'] == 0)
        print("Done")
    
    def test_major_searching(self) :
        print("Testing major searching")
        search_terms = ['engineering']
        uni_list = search_Majors(search_terms)
        self.assertTrue(len(uni_list) == __)
        search_terms = ['engineering', 'chemical']
        uni_list = search_Majors(search_terms)
        self.assertTrue(len(uni_list) == 1)
        self.assertTrue(uni_list[0]['id'] == __)
        print("Done")


if __name__ == "__main__":
    unittest.main()
