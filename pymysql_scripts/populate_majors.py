import sys
import logging
import pymysql  
import json

# Important note, do not run this yet! Our database does not support major names
# as long as some .json entries are. This will be fixed later, then this script
# should work fine.

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
    
    json_file = open("../src/scrapers/majors.json", "r")
    major_list = json.loads(json_file.read())
    # major_list is a list of dicts, each dict is a city to enter
    
    # Must first delete everything within the table
    with conn.cursor() as cursor :
        sql = "DELETE FROM majors"
        cursor.execute(sql)
    conn.commit()

    for instance in city_list :
        # Declare all variables we currently have - actually, is this necessary?
				name = ""
        pk = ""
				image = ""
				is_stem = "" # As of now, there is no entry for this in our database, will not be added yet
        try :
            # get all data we need
            image = instance["image_link"]
						if image is None :
						    image = ""
						pk = instance["major_id"] + "" # Use Major id as primary key
						name = instance["name"] + ""
						is_stem = instance["is_stem"] + ""
        except KeyError :
            # something was missing from json file, move to next instance
            print("We are missing something from the json file for this instance")
            continue
        except TypeError :
            # Expected error if one or more values given in json are NULL
            # Also, I can't 100% say this is the only case which gives this error
            print("NULL values given for this instance")
            continue
        
        print("Creating a major instance for " + name +  ", ID " + pk)
        with conn.cursor() as cursor:
            # create new major - update this statement when new info added (including is_stem)
            sql = "INSERT INTO majors (pk, name, image) \
              VALUES (%s, %s, %s)"
            cursor.execute(sql, (pk, name, image))
        conn.commit()
        print()


    conn.close()
    print("Table successfully populated.")
    
    return

__main__()






