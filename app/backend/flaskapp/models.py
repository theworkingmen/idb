from flask_sqlalchemy import SQLAlchemy 

from sqlalchemy.dialects.mssql import \
    BIGINT, BINARY, BIT, CHAR, DATE, DATETIME, DATETIME2, \
    DATETIMEOFFSET, DECIMAL, FLOAT, IMAGE, INTEGER, MONEY, \
    NCHAR, NTEXT, NUMERIC, NVARCHAR, REAL, SMALLDATETIME, \
    SMALLINT, SMALLMONEY, SQL_VARIANT, TEXT, TIME, \
    TIMESTAMP, TINYINT, UNIQUEIDENTIFIER, VARBINARY, VARCHAR

from flask import jsonify

from main import app, db



class University (db.Model):
    __tablename__ = "universities"
    pk = db.Column(db.VARCHAR(60), primary_key = True)
    name = db.Column(db.VARCHAR(60))
    summary = db.Column(db.TEXT)
    city = db.Column(db.VARCHAR(22))
    state = db.Column(db.CHAR(2))
    #social assoicated table
    num_restaurants = db.Column(db.Integer)
    ranking = db.Column(db.Integer)
    acceptance_rate= db.Column(db.DECIMAL(4,1))
    in_state_tuition = db.Column(db.Integer)
    out_state_tuition = db.Column(db.Integer)
    image = db.Column(db.VARCHAR(300))


class Major (db.Model):
    pk = db.Column (db.VARCHAR(40), primary_key = True)
    name = db.Column (db.VARCHAR(40))
    summary = db.Column (db.TEXT)
    employment_rate = db.Column (db.DECIMAL(4,1))
    #relevance associated table
    salaries = db.Column (db.Integer)
    image = db.Column(db.VARCHAR(300))

"""
class Cities (db.Model):
    pk = db.Column()
    name
    county
    state
    summary
    population
    crime_rate
    google_map
    COLI
    median_income
    jobs
    image    
"""