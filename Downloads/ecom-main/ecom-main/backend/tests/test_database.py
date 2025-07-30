import pytest
from unittest.mock import patch, MagicMock
from pymongo import MongoClient
from database.connect_database import connect_database
from config import Config

@pytest.fixture
def mock_mongo_client():
    with patch('database.connect_database.MongoClient') as mock_client:
        yield mock_client

def test_successful_database_connection(mock_mongo_client):
    # Setup mock
    mock_db = MagicMock()
    mock_mongo_client.return_value.get_database.return_value = mock_db
    
    # Call the function
    result = connect_database()
    
    # Assertions
    assert result == mock_db
    mock_mongo_client.assert_called_once_with(Config.MONGO_URI)
    mock_mongo_client.return_value.get_database.assert_called_once()

def test_failed_database_connection(mock_mongo_client):
    # Setup mock to raise an exception
    mock_mongo_client.side_effect = Exception("Connection failed")
    
    # Call the function
    result = connect_database()
    
    # Assertions
    assert result is None
    mock_mongo_client.assert_called_once_with(Config.MONGO_URI) 