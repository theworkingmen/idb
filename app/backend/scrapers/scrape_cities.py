from BeautifulSoup import BeautifulSoup
import urllib2
import requests
import json
import math
from keys import bing_key


cities_list = []
number_of_images_failed_flicker = 0
number_of_images_failed_bing = 0
failed_county_data = 0


def cities_basic_info():
    added_cities = set()
    with open('university.json', 'r') as f:
        uni_total_data = json.load(f)

    count = 0
    failed = 0
    for uni_data in uni_total_data:
        city_dict = dict()
        city_id = uni_data["city_id"]
        county_id = uni_data["county_id"]

        county_url = "http://api.datausa.io/attrs/geo/" + county_id
        response2 = requests.get(county_url)
        data2 = json.loads(response2.text)

        if (data2 is not None) and ("data" in data2):
            county_data = data2["data"][0]
            city_dict["county_id"] = county_id
            city_dict["county_name"] = county_data[8]
        else:
            city_dict["county_id"] = None
            city_dict["county_name"] = None

        if city_id not in added_cities:
            city_url = "http://api.datausa.io/attrs/geo/" + city_id
            response = requests.get(city_url)
            data = json.loads(response.text)

            try:
                city_dict["city_id"] = city_id
                city_data = data["data"][0]
            except Exception as e:
                try:
                    print("&&& Using county instead &&&&")
                    failed += 1
                    city_dict["city_name"] = county_data[2]
                    if county_data[3] == None:
                        city_dict["city_image"] = None
                    else:
                        city_dict["city_image"] = flicker_pic_url(
                            county_data[3])
                    city_dict["image_description"] = county_data[5]

                except Exception as e2:
                    city_dict["city_name"] = None
                    city_dict["city_image"] = None
                    city_dict["image_description"] = None
                    print("&&& None &&&&")
            else:
                city_dict["city_name"] = city_data[2]
                if city_data[3] == None:
                    if county_data[3] == None:
                        city_dict["city_image"] = None
                    else:
                        city_dict["city_image"] = flicker_pic_url(
                            county_data[3])
                else:
                    city_dict["city_image"] = flicker_pic_url(city_data[3])

                city_dict["image_description"] = city_data[5]

            if city_dict["city_id"] is not None:
                added_cities.add(city_dict["city_id"])

            cities_list.append(city_dict)

            count += 1

            if city_dict["city_name"] is not None:
                print(str(count) + " **** " + city_dict["city_name"])
            else:
                print(str(count) + " **** " + uni_data["county_id"])

    print("************ failed " + str(failed) + " count " + str(count))

    with open('cities.json', 'w') as fi:
        json.dump(cities_list, fi)


def flicker_pic_url(url):
    global c
    html_page = urllib2.urlopen(url + "/sizes")
    soup = BeautifulSoup(html_page)

    images = []

    for img in soup.findAll('img'):
        x = img.get('src')
        if "_b.jpg" in x:
            images.append(x)
        elif "_l.jpg" in x:
            images.append(x)
        elif "_o.jpg" in x:
            images.append(x)
        elif "_z.jpg" in x:
            images.append(x)
        elif "_m.jpg" in x:
            images.append(x)
        elif "_o.jpg" in x:
            images.append(x)
        elif "_n.jpg" in x:
            images.append(x)
        elif "_s.jpg" in x:
            images.append(x)
        elif "_t.jpg" in x:
            images.append(x)

    if len(images) > 0:
        return images[0]
    else:
        number_of_images_failed_flicker += 1
        return None


def add_city_images_from_bing():
    global number_of_images_failed_bing
    with open('cities.json', 'r') as f:
        city_data = json.load(f)

    for city_dict in city_data:
        city_name = city_dict["city_name"]
        county_name = city_dict["county_name"]
        if city_dict["city_image"] is None:
            city_dict["city_image"] = scrape_city_pic_bing(
                city_name, county_name)
            city_dict["image_description"] = "Downtown " + city_name

        if city_dict["image_description"] is None:
            city_dict["image_description"] = "Image taken in " + city_name

    print(number_of_images_failed_bing)
    with open('cities.json', 'w') as fi:
        json.dump(city_data, fi)


def scrape_city_pic_bing(city_name, county_name):
    global number_of_images_failed_bing
    query = ["Downtown " + city_name, "Downtown " + county_name]
    for q in query:
        search_query = q + " flicker"
        search_url = "https://api.cognitive.microsoft.com/bing/v7.0/images/search"
        headers = {"Ocp-Apim-Subscription-Key": bing_key}
        params = {"q": search_query,
                  "safeSearch": "Strict", "imageType": "photo"}
        response = requests.get(search_url, headers=headers, params=params)
        response.raise_for_status()
        search_results = response.json()

        if "value" in search_results:
            if (len(search_results["value"]) > 0) and ("contentUrl" in search_results["value"][0]):
                print("success " + city_name + " " +
                      search_results["value"][0]["contentUrl"])
                return search_results["value"][0]["contentUrl"]

    number_of_images_failed_bing += 1
    print("*** failed " + city_name)
    return None


