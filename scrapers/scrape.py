import requests
import json


universities_list = []

def get_university_stat():

    url = 'http://api.datausa.io/attrs/university'

    response = requests.get(url)

    basic_data = json.loads(response.text)

    uni_list = basic_data["data"]

    for uni in uni_list:
        sector = int(uni[0])
        university_dict = {}
        if (sector == 1) or (sector == 2) or (sector == 3):
            university_dict["name"] = uni[1]
            university_dict["website"] = uni[2]
            university_dict["county_id"] = uni[4]
            university_dict["state_id"] = uni[5]
            university_dict["latitude"] = uni[6]
            university_dict["longitude"] = uni[7]
            university_dict["university_id"] = uni[8]
            university_dict["msa"] = uni[9]
            universities_list.append(university_dict)

    with open('university.json', 'w') as f:
        json.dump(universities_list, f)



def get_commit_stat(individual_commit_stat):

    git_url = "https://api.github.com/repos/smcw66/majorpotential/stats/contributors"
    response = requests.get(git_url)

    commit_data = json.loads(response.text)

    parse_commit_data(commit_data, individual_commit_stat)




if __name__ == '__main__':
    get_university_stat()
