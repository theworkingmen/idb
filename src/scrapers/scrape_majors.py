import requests
import json
from BeautifulSoup import BeautifulSoup
from keys import bing_key
import urllib2

majors_list = []
image_failed_count = 0
images_failed_bing = 0


def majors_basic_info():

    global image_failed_count

    added_majors_set = set()

    all_majors_dict = {}

    all_majors_url = "http://api.datausa.io/attrs/cip"

    response = requests.get(all_majors_url)
    all_majors_json = json.loads(response.text)
    all_majors_data = all_majors_json["data"]

    for major_data in all_majors_data:
        d = {}
        d["name"] = major_data[1]
        d["is_stem"] = major_data[3]
        d["image_link"] = major_data[4]
        all_majors_dict[major_data[7]] = d  # major_data[7] = major_id (cid)

    get_majors_url = "http://api.datausa.io/api/?show=cip&sumlevel=4&required=cip"

    response = requests.get(get_majors_url)
    majors_json = json.loads(response.text)
    majors = majors_json["data"]

    for major in majors:
        if major[1] not in added_majors_set:
            major_dict = {}
            m_data = all_majors_dict[major[1]]
            major_dict["major_id"] = major[1]
            major_dict["name"] = m_data["name"]
            major_dict["is_stem"] = m_data["is_stem"]
            if m_data["image_link"] is not None:
                major_dict["image_link"] = flicker_pic_url(
                    m_data["image_link"])
            else:
                major_dict["image_link"] = None
                image_failed_count += 1
                print("Image_falied.")

            added_majors_set.add(major_dict["major_id"])
            majors_list.append(major_dict)

            print("**** Processed " + m_data["name"])

    print("Failed images count = " + str(image_failed_count))
    with open('majors.json', 'w') as fi:
        json.dump(majors_list, fi)


def add_pictures_from_bing():
    with open('majors.json', 'r') as f:
        majors_data = json.load(f)

    for major in majors_data:
        if major["image_link"] is None:
            major["image_link"] = scrape_city_pic_bing(major["name"])

    with open('majors.json', 'w') as fi:
        json.dump(majors_data, fi)


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


def scrape_city_pic_bing(major_name):
    global mages_failed_bing
    query = [major_name, major_name + " major", major_name + " major flicker"]
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
                print("success " + major_name + " " +
                      search_results["value"][0]["contentUrl"])
                return search_results["value"][0]["contentUrl"]

    number_of_images_failed_bing += 1
    print("*** failed " + city_name)
    return None

def scrape_detail_info_major():
    majors_dict = {}
    with open('majors.json', 'r') as fff:
        major_data = json.load(fff)

    for major in major_data:
        curr_major_dict = {}
        id = major["major_id"]
        try:
            url = "https://datausa.io//profile/stat/?sort=desc&sumlevel=all&cip=" + id + "&limit=1&year=all&show=cip&order=year&required=grads_total%2Cgrads_rank%2Cyear&col=grads_total&rank=1&dataset=False"
            response = requests.get(url)
            data = json.loads(response.text)
            total_degrees_awarded = data["value"]
            curr_major_dict["total_degrees_awarded_in_2015"] = total_degrees_awarded
            print("Added " + major["name"])

        except Exception as e:
            print("Failed total_degrees_awarded")

        try:
            url = "https://datausa.io/profile/stat/?sort=desc&sumlevel=all&cip=" + id + "&limit=1&year=all&show=cip&order=year&required=year%2Cavg_wage%2Cavg_wage_moe%2Cavg_wage_rank%2Cnum_ppl%2Cnum_ppl_moe&col=num_ppl&rank=1&dataset=False"
            response = requests.get(url)
            data = json.loads(response.text)
            total_work_force = data["value"]
            curr_major_dict["total_people_in_work_foce"] = total_work_force

        except Exception as e:
            print("Failed total_people_in_work_force")

        try:
            url = ("https://datausa.io//profile/stat/?sort=desc&sumlevel=all&cip=" + 
            id + "&limit=2&year=all&show=cip&order=year&required=year%2Cavg_wage%2C" +
            "avg_wage_moe%2Cavg_wage_rank%2Cnum_ppl%2Cnum_ppl_moe&col=avg_wage&rank=1&dataset=False")
            response = requests.get(url)
            data = json.loads(response.text)
            wage_data = data["value"]
            wage_list = wage_data.split(" and ", 2)
            curr_major_dict["average_wage"] = wage_list[0]
            wage_list[0] = wage_list[0].replace("$", "")
            wage_list[0] = wage_list[0].replace(",", "")
            wage_list[1] = wage_list[1].replace("$", "")
            wage_list[1] = wage_list[1].replace(",", "")
            #print(wage_list)
            wage_growth = round(((float(wage_list[0]) - float(wage_list[1])) / float(wage_list[1])) * 100, 2)
            curr_major_dict["wage_growth_rate"] = str(wage_growth) + "%"

        except Exception as e:
            print("Failed average_wage")

        try:
            url = ("https://datausa.io/profile/stat/?sort=desc&show=cip&required=year%2Cavg_age%2Cavg_age_moe" +
            "&sumlevel=all&cip=" + id + "&limit=1&year=all&order=year&col=avg_age&rank=1&dataset=pums")
            response = requests.get(url)
            data = json.loads(response.text)
            average_age = data["value"]
            curr_major_dict["average_age_work_force"] = average_age

        except Exception as e:
            print("Failed average_age")

        print("Added " + major["name"] + " job growth rate " + str(wage_growth) + "%")
        majors_dict[id] = curr_major_dict


    with open('add_majors.json', 'w') as ffff:
        json.dump(majors_dict, ffff)