def scrape_county_health_stat():
    data_dict = {}
    with open('cities.json', 'r') as f:
        city_data = json.load(f)

    county_info_url = ("http://api.datausa.io/api/?show=geo&sumlevel=county&year=latest" +
                       "&required=primary_care_physicians,motor_vehicle_crash_deaths,violent_crime," +
                       "high_school_graduation,some_college,unemployment,population_estimate,median_household_income")

    response = requests.get(county_info_url)
    county_data = json.loads(response.text)

    data_list = county_data["data"]

    for data in data_list:
        temp_dict = {}
        temp_dict["survey_year"] = data[0]
        temp_dict["population"] = data[8]
        temp_dict["unemployment"] = data[7]
        temp_dict["median_household_income"] = data[9]
        temp_dict["primary_care_physicians"] = data[2]
        temp_dict["violent_crime"] = data[4]
        temp_dict["motor_vehicle_crash_deaths"] = data[3]
        temp_dict["high_school_graduation_rate"] = data[5]
        temp_dict["people_with_college_education"] = data[6]
        data_dict[data[1]] = temp_dict

    with open('temp_county_health_data.json', 'w') as fi:
        json.dump(data_dict, fi)


def add_county_health_stat():
    global failed_county_data
    with open('temp_county_health_data.json', 'r') as fi:
        temp_county_data = json.load(fi)

    with open('cities.json', 'r') as f:
        city_data = json.load(f)

    for city in city_data:
        id = city["county_id"]

        try:
            data = temp_county_data[id]

            for key in data:
                city[key+"_in_county"] = data[key]

        except Exception as e:
            failed_county_data += 1
            city["survey_year_in_county"] = None
            city["median_household_income_in_county"] = None
            city["violent_crime_in_county"] = None
            city["people_with_college_education_in_county"] = None
            city["unemployment_in_county"] = None
            city["motor_vehicle_crash_deaths_in_county"] = None
            city["primary_care_physicians_in_county"] = None
            city["high_school_graduation_rate_in_county"] = None
            city["population_in_county"] = None
            pass

    print("Failed = " + str(failed_county_data))
    with open('cities.json', 'w') as fi:
        json.dump(city_data, fi)


def add_top_majors_in_county():
    with open('cities.json', 'r') as f:
        cities_total_data = json.load(f)

    year = 0
    temp_dict = {}  # key = cip -- value = number of graduates

    url_get_major_data = 'http://api.datausa.io/api/?show=cip&sumlevel=4&year=latest&required=grads_total&geo='

    county_count = 0
    for city_data in cities_total_data:
        id = city_data["county_id"]
        response = requests.get(url_get_major_data + id)
        major_data = json.loads(response.text)
        data = major_data['data']
        for city in data:
            year = city[0]
            temp_dict[city[2]] = city[3]

        county_count += 1
        print("\n\n************" + str(county_count) + "***************\n\n")
        major_dict = {}
        top_five = 0
        for key in sorted(temp_dict, key=temp_dict.get, reverse=True):
            value = temp_dict[key]
            major_dict["data_year"] = year
            major_dict[key] = value
            top_five += 1
            if top_five == 5:
                break

        city_data["top_grad_majors"] = major_dict

    with open('cities.json', 'w') as fi:
        json.dump(cities_total_data, fi)


def filter_majors():
    sett = set()
    with open('university.json', 'r') as f:
        university_data = json.load(f)

    with open('cities.json', 'r') as ff:
        city_data = json.load(ff)

    with open('majors.json', 'r') as fff:
        major_data = json.load(fff)

    for uni in university_data:
        d = uni["top_grad_majors"]
        for key in d:
            sett.add(key)

    for city in city_data:
        dd = city["top_grad_majors"]
        for keyy in dd:
            sett.add(keyy)

    count = 0
    dict2 = {}
    for major in major_data:
        if ("Other " in major["name"]) and (major["major_id"] not in sett):
            print("found")
            del(major_data[count])
        elif (major["major_id"] not in sett):
            dict2[major["major_id"]] = major["name"]
        count += 1

    for major in major_data:
        if major["major_id"] in dict2:
            del(major_data[count])
            print("found")

    with open('majors.json', 'w') as fff:
        json.dump(major_data, fff)


if __name__ == "__main__":
    cities_basic_info()
    add_city_images_from_bing()
    scrape_county_health_stat()
    add_county_health_stat()
    add_top_majors_in_county()
    filter_majors()
