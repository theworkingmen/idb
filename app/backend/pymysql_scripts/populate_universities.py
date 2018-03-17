import sys
import logging
import pymysql
import json
import us_state_abbrev

"""
What's needed here:
-better handling for NULL values
--solution, don't use them, just skip ahead, remove those from .json entirely
-what if there're two colleges with the same name?
--solution, use ID value in .json instead as PK

I discovered today that there are two "Bethany College"s, one in Kansas and another in West Virginia
"""

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

    json_file = open("../scrapers/university.json", "r")
    uni_list = json.loads(json_file.read())
    # uni_list is a list of dicts, each dict is a university to enter

    # Must first delete everything within the table
    with conn.cursor() as cursor :
        sql = "DELETE FROM racial_demographics_university"
        cursor.execute(sql)
        sql = "DELETE FROM universities"
        cursor.execute(sql)
    conn.commit()

    for instance in uni_list :
        # Declare all variables we currently have - actually, is this necessary?
        name = ""
        state = ""
        tuitionin = 0
        tuitionout = 0
        pk = ""
				top_majors = {}
        white = black = hispanic = asian = unknown = 0.0
        try :
            # get all data we need
            name = instance["name"]
            #summary = (not yet in json)
            #city =
            state = us_state_abbrev.us_state_abbrev[instance["state"]]
            #social = "NULL"
            #restaurants = 0
            #nationalrank = 0
            #acceptance = 0.0
            tuitionin = instance["state_tuition"] + 0
            tuitionout = instance["oos_tuition"] + 0
            #image = "NULL"
            pk = instance["university_id"] + "" # Use university id as primary key
						top_majors = instance["top_grad_majors"]
            white = str(instance["demographics_white"]*100)
            black = str(instance["demographics_black"]*100)
            hispanic = str(instance["demographics_hispanic"]*100)
            asian = str(instance["demographics_asian"]*100)
            unknown = str(instance["demographics_other"]*100)
        except KeyError :
            # something was missing from json file, move to next instance
            print("We are missing something from the json file for this instance")
            continue
        except TypeError :
            # Expected error if one or more values given in json are NULL
            # Also, I can't 100% say this is the only case which gives this error
            print("NULL values given for this instance")
            continue

        print("Creating a uni instance for " + name ", ID " + pk)
        with conn.cursor() as cursor:
            # create new university - update this statement when new info added
            sql = "INSERT INTO universities (pk, name, state, in_state_tuition, out_state_tuition) \
              VALUES (%s, %s, %s, " + str(tuitionin) + ", " + str(tuitionout) + ")"
            cursor.execute(sql, (pk, name, state))
        conn.commit()
        print("Creating a demo instance")
        with conn.cursor() as cursor:
            sql = "INSERT INTO racial_demographics_university (university, \
              white, hispanic, black, asian, unknown) \
              VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (pk, white, hispanic, black, asian, unknown))
        conn.commit()
        print()


    conn.close()
    print("Tables successfully populated.")

    return

__main__()
