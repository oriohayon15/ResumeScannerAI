import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

def preprocess_text(text):
    text = text.lower()
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words("english"))
    
    filtered_list = [word for word in tokens if word.casefold() not in stop_words and word.isalnum()]

    return " ".join(filtered_list)