from app.modules.teamexp.model import getDataJson
import os
import json


def productType():
    data = getDataJson('product_types.json')
    return data

def roles():
    data = getDataJson('roles.json')
    return data

def teams():
    data = getDataJson('teams.json')
    return data

def users():
    data = getDataJson('users.json')
    return data