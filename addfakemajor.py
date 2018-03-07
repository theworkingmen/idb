import sys
import logging
import rds_config
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
		
		name = "Bull Studies"
		summary = "We study bull."
		employment_rate = 1.0
		salary = 10
		image_url = "NULL"
		
    pk = name.lower()
		pk = pk.replace(" ", "_")
		
    try:
        with conn.cursor() as cursor:
            # create new major
            sql = "INSERT INTO majors (pk, name, summary, employment_rate, salary, image) \
              VALUES (%s, %s, %s, " + str(employment_rate) + ", " + str(salary) + ", %s)"
            cursor.execute(sql, (pk, name, summary, employment_rate, salary, image_url))
        conn.commit()
        with conn.cursor() as cursor:
				    # Select all existing major data
            sql = "SELECT * FROM majors"
            cursor.execute(sql)
            selectdata = cursor.fetchall()
    finally:
        conn.close()
		# Print data for debugging purposes
    print(selectdata)
    return







