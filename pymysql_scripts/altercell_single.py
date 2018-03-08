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

    # Requirements: must supply table, primary key, column name, and new value
    table = "majors"
    pk = "bull_studies"
    column = "salary"
    new_value = "101"
        
    try:
        with conn.cursor() as cursor:
            # Debugging - Get initial major data
            sql = "SELECT * FROM " + table
            cursor.execute(sql)
            selectdata = cursor.fetchall()
            print(selectdata)

            # Update the desired value
            sql = "UPDATE " + table + " SET " + str(column) + " = " + str(new_value) + " WHERE pk = '" + str(pk) + "'"
            cursor.execute(sql)

            
            # Debugging - Get final major data, ensure difference
            sql = "SELECT * FROM " + table
            cursor.execute(sql)
            selectdata = cursor.fetchall()
            print(selectdata)
        conn.commit()

    finally:
        conn.close()
    return

__main__()






