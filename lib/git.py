import requests
import json

""" Stores the github ids of group members. """
group_members = ['abelhtt', 'NealFM', 'smcw66', 'christian-onuogu', 'traylor1']

""" total commits of the repo """
total_commits = int()

""" total issues of the repo """
total_issues = int()


def get_git_stat():
    """ returns the Github status (commits, issues) of the repo in
        a json format. It caches the data. It queries api.github every
        10 minutes"""
    with open('static/cache/github_stat_cache.json', 'r ') as f:
        data_cache = json.load(f)
        f.close()

    if minuteMod(20):
        return json.dumps(data_cache)

    individual_commit_stat = data_cache['individual']

    get_commit_stat(individual_commit_stat)
    get_issue_stat(individual_commit_stat)

    total_commit_stat = {'commits': total_commits,
                         'issues': total_issues}

    data_output = {'individual': individual_commit_stat,
                   'total': total_commit_stat}

    with open('static/cache/github_stat_cache.json', 'w') as fileF:
        json.dump(data_output, fileF)

    return json.dumps(data_output)


def get_commit_stat(individual_commit_stat):
    """ Gets the commit stats from the github api"""

    git_url = "https://api.github.com/repos/smcw66/majorpotential/stats/contributors"
    response = requests.get(git_url)

    commit_data = json.loads(response.text)

    parse_commit_data(commit_data, individual_commit_stat)


def get_issue_stat(individual_commit_stat):
    """ Gets the issue stats from the github api """
    global total_issues
    global group_members

    for login in group_members:
        git_url = "https://api.github.com/repos/theworkingmen/majorpotential/issues?state=all&assignee=" + \
            login
        response = requests.get(git_url)
        issue_data = json.loads(response.text)
        num_issues = len(issue_data)
        i_stat = individual_commit_stat[login]
        i_stat['issues'] = num_issues
        total_issues = total_issues + int(num_issues)


def parse_commit_data(repo_commit_data, individual_commit_stat):
    """ parses and stores the data recieved by the github api """
    global total_commits

    for data in repo_commit_data:
        individual_info = {}
        author = data['author']
        login = author['login']
        individual_info['commits'] = data['total']
        total_commits = total_commits + data['total']
        individual_commit_stat[login] = individual_info


def minuteMod(x, p=0):
    """ Used to make sure the current min % x is 0"""
    import datetime
    minute = datetime.datetime.now() + datetime.timedelta(seconds=15)
    minute = int(datetime.datetime.strftime(minute, "%M"))
    if minute % x == p:
        return False
    return True


if __name__ == '__main__':
    """ To run the methods for dev purposes"""
    get_git_stat()