def add_detail_info_major():
    with open('majors.json', 'r') as fff:
        major_data = json.load(fff)

    with open('add_majors.json', 'r') as fff:
        add_major_data = json.load(fff)

    for major in major_data:
        add_major = add_major_data[major["major_id"]]
        major["average_wage"] = add_major["average_wage"]
        major["total_degrees_awarded_in_2015"] = add_major["total_degrees_awarded_in_2015"]
        major["wage_growth_rate"]= add_major["wage_growth_rate"]
        major["average_age_work_force"] = add_major["average_age_work_force"]
        major["total_people_in_work_foce"] = add_major["total_people_in_work_foce"]

    with open('majors.json', 'w') as filee:
        json.dump(major_data, filee)

def add_cities_top_grads_for_major():
    with open('majors.json', 'r') as fff:
        majors_data = json.load(fff)

    with open('cities.json', 'r') as fi:
        cities_data = json.load(fi)

    allowed_cities = set()
    for city in cities_data:
        allowed_cities.add(city["city_id"])

    for major in majors_data:
        url = "http://api.datausa.io/api/?show=geo&sumlevel=msa&year=latest&required=grads_total&cip="
        id = major["major_id"]
        url = url + id
        response = requests.get(url)
        data_json = json.loads(response.text)
        cities_list = data_json["data"]

        temp_dict = {}
        year = 0
        for city in cities_list:
            temp_dict[city[1]] = city[3]
            year = city[0]

        count = 0
        cities_dict = {}
        for key in sorted(temp_dict, key=temp_dict.get, reverse=True):
            if key in allowed_cities:
                cities_dict[key] = temp_dict[key]
                count += 1

                if count == 5:
                    major["cities_with_high_graduates_on_" + str(year)] = cities_dict
                    break

        print("** Added " + major["name"] )


        with open('majors.json', 'w') as filee:
            json.dump(majors_data, filee)

def add_universities_top_grads_for_major():
    with open('majors.json', 'r') as fff:
        majors_data = json.load(fff)

    with open('university.json', 'r') as fi:
        uni_data = json.load(fi)

    allowed_universities = set()
    for uni in uni_data:
        allowed_universities.add(uni["university_id"])

    for major in majors_data:
        url = "http://api.datausa.io/api/?show=university&sumlevel=all&year=latest&required=grads_total&cip="
        id = major["major_id"]
        url = url + id
        response = requests.get(url)
        data_json = json.loads(response.text)
        uni_list = data_json["data"]

        temp_dict = {}
        year = 0
        for university in uni_list:
            temp_dict[university[2]] = university[3]
            year = university[0]

        count = 0
        uni_dict = {}
        for key in sorted(temp_dict, key=temp_dict.get, reverse=True):
            if key in allowed_universities:
                uni_dict[key] = temp_dict[key]
                count += 1

                if count == 5:
                    major["universities_with_high_graduates_on_" + str(year)] = uni_dict
                    break

        print("** Added " + major["name"] )


        with open('majors.json', 'w') as filee:
            json.dump(majors_data, filee)

if __name__ == "__main__":
    majors_basic_info()
    add_pictures_from_bing()
    scrape_detail_info_major()
    add_detail_info_major()
    add_cities_top_grads_for_major()
    add_universities_top_grads_for_major()
