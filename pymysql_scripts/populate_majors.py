import sys
import logging
import pymysql  
import json

# Changes needed to table:
# -create compatible secondary tables for universities_2015 and cities_2015 data


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

    for instance in major_list :
        # Declare all variables we currently have - actually, is this necessary?
        name = ""
        pk = ""
        image = ""
        is_stem = "" # As of now, there is no entry for this in our database, will not be added yet
        salary_growth = ""
        salary = ""
        universities_2015 = {}
        cities_2015 = {}
        total = ""
        average_age = ""
        total_2015 = ""
        try :
            # get all data we need
            image = instance["image_link"]
            if image is None :
                image = ""
            pk = instance["major_id"] + "" # Use Major id as primary key
            name = instance["name"] + ""
            is_stem = str(instance["is_stem"]) + ""
            salary_growth = instance["wage_growth_rate"] + ""
            salary = instance["average_wage"] + ""
            universities_2015 = instance["universities_with_high_graduates_on_2015"]
            cities_2015 = instance["cities_with_high_graduates_on_2015"]
            total = instance["total_people_in_work_foce"] + ""
            average_age = instance["average_age_work_force"] + ""
            total_2015 = instance["total_degrees_awarded_in_2015"] + ""
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
            sql = "INSERT INTO majors (pk, name, salary, image, salary_growth, is_stem, total_workers, total_grads_2015, average_age) \
              VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (pk, name, salary, image, salary_growth, is_stem, total, total_2015, average_age))
        conn.commit()
        print()
        print("Test good.")
        return


    conn.close()
    print("Table successfully populated.")
    
    return

__main__()






