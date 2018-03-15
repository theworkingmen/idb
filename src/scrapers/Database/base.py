
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://theworkingmen:cs373downing@majorpotentialdb.cowt9szgvd8u.us-east-1.rds.amazonaws.com/majorpotential')
Session = sessionmaker(bind=engine)

Base = declarative_base()
