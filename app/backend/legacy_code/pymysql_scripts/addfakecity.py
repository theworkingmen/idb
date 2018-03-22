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
    name = "Bull"
    county = "Bull"
    state = "TX"
    summary = "Welcome to the most BS city in Texas!"
    population = 2
    crime_rate = 0.0
    google_map = "NULL"
    cost_of_living = 1000000
    median_income = 10
    num_jobs_total = 1
    image_url = "NULL"
    pk = name + " " + state
    pk = pk.lower()
    pk = pk.replace(" ", "_")
    try:
        with conn.cursor() as cursor:
            # create new city
            sql = "INSERT INTO cities (pk, name, county, state, summary, population, crime_rate, google_map, cost_of_living, median_income, total_jobs, image) \
              VALUES (%s, %s, %s, %s, %s, " + str(population) + ", " + str(crime_rate) + ", %s, " + str(cost_of_living) + ", " + str(median_income) + ", " + str(num_jobs_total) + ", %s)"
            cursor.execute(sql, (pk, name, county, state, summary, google_map, image_url))
        conn.commit()
        with conn.cursor() as cursor:
            # Select all existing city data
            sql = "SELECT * FROM cities"
            cursor.execute(sql)
            selectdata = cursor.fetchall()
    finally:
        conn.close()
        # Print data for debugging
    print(selectdata)
    return

__main__()






