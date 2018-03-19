"""
    The keys file is not added to this public repo.
    Please add this file to run this scraper.
"""
import requests
import json
import math
import keys
from keys import bing_key


universities_list = []
images_failed_bing = 0

"""
    Gets basic University data.
    Name, Website, County_id, state_id, latitude, longitude, university_id,
    city_id.
"""


def get_university_stat():
    url_basic_uni_info = 'http://api.datausa.io/attrs/university'

    response = requests.get(url_basic_uni_info)

    basic_data = json.loads(response.text)

    uni_list = basic_data["data"]

    for uni in uni_list:
        sector = int(uni[0])
        has_url = uni[2] is not None
        university_dict = {}
        if ((sector == 1) or (sector == 2) or (sector == 3)) and has_url:
            university_dict["name"] = uni[1]
            university_dict["website"] = uni[2]
            university_dict["county_id"] = uni[4]
            university_dict["state_id"] = uni[5]
            university_dict["latitude"] = uni[6]
            university_dict["longitude"] = uni[7]
            university_dict["university_id"] = uni[8]
            university_dict["city_id"] = uni[9]
            universities_list.append(university_dict)

    url_get_state = 'http://api.datausa.io/attrs/geo/'
    for i in range(0, len(universities_list)):
        try:
            uni = universities_list[i]
            id = uni["state_id"]
            temp = url_get_state + str(id)

            response = requests.get(temp)
            state_data = json.loads(response.text)
            print(state_data["data"][0][1])
            uni["state"] = state_data["data"][0][1]
            del uni["state_id"]
        except Exception as e:
            pass

    with open('university.json', 'w') as f:
        json.dump(universities_list, f)


"""
    Adds tuition data.
    Out of state tuition, In state tuition, and survey_year.
"""


def add_tuition_stat():

    temp_dict = {}

    url_get_tuition = 'http://api.datausa.io/api/?show=university&sumlevel=all&year=latest&required=oos_tuition,state_tuition'

    response = requests.get(url_get_tuition)
    tuition_data = json.loads(response.text)

    uni_data = tuition_data['data']

    for data in uni_data:
        if data is not None:
            tuition_list = [0, 0, 0]
            tuition_list[0] = data[3]  # oos
            tuition_list[1] = data[4]  # in state
            tuition_list[2] = data[0]  # survey_year
            temp_dict[data[2]] = tuition_list
        else:
            print("NULL")

    with open('university.json', 'r') as f:
        uni_total_data = json.load(f)

    for data_curr in uni_total_data:
        try:
            tuition_list = temp_dict[data_curr["university_id"]]
            data_curr["oos_tuition"] = tuition_list[0]
            data_curr["state_tuition"] = tuition_list[1]
            data_curr["survey_year"] = tuition_list[2]

        except Exception as e:
            data_curr["oos_tuition"] = None
            data_curr["state_tuition"] = None
            data_curr["survey_year"] = None
            pass

    with open('university.json', 'w') as fi:
        json.dump(uni_total_data, fi)


"""
    Scrapes race demographics of universities.
    Source - https://api.data.gov/ed/collegescorecard/
"""


def scrape_race_stat():

    url_get_race = ('https://api.data.gov/ed/collegescorecard/v1/schools?fields=school.name' +
                    ',id,2015.student.demographics.race_ethnicity.white,2015.student.demographics.race_ethnicity.' +
                    'black,2015.student.demographics.race_ethnicity.hispanic,2015.student.demographics.race_ethnicity.' +
                    'asian,2015.student.demographics.race_ethnicity.aian,2015.student.demographics.race_ethnicity.nhpi,' +
                    '2015.student.demographics.race_ethnicity.two_or_more,2015.student.demographics.race_ethnicity.' +
                    'non_resident_alien,2015.student.demographics.race_ethnicity.unknown,2015.student.demographics.' +
                    'race_ethnicity.white_non_hispanic,2015.student.demographics.race_ethnicity.black_non_hispanic,2015' +
                    '.student.demographics.race_ethnicity.asian_pacific_islander&sort=2015.completion.rate_suppressed.' +
                    'overall:desc&page=')

    key = keys.data_gov_key
    response = requests.get(url_get_race+str(0)+key)
    race_data = json.loads(response.text)

    total_items = race_data["metadata"]["total"]
    per_page = race_data["metadata"]["per_page"]
    pages = math.ceil(int(total_items) / int(per_page))

    results = []

    for i in range(0, pages):
        print("page " + str(i))
        page_url = url_get_race + str(i) + key
        response = requests.get(page_url)
        race_data = json.loads(response.text)
        results += race_data["results"]

    with open('temp_race_data.json', 'w') as f:
        json.dump(results, f)


