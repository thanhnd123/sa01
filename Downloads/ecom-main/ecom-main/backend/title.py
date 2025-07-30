import requests
import spacy
import pandas as pd
from rapidfuzz import fuzz, process
from textblob import TextBlob
from textstat import flesch_reading_ease
from collections import Counter
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk
import json
import re

nlp = spacy.load("en_core_web_sm")
nltk.download('punkt') 
nltk.download('stopwords')
nltk.download('punkt_tab')  

def extract_main_keywords(title, num_keywords=3):
    """
    Extracts the top 3 main keywords from an Amazon product title.
    :param title: The product title string.
    :param num_keywords: Number of keywords to extract (default is 3).
    :return: A list of main keywords.
    """

    # Define custom Amazon stopwords (expandable)
    amazon_stopwords = set(stopwords.words("english")).union({
        "for", "with", "and", "the", "an", "a", "in", "on", "of", "to", "by"
    })

    # Remove special characters and lowercase the title
    cleaned_title = re.sub(r'[^a-zA-Z0-9\s]', '', title).lower()

    # Tokenize words
    words = word_tokenize(cleaned_title)

    # Remove stopwords
    filtered_words = [word for word in words if word not in amazon_stopwords]

    # Count word frequencies
    word_counts = Counter(filtered_words)

    # Get the top 3 most common words
    main_keywords = [word for word, count in word_counts.most_common(num_keywords)]

    return main_keywords

def fetch_amazon_related_keywords(keyword):
    """
    Searches Amazon autocomplete API to find related high-ranking keywords.
    :param keyword: The primary keyword.
    :return: A list of related Amazon SEO keywords.
    """
    try:
        url = f"https://completion.amazon.com/search/complete?search-alias=aps&q={keyword}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return data[1][:5]  # Return top 5 related keywords
    except:
        pass
    return []


def check_title_structure(title):
    """
    Kiểm tra title Amazon có cấu trúc ngữ pháp hợp lý không.
    """
    doc = nlp(title.lower())
    
    # Đếm số lượng danh từ, tính từ, động từ
    noun_count = sum(1 for token in doc if token.pos_ == "NOUN")
    adj_count = sum(1 for token in doc if token.pos_ == "ADJ")
    verb_count = sum(1 for token in doc if token.pos_ == "VERB")
    
    print(noun_count, adj_count, verb_count)

    # Yêu cầu tối thiểu: Phải có ít nhất 1 danh từ & 1 tính từ
    if noun_count >= 1 and adj_count >= 1:
        return 4  # Cấu trúc tốt
    elif noun_count == 0 or adj_count == 0:
        return 2  # Thiếu mô tả
    else:
        return 1  # Title không rõ ràng

# Test thử



def readability_score(title):
    """
    Đánh giá độ dễ đọc của title dựa trên Flesch-Kincaid Readability Score.
    """
    score = flesch_reading_ease(title)
    
    if score >= 60:
        return 4  # Dễ đọc
    elif 30 <= score < 60:
        return 3  # Đọc hiểu trung bình
    elif 10 <= score < 30:
        return 2  # Hơi khó đọc
    else:
        return 1  # Quá phức tạp


def load_dangerous_patterns(filepath):
    dangerous_patterns_df = pd.read_csv(filepath)
    return set(dangerous_patterns_df["name"].str.lower())

def contains_dangerous_pattern(title, dangerous_patterns, threshold=93):
    title_words = title.lower().split()  # Split title into words
    for word in title_words:
        match, score, _ = process.extractOne(word, dangerous_patterns)
        if score >= threshold:
            return True  # Found a dangerous match
    return False  # No dangerous patterns found

# JSON Data: Amazon Title Rules
amazon_rules = {
    "not_allowed_characters": [
        "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "{", "}", "[", "]",
        "<", ">", "|", "\\", "/", "~", "_", "\"", "'", ";", ":"
    ],
    "not_allowed_symbols": [
        "🚫", "❌", "©", "®", "™"
    ],
    "rules": {
        "no_emojis": True,
        "no_html_tags": True,
        "no_excessive_punctuation": True,
        "no_excessive_capitalization": True,
        "max_length": 200,
        "capitalize_first_letter": True,
        "no_promotional_language": True,
        "no_subjective_claims": True,
        "no_seller_specific_info": True
    }
}

# List of promotional words and subjective claims (customizable)
promotional_words = {"best", "free", "discount", "cheap", "sale"}
subjective_claims = {"no.1", "top-rated", "best-selling", "top seller"}

# Function to check if a title is valid
def validate_amazon_title(title):
    errors = []

    # Check max length
    if len(title) > amazon_rules["rules"]["max_length"]:
        errors.append(f"Title exceeds {amazon_rules['rules']['max_length']} characters.")

    # Check for not-allowed characters
    for char in amazon_rules["not_allowed_characters"]:
        if char in title:
            errors.append(f"Contains forbidden character: {char}")

    # Check for not-allowed symbols
    for symbol in amazon_rules["not_allowed_symbols"]:
        if symbol in title:
            errors.append(f"Contains forbidden symbol: {symbol}")

    # Check for excessive capitalization
    if amazon_rules["rules"]["no_excessive_capitalization"] and title.isupper():
        errors.append("Title is in ALL CAPS.")

    # Check for excessive punctuation
    if amazon_rules["rules"]["no_excessive_punctuation"] and re.search(r"[!?]{2,}", title):
        errors.append("Contains excessive punctuation (e.g., multiple exclamation marks).")

    # Check for HTML tags
    if amazon_rules["rules"]["no_html_tags"] and re.search(r"<.*?>", title):
        errors.append("Contains HTML tags.")

    # Check for promotional words
    if amazon_rules["rules"]["no_promotional_language"]:
        words = set(title.lower().split())
        if words & promotional_words:
            errors.append("Contains promotional language (e.g., 'Best', 'Free', 'Discount').")

    # Check for subjective claims
    if amazon_rules["rules"]["no_subjective_claims"]:
        for claim in subjective_claims:
            if claim.lower() in title.lower():
                errors.append(f"Contains subjective claim: '{claim}'")

    # Check if first letter is capitalized
    if amazon_rules["rules"]["capitalize_first_letter"] and not title.istitle():
        errors.append("Title does not follow proper capitalization (capitalize first letter of each word).")

    return errors


def evaluate_amazon_title(title):
    """
    Đánh giá toàn diện title Amazon với NLP.
    """
    dangerous_patterns = contains_dangerous_pattern(title, load_dangerous_patterns("data/data.csv"))
    errors = validate_amazon_title(title)

    return {
        "title": title,
        "main_keyword": extract_main_keywords(title),
        "related_keywords": fetch_amazon_related_keywords(extract_main_keywords(title)[0]),
        "clarity_score": check_title_structure(title),
        "readability_score": readability_score(title),
        "dangerous": dangerous_patterns,
        "errors": errors,

    }

#render title 
