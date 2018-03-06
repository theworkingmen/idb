import requests
import json


universities_list = []

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

def add_tuition_stat():

    temp_dict = {}

    url_get_tuition = 'http://api.datausa.io/api/?show=university&sumlevel=all&year=latest&required=oos_tuition,state_tuition'

    response = requests.get(url_get_tuition)
    tuition_data = json.loads(response.text)

    uni_data = tuition_data['data']

    for data in uni_data:
        if data is not None:
            tuition_list = [0, 0, 0]
            tuition_list[0] = data[3] # oos
            tuition_list[1] = data[4] # in state
            tuition_list[2] = data[0] # survey_year
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


    with open('university.json', 'w') as fi:
         json.dump(uni_total_data, fi)


if __name__ == '__main__':
    #get_university_stat()
    add_tuition_stat()
