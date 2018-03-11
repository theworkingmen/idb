import sys
import logging
import pymysql  
import json

# Important note, do not run this yet! Our database does not support city names
# as long as some .json entries are. This will be fixed later, then this script
# should work fine.

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
        except KeyError :
            # something was missing from json file, move to next instance
            print("We are missing something from the json file for this instance")
            continue
        except TypeError :
            # Expected error if one or more values given in json are NULL
            # Also, I can't 100% say this is the only case which gives this error
            print("NULL values given for this instance")
            continue
        
        print("Creating a city instance for " + name ", " + state +  ", ID " + pk)
        with conn.cursor() as cursor:
            # create new city - update this statement when new info added (including image_desc)
            sql = "INSERT INTO cities (pk, name, state, image) \
              VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (pk, name, state, image))
        conn.commit()
        print()


    conn.close()
    print("Table successfully populated.")
    
    return

__main__()