""" Adds race demographics of universities to university data. """


def add_race_stat():
    temp_dict = {}
    with open('university.json', 'r') as f:
        uni_total_data = json.load(f)

    with open('temp_race_data.json', 'r') as f:
        race_data = json.load(f)

    for uni in race_data:
        dic = {}
        id = uni['id']
        dic['white'] = uni["2015.student.demographics.race_ethnicity.white"]
        dic['black'] = uni["2015.student.demographics.race_ethnicity.black"]
        dic['asian'] = uni["2015.student.demographics.race_ethnicity.asian"]
        dic['hispanic'] = uni["2015.student.demographics.race_ethnicity.hispanic"]

        summ = 0
        if uni["2015.student.demographics.race_ethnicity.aian"] is not None:
            summ += uni["2015.student.demographics.race_ethnicity.aian"]

        if uni["2015.student.demographics.race_ethnicity.nhpi"] is not None:
            summ += uni["2015.student.demographics.race_ethnicity.nhpi"]

        if uni["2015.student.demographics.race_ethnicity.two_or_more"] is not None:
            summ += uni["2015.student.demographics.race_ethnicity.two_or_more"]

        if uni["2015.student.demographics.race_ethnicity.black_non_hispanic"] is not None:
            summ += uni["2015.student.demographics.race_ethnicity.black_non_hispanic"]

        if uni["2015.student.demographics.race_ethnicity.non_resident_alien"] is not None:
            summ += uni["2015.student.demographics.race_ethnicity.non_resident_alien"]

        if uni["2015.student.demographics.race_ethnicity.white_non_hispanic"] is not None:
            summ += uni["2015.student.demographics.race_ethnicity.white_non_hispanic"]

        if uni["2015.student.demographics.race_ethnicity.unknown"] is not None:
            summ += uni["2015.student.demographics.race_ethnicity.unknown"]

        if uni["2015.student.demographics.race_ethnicity.asian_pacific_islander"] is not None:
            summ += uni["2015.student.demographics.race_ethnicity.asian_pacific_islander"]

        dic['other'] = summ
        temp_dict[id] = dic
        print(dic)

    for data_curr in uni_total_data:
        try:
            race_dic = temp_dict[int(data_curr["university_id"])]

        except Exception as e:
            data_curr["demographics_white"] = None
            data_curr["demographics_black"] = None
            data_curr["demographics_asian"] = None
            data_curr["demographics_hispanic"] = None
            data_curr["demographics_other"] = None
            pass

        else:
            data_curr["demographics_white"] = race_dic["white"]
            data_curr["demographics_black"] = race_dic["black"]
            data_curr["demographics_asian"] = race_dic["asian"]
            data_curr["demographics_hispanic"] = race_dic["hispanic"]
            data_curr["demographics_other"] = race_dic["other"]

    with open('university.json', 'w') as fi:
        json.dump(uni_total_data, fi)


"""
    Adds gender demographics of universities.
    Source - https://api.data.gov/ed/collegescorecard/
"""


def add_gender_stat():
    temp_dict = {}

    url_get_gender_data = 'http://api.datausa.io/api/?show=university&sumlevel=all&required=enrolled_men,enrolled_women'

    response = requests.get(url_get_gender_data)
    gender_data = json.loads(response.text)

    uni_data = gender_data['data']

    for data in uni_data:
        if data is not None:
            gender_list = [0, 0]
            gender_list[0] = data[3]  # men
            gender_list[1] = data[4]  # women
            temp_dict[data[2]] = gender_list
        else:
            print("NULL")

    with open('university.json', 'r') as f:
        uni_total_data = json.load(f)

    for data_curr in uni_total_data:
        try:
            gender_list = temp_dict[data_curr["university_id"]]
            if (gender_list[0] is not None) and (gender_list[1] is not None):
                total_enrollment = gender_list[0] + gender_list[1]
                data_curr["enrolled_men"] = round(
                    gender_list[0] / total_enrollment, 2)
                data_curr["enrolled_women"] = round(
                    gender_list[1] / total_enrollment, 2)
            else:
                data_curr["enrolled_men"] = None
                data_curr["enrolled_women"] = None

        except Exception as e:
            data_curr["enrolled_men"] = None
            data_curr["enrolled_women"] = None
            pass

    with open('university.json', 'w') as fi:
        json.dump(uni_total_data, fi)


