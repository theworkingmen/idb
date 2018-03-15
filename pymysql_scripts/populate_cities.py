import sys
import logging
import pymysql  
import json

# Important note, do not run this yet! Our database does not support city names
# (or county names) as long as some .json entries are. This will be fixed later,
# then this script should work fine.

# Passed a string containing the city's name and state separated by ", "
# Returns a tuple of the form (city, state)
def parse_city_state(full_str) :
    full_split = full_str.split(", ")
    return (full_split[0], full_split[1][:2])
    
   

def __main__() :
    
    rds_host  = "majorpotential-db.coujqf2v990h.us-east-1.rds.amazonaws.com"
    
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    print("Enter DB Username: ")
    name = input()
    print("Enter DB Password: ")
    password = input()
    print("Enter Database Name: ")
    db_name = input()
    try:
        conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=10)
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()
    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
    
    json_file = open("../src/scrapers/cities.json", "r")
    city_list = json.loads(json_file.read())
    # city_list is a list of dicts, each dict is a city to enter
    
    # Must first delete everything within the table
    with conn.cursor() as cursor :
        sql = "DELETE FROM city_top_majors"
        cursor.execute(sql)
        sql = "DELETE FROM cities"
        cursor.execute(sql)
    conn.commit()

    for instance in city_list :
        # Declare all variables we currently have - actually, is this necessary?
        full_name = ()
        name = ""
        state = ""
        pk = ""
        image = ""
        image_desc = "" # As of now, there is no entry for this in our database, will not be added yet
        county = ""
        population = ""
        top_majors = {}
        crime = ""
        unemployment = ""
        hs_grad = ""
        college = ""
        phys = ""
        try :
            # get all data we need
            full_name = parse_city_state(instance["city_name"])
            name = full_name[0]
            state = full_name[1]
            image = instance["city_image"]
            if image is None :
                image = ""
            image_desc = instance["image_description"]
            if image_desc is None :
                image_desc = ""
            pk = instance["city_id"] + "" # Use city id as primary key
            county = instance["county_name"]
            population = instance["population_in_county"]
            median_income = instance["median_household_income_in_county"]
            top_majors = instance["top_grad_majors"]
            crime = instance["violent_crime_in_county"]
            unemployment = instance["unemployment_in_county"]
            hs_grad = instance["high_school_graduation_rate_in_county"]
            college = instance["people_with_college_education_in_county"]
            phys = instance["primary_care_physicians_in_county"]
        except KeyError :
            # something was missing from json file, move to next instance
            print("We are missing something from the json file for this instance")
            continue
        except TypeError :
            # Expected error if one or more values given in json are NULL
            # Also, I can't 100% say this is the only case which gives this error
            print("NULL values given for this instance")
            continue
        except IndexError :
            # Expected error if city name isn't of the expected form
            print("City name error, improper form given.")
            continue
        
        print("Creating a city instance for " + name + ", " + state +  ", ID " + pk)
        with conn.cursor() as cursor:
            # create new city - update this statement when new info added (including image_desc)
            sql = "INSERT INTO cities (pk, name, state, county, population, \
              violent_crime, median_income, image, image_description, unemployment, high_school_grad, college_ed, num_physicians) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (pk, name, state, county, population, crime, median_income, image, image_desc, unemployment, hs_grad, college, phys))
        conn.commit()
        # Add top major data to auxilary table
        majors = []
        values = []
        with conn.cursor() as cursor:
            for m in top_majors :
                if m == "data_year" :
                    continue
                majors.append(m)
                values.append(top_majors[m])
            sql = "INSERT INTO city_top_majors (city, m1, m2, m3, m4, m5, \
              m1val, m2val, m3val, m4val, m5val) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (pk, majors[0], majors[1], majors[2], majors[3], majors[4], values[0], values[1], values[2], values[3], values[4]))
        conn.commit()
        print()


    conn.close()
    print("Table successfully populated.")
    
    return

__main__()
