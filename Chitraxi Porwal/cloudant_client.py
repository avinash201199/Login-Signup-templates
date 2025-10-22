import os
from cloudant import Cloudant
from cloudant.error import CloudantException

def get_cloudant_client():
    url = os.getenv("CLOUDANT_URL")
    apikey = os.getenv("CLOUDANT_APIKEY")
    if not url or not apikey:
        raise RuntimeError("Cloudant credentials missing")
    client = Cloudant.iam(
        account_name=None,  # using full URL
        api_key=apikey,
        connect=True,
        url=url
    )
    return client

def get_users_db():
    client = get_cloudant_client()
    db_name = os.getenv("CLOUDANT_DB", "users")
    try:
        db = client.create_database(db_name, throw_on_exists=False)
    except CloudantException:
        db = client[db_name]
    return db