"""
    Adds the top 5 majors of a university based on the number of graduates.
    Source - https://api.data.gov/ed/collegescorecard/
"""


def add_top_majors():

    with open('university.json', 'r') as f:
        uni_total_data = json.load(f)

    year = 0
    temp_dict = {}  # key = cip -- value = number of graduates

    url_get_major_data = 'http://api.datausa.io/api/?show=cip&sumlevel=4&required=university,grads_total&university='

    countt = 0
    for uni_data in uni_total_data:
        id = uni_data["university_id"]
        response = requests.get(url_get_major_data + id)
        major_data = json.loads(response.text)
        data = major_data['data']
        for uni in data:
            year = uni[0]
            temp_dict[uni[1]] = uni[3]

        countt += 1
        print("\n\n************" + str(countt) + "***************\n\n")
        major_dict = {}
        count = 0
        for key in sorted(temp_dict, key=temp_dict.get, reverse=True):
            value = temp_dict[key]
            major_dict["data_year"] = year
            major_dict[key] = value
            count += 1
            if count == 5:
                break

        uni_data["top_grad_majors"] = major_dict

    with open('university.json', 'w') as fi:
        json.dump(uni_total_data, fi)


""" Add univiersity type  """


def add_university_type():
    temp_dict = {}
    with open('university.json', 'r') as f:
        uni_total_data = json.load(f)

    url_get_all_universities = 'http://api.datausa.io/attrs/university'
    response = requests.get(url_get_all_universities)
    all_uni_data = json.loads(response.text)
    all_uni_data = all_uni_data["data"]

    for university in all_uni_data:
        temp_dict[university[8]] = university[0]

    for uni_data in uni_total_data:
        uid = uni_data["university_id"]
        uni_type = temp_dict[uid]

        if uni_type == "1":
            uni_data["type"] = "public 4 year"
        elif uni_type == "2":
            uni_data["type"] = "private, 4 year, and non profit"
        elif uni_type == "3":
            uni_data["type"] = "private, 4 year, and for profit"

    with open('university.json', 'w') as fi:
        json.dump(uni_total_data, fi)


""" Remove universities with null values. """


def remove_null_values():
    with open('university.json', 'r') as f:
        uni_total_data = json.load(f)

    count = 0
    for uni_data in uni_total_data:
        for key in uni_data:
            if uni_data[key] is None:
                count += 1
                print(str(count) + " removed " + uni_data["name"])
                uni_total_data.remove(uni_data)
                break

    with open('university.json', 'w') as fi:
        json.dump(uni_total_data, fi)

""" Add image urls """
def add_image_links():
    temp_dict = {}
    with open('university.json', 'r') as f:
        uni_total_data = json.load(f)

    for uni_data in uni_total_data:
        uni_data["image_link"] = scrape_university_logo_bing(uni_data["name"])
        print("added " + uni_data["name"])

    print(images_failed_bing)

    with open('university.json', 'w') as fi:
        json.dump(uni_total_data, fi)

""" get university logos from bing """

def scrape_university_logo_bing(uni_name):
    global images_failed_bing
    query = [uni_name + " official logo"]

    for q in query:
        search_query = q
        search_url = "https://api.cognitive.microsoft.com/bing/v7.0/images/search"
        headers = {"Ocp-Apim-Subscription-Key": bing_key}
        params = {"q": search_query,
                  "safeSearch": "Strict", "imageType": "photo"}
        response = requests.get(search_url, headers=headers, params=params)
        response.raise_for_status()
        search_results = response.json()

        if "value" in search_results:
            if (len(search_results["value"]) > 0) and ("contentUrl" in search_results["value"][0]):
                print("success " + uni_name + " " +
                      search_results["value"][0]["contentUrl"])
                return search_results["value"][0]["contentUrl"]

    images_failed_bing += 1
    print("*** failed " + uni_name)
    return None

""" Count the number of universities. """


def count_universities():
    with open('university.json', 'r') as f:
        uni_total_data = json.load(f)

    count = 0

    for uni_data in uni_total_data:
        count += 1

    print("There are " + str(count) + " universities.")


if __name__ == '__main__':
    get_university_stat()
    add_tuition_stat()
    scrape_race_stat()
    add_race_stat()
    add_gender_stat()
    add_top_majors()
    remove_null_values()
    count_universities()
    add_university_type()
