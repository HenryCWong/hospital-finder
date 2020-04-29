from time import sleep
from pymongo import MongoClient
import json
from bson.json_util import dumps
import os

jdata='{}'
URI = os.environ.get('ATLAS_MONGODB')

def update_data():
    while True:
        mongo_client = MongoClient(URI)
        db = mongo_client.HomelessResources.hospitals
        #db = mongo_client.heroku_j2c1w3bn.hospitalData
        jdata=list(db.find())
        with open('hospitalInfo.json', 'w') as jsonfile:
            jsonfile.write(dumps(jdata))
        mongo_client.close()
        sleep(15)

if __name__ == '__main__':
    update_data()
