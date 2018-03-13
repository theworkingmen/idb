import requests
import json
from BeautifulSoup import BeautifulSoup
import urllib2

majors_list = []
image_failed_count = 0
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
        all_majors_dict[major_data[7]] = d #major_data[7] = major_id (cid)

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
                major_dict["image_link"] = flicker_pic_url(m_data["image_link"])
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
        number_of_images_failed_flicker+= 1
        return None

if __name__ == "__main__":
    majors_basic_info()
