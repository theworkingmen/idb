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


if __name__ == "__main__":
    majors_basic_info()
    add_pictures_from_bing()
