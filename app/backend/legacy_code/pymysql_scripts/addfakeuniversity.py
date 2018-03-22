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
    name = "BS University Massachusetts"
    summary = "BS University is complete BS, do not get your Master's degree here."
    city = "Bull"
    state = "MA"
    social = "NULL"
    restaurants = 0
    nationalrank = 0
    acceptance = 0.0
    tuitionin = 100000
    tuitionout = 100001
    image = "NULL"
    pk = name.lower()
    pk = pk.replace(" ", "_")  
    try:
        with conn.cursor() as cursor:
            # create new major
            sql = "INSERT INTO universities (pk, name, summary, city, state, num_restaurants, ranking, acceptance_rate, in_state_tuition, out_state_tuition, image) \
              VALUES (%s, %s, %s, %s, %s, " + str(restaurants) + ", " + str(nationalrank) + ", " + str(acceptance) + ", " + str(tuitionin) + ", " + str(tuitionout) + ", %s)"
            cursor.execute(sql, (pk, name, summary, city, state, image))
        conn.commit()
        with conn.cursor() as cursor:
            # Select all existing university data
            sql = "SELECT * FROM universities"
            cursor.execute(sql)
            selectdata = cursor.fetchall()
    finally:
        conn.close()
    # Print data for debugging purposes
    print(selectdata)
    return

__main__()






