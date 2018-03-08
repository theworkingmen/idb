import sys
import logging
import pymysql  

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
    # fields listed in order
    university = "BS University"
    university = university.lower()
    university = university.replace(" ", "_") 
    white = "0.0"
    hispanic = "0.0"
    black = "0.0"
    asian = "0.0"
    unknown = "0.0"
    # The table contains additional attributes, but our json only has those above so far
    try:
        with conn.cursor() as cursor:
            # create new demographics instance
            sql = "INSERT INTO racial_demographics_university (university, \
              white, hispanic, black, asian, unknown) \
              VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (university, white, hispanic, black, asian, unknown))
        conn.commit()
        with conn.cursor() as cursor:
            # Select all existing demographics data
            sql = "SELECT * FROM racial_demographics_university"
            cursor.execute(sql)
            selectdata = cursor.fetchall()
    finally:
        conn.close()
    # Print data for debugging purposes
    print(selectdata)
    return

__main__()
