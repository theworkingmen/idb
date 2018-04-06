[![Build Status](https://travis-ci.org/theworkingmen/idb.svg?branch=master)](https://travis-ci.org/theworkingmen/idb)

# MajorPotential

A website that links universities, cities where the universities are located, 
and popular majors offered at most universities.

## The Team
```
Abel Tesfaye,
Mitchell Traylor,
Christian Onuogu,
Sungsup Lee,
Neal Friesenhahn
```

## Links
```
The Website - http://majorpotential.me
API url -  http://api.majorpotential.me
API Doc - https://theworkingmen.gitbooks.io/api
Report - https://theworkingmen.gitbooks.io/report/
```

## Getting Started

Clone the repo by using 
```
git clone https://github.com/theworkingmen/idb/
```

The app contains two sections. 
The frontend code located at app/frontend, and the backend code located at app/backend.

### Prerequisites

Python
```
Check to see if Python is already installed:
$ python --version

and install it using 
$ sudo apt-get install python3

install pip
$ sudo apt-get install python-pip

add all the python dependencies required by
$ pip install -r app/backend/Database/requirements.txt
```

Node.js
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

We are using the create-react-app for the front-end.
```
Learn more about the create-react-app here,
* [Create-react-app](https://reactjs.org/docs/add-react-to-a-new-app.html)
```

### Running the backend server locally

```
$ python3 app/backend/Database/application.py
```

### Running the front-end locally

```
$ cd app/frontend
$ npm start
```

## Running the tests

API Tests
```
$ newman run tests/Postman.json
```

Backend Tests
```
$ python3 app/backend/tests.py
```

GUI Acceptance tests
```
$ cd tests
$ python3 sele_tests.py
```

Mocha javascript tests
```
$ cd frontend; npm i .; npm run test
```
Read the project report for more information about the content of the tests. 

## Deployment
* [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) - Elatic Beanstalk framework.

Install the EB CLI
```
$ pip install awsebcli --upgrade --user

Note - more steps might be needed for installing awsebcli for different OSs. Consult the AWS documentation for more info.
```

Deploy the api
```
$ cd app/backend/Database
$ eb init
$ eb create

eb command should be installed when installing EB CLI
```

Deploy the react node.js site
```
$ cd app/frontend
$ eb init
$ eb create

eb command should be installed when installing EB CLI
```

## Tools Used

* [Amazon Web Services](https://aws.amazon.com/elasticbeanstalk/) - Elatic Beanstalk framework.
* [AWS Relational Database Service (RDS)](https://aws.amazon.com/rds/) - used to host our server's database.
* [React](https://reactjs.org) - Used for developing the UI for our website.
* [React Bootstrap](https://react-bootstrap.github.io) - Used for a front-end CSS framework.
* [Reactstrap](https://reactstrap.github.io) - Used for a front-end CSS framework.
* [Flask](http://flask.pocoo.org) - Used for a back-end Python framework.
* [SQLAlchemy](https://www.sqlalchemy.org) - It is an ORM framework used to populate and Query our database.
* [Travis-CI](https://travis-ci.org) - Used for continuous integration, to build and test our site with each change made to our code repository.
* [Slack](https://slack.com) - Used primarily for team communication and file sharing.
* [Postman](https://www.getpostman.com) - Used to design and test our API.
* [Selenium](https://www.seleniumhq.org) - Testing framework for our GUI.
* [Mocha](https://mochajs.org) - Testing framework for the front-end javascript.

## Data Sources

* [Bureau of Labor Statistics](https://www.bls.gov/developers/api_signature_v2.html)
* [United States Census Bureau](https://www.census.gov/data/developers/data-sets/cbp-nonemp-zbp/cbp-api.html) 
* [Department of Education](https://api.data.gov/docs/ed/)
* [The Integrated Postsecondary Education Data System](https://nces.ed.gov/ipeds/)
* [Data USA API](https://datausa.io/about/datasets/)
* [Google Maps API](https://developers.google.com/maps/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgment

This project was done as part of a project for CS373-Software Engineering at the University of Texas at Austin.
