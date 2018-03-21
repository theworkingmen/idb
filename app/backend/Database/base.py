
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

engine = create_engine('postgresql://theworkingmen:cs373downing@majorpotential-database.coujqf2v990h.us-east-1.rds.amazonaws.com/majorpotential')
Session = sessionmaker(bind=engine)

Base = declarative_base()
