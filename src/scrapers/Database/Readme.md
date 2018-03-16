This is the database code using sqlalchemy.

SQL databases behave less like object collections the more size and performance
start to matter; object collections behave less like tables and rows the more
abstraction starts to matter. SQLAlchemy aims to accommodate both of these
principles.


This Database has 3 major tables to represent our 3 models and 4 other tables to
form relationship between the models.

    The three tables are:
        universities
            primary_key = university_id
            columns = website, oos_tuition .... stuff in universities.json
        cities
            primary_key = city_id
            columns = unemployment, crime, .... stuff in cities.json
        majors
            primary_key = major_id
            columns = workforce_size, workforce_age, wage ..... stuff in majors.json

    The four relationship tables are
        university_top_major_association - many to many relationship to store majors
                                           with high number of grads in a university
        major_top_university_association - many to many relationship to store universities
                                           with a high number of grads for a major.
        majors_top_city_association      - many to many relationship to store cities
                                            with a high number of grads for a major.
        top_majors_in_city               - many to many relationship to store majors that
                                           have many graduates in a city.

    cities and universities are related by using one to many relationship (
        one city to many universities
        ). This is achieved by adding a ForeignKey in the university table.

The database currently has all the data we have so far.

How to run:
    get the user name and password for the database.
    put them in the appropriate position in base.py
    Start the population of the database by running init.py.

    
