from BeautifulSoup import BeautifulSoup
import urllib2
import requests
import json
import math

"""
{
    city_id
    city_name
    county_id
    county_name
    city_image_link
    population_estimate
    median_household_income
    unemployment
    high_school_graduation rate
    some_college # percentage of the population ages 25-44 with some post-secondary education
    primary_care_physicians # ratio of the population to total primary care physicians
    uninsured
    violent_crime # number of reported violent crime offenses per 100,000 population
    motor_vehicle_crash_deaths # motor vehicle crash deaths per 100,000 population

}
http://api.datausa.io/api/?show=cip&sumlevel=4&year=latest&geo=05000US48453
"""
cities_list = []
c = 0

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
                    county_url = "http://api.datausa.io/attrs/geo/" + county_id
                    response2 = requests.get(county_url)
                    data2 = json.loads(response2.text)
                    county_data = data2["data"][0]
                    city_dict["city_name"] = county_data[2]
                    if county_data[3] == None:
                        city_dict["city_image"] = None
                    else:
                        city_dict["city_image"] = flicker_pic_url(county_data[3])
                    city_dict["image_description"] = county_data[5]

                except Exception as e2:
                    city_dict["city_name"] = None
                    city_dict["city_image"] = None
                    city_dict["image_description"] = None
                    print("&&& None &&&&")
            else:
                city_dict["city_name"] = city_data[2]
                if city_data[3] == None:
                    county_url = "http://api.datausa.io/attrs/geo/" + county_id
                    response2 = requests.get(county_url)
                    data2 = json.loads(response2.text)
                    county_data = data2["data"][0]
                    if county_data[3] == None:
                        city_dict["city_image"] = None
                    else:
                        city_dict["city_image"] = flicker_pic_url(county_data[3])
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


    print("********************************* failed " + str(failed) + " count " + str(count))

    with open('cities.json', 'w') as fi:
        json.dump(cities_list, fi)

def flicker_pic_url(url):
    global c
    html_page = urllib2.urlopen(url + "/sizes")
    soup  = BeautifulSoup(html_page)

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
        c += 1
        return None

if __name__ == "__main__":
    cities_basic_info()
    print("c = " + str(c))
