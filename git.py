import requests
import json

group_members = {'abelhtt': 'Abel Tesfaye',
                 'NealFM': 'Neal Friesenhahn',
                 'smcw66': 'Sungsup Lee',
                 'christian-onuogu': 'Christian Onuogu',
                 'traylor1': 'Mitchell Traylor'}


def get_commit_stat():
    git_url = "https://api.github.com/repos/smcw66/majorpotential/stats/contributors"
    response = requests.get(git_url)

    commit_data = json.loads(response.text)

    commit_stat = parse_commit_data(commit_data)

    return json.dumps(commit_stat)


def parse_commit_data(commit_data):
    commit_stat = []
    for data in commit_data:
        individual_info = {}
        author = data['author']
        login = author['login']
        name = group_members[login]
        individual_info['commits'] = data['total']
        individual_info['name'] = name
        commit_stat.append(individual_info)

    return commit_stat

if __name__ == '__main__':
    get_commit_stat()
