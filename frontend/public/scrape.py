import requests
import json
from states import us_states_abbrev
from states import state_codes

"""
    filter out the republicans from the json for the visualization.
"""
def map_party_filter_democrats():
    with open('dem.json', 'r') as fi:
        dem = json.load(fi)

    with open('congress.json', 'r') as fi:
        data = json.load(fi)

    geo = data["objects"]["districts"]["geometries"]
    temp = []
    for g in geo:
        if str(g["id"]) in dem:
            print(g["id"])
            temp.append(g)

    data["objects"]["districts"]["geometries"] = temp

    with open('democrats.json', 'w') as fi:
        data = json.dump(data, fi)

"""
    filter out the democrats from the json for the visualization.
"""
def map_party_filter_republicans():
    with open('rep.json', 'r') as fi:
        rep = json.load(fi)

    with open('congress.json', 'r') as fi:
        data = json.load(fi)

    geo = data["objects"]["districts"]["geometries"]
    temp = []
    for g in geo:
        if str(g["id"]) in rep:
            print(g["id"])
            temp.append(g)

    data["objects"]["districts"]["geometries"] = temp

    with open('republicans.json', 'w') as fi:
        data = json.dump(data, fi)


"""
    gather the party for each district and write it to different files based on the party.
"""
def district_party():
    dem = {}
    rep = {}
    party_url = "http://api.swethepeople.me/representative/"
    response2 = requests.get(party_url)
    data = json.loads(response2.text)

    for district in data:
      state = district["state"]
      district_id = district["district"]
      state_code = state_codes[state]

      if district_id == "At-Large":
          temp = str(state_code) + "00"
          district_id = int(temp)
      else:
          district_id = int(district_id)
          #print("##" + str(district_id))
          if district_id < 10:
              temp = str(state_code) + "0" + str(district_id)
              district_id = int(temp)
          else:
              temp = str(state_code) + str(district_id)
              district_id = int(temp)

     # print(district_id)
      if district["party_id"] == 1:
          dem[district_id] = 1
      else:
          rep[district_id] = 1

    with open('dem.json', 'w') as fi:
        data = json.dump(dem, fi)

    with open('rep.json', 'w') as fii:
        data = json.dump(rep, fii)

"""
    counts the representatives for each party
"""
def party_rep_count():
    party_dict = {}
    party_url = "http://api.swethepeople.me/party/"
    response2 = requests.get(party_url)
    data = json.loads(response2.text)

    for party in data:
      rep = party["representatives"]
      party_dict[party["name"]] = len(rep)

    with open('party_rep_count.tsv', 'w') as fi:
        fi.write("Party_Name    Representatives\n")
        for party in party_dict:
            fi.write("%s    %s\n" % (party, party_dict[party]))

"""
    calculate the average votes for each party.
"""
def average_votes_with_party():

    party_dict = {}
    party_url = "http://api.swethepeople.me/party/"
    response2 = requests.get(party_url)
    data = json.loads(response2.text)

    for party in data:
      if (party["name"] != "Democratic Party") and (party["name"] != "Republican Party"):
          continue
      representatives = party["representatives"]
      rep_count = len(representatives)
      votes_with_sum = 0;
      for rep in representatives:
          votes_with_sum += rep["votes_with_party_pct"]

      party_dict[party["name"]] = votes_with_sum / rep_count


    with open('party_rep_average_vote.tsv', 'w') as fi:
        fi.write("Party_Name    Representatives\n")
        for party in party_dict:
            fi.write("%s    %s\n" % (party, party_dict[party]))

"""
    download the json file for drawing the districts.
"""
def map_coloring_congress():
    party_dict = {}
    party_url = "https://bl.ocks.org/mbostock/raw/4090846/us-congress-113.json"
    response2 = requests.get(party_url)
    data = json.loads(response2.text)

    with open('congress.json', 'w') as fi:
        json.dump(data, fi)

"""
    download the json file for drawing the us map.
"""
def map_coloring_us():
    party_dict = {}
    party_url = "https://bl.ocks.org/mbostock/raw/4090846/us.json"
    response2 = requests.get(party_url)
    data = json.loads(response2.text)

    with open('us.json', 'w') as fi:
        json.dump(data, fi)

"""
    flare data for visualizing the party break down per state
"""
def flare_data():

    with open('temp.json', 'r') as fi:
        data = json.load(fi)

    output_dict = {}
    output_dict["name"] = "flare"
    output_dict["description"] = "Flare"
    children_list = []
    output_dict["children"] = children_list

    for d, value in data.iteritems():
        curr_dict = {}
        curr_dict["name"] = d
        curr_dict["description"] = us_states_abbrev[d]
        child_list = []
        curr_dict["children"] = child_list

        republican_dict = {}
        republican_dict["name"] = "Republican"
        republican_dict["description"] = "Republican"
        republican_dict["color"] = "#FF0000"
        republican_dict["size"] = value["Republican"]


        democrat_dict = {}
        democrat_dict["name"] = "Democrat"
        democrat_dict["description"] = "Democrat"
        democrat_dict["color"] = "#FF0000"
        democrat_dict["size"] = value["Democrat"]

        child_list.append(republican_dict)
        child_list.append(democrat_dict)
        children_list.append(curr_dict)

    with open('flare.json', 'w') as fi:
        data = json.dump(output_dict, fi)

"""
    gather data for the flare_data function.
"""
def gather_data():
    party_id ={1: "Democrat", 2: "Republican"}
    state_dict = {}

    party_url = "http://api.swethepeople.me/representative/"
    response2 = requests.get(party_url)
    data = json.loads(response2.text)

    for d in data:
        temp_state = d["state"]
        if temp_state not in state_dict:
            state_dict[temp_state] = {"Democrat": 0, "Republican": 0}

        if d["party_id"] == 1:
            state_dict[temp_state]["Democrat"] = state_dict[temp_state]["Democrat"] + 1
        elif d["party_id"] == 2:
            state_dict[temp_state]["Republican"] = state_dict[temp_state]["Republican"] + 1

    with open('temp.json', 'w') as fi:
        json.dump(state_dict, fi)



if __name__ == "__main__":
    #flare_data()
    #gather_data()
    #map_coloring_congress()
    #map_coloring_us()
    #district_party()
    #map_party_filter_republicans()
    #map_party_filter_democrats()
