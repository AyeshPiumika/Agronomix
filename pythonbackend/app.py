# Importing essential libraries and modules
from flask import Flask, render_template, request, Markup
import numpy as np
import pandas as pd
import requests
import config
import pickle
import os
import json

app = Flask(__name__)
app.static_folder = 'static'
# Define the fertilizer recommendations dictionary
fertilizer_dic = {
    'NHigh': 'Use nitrogen-rich fertilizer sparingly.',
    'Nlow': 'Increase nitrogen-rich fertilizer application.',
    'PHigh': 'Use phosphorus-rich fertilizer sparingly.',
    'Plow': 'Increase phosphorus-rich fertilizer application.',
    'KHigh': 'Use potassium-rich fertilizer sparingly.',
    'Klow': 'Increase potassium-rich fertilizer application.'
}

# -------------------------LOADING THE TRAINED MODELS -----------------------------------------------

# Loading crop recommendation model

# Get the directory of the current script (App.py)
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the RandomForest.pkl file
crop_recommendation_model_path = os.path.join(
    script_dir, 'models', 'RandomForest.pkl')

crop_recommendation_model = pickle.load(
    open(crop_recommendation_model_path, 'rb'))

# =========================================================================================

# Custom functions for calculations

def weather_fetch(city_name):
    """
    Fetch and return the temperature and humidity of a city
    :param city_name: Name of the city
    :return: temperature, humidity or None if there was an error
    """
    api_key = config.weather_api_key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"

    complete_url = base_url + "q=" + city_name + "&appid=" + api_key
    response = requests.get(complete_url)

    try:
        data = response.json()
        if data["cod"] == 200:
            main_data = data["main"]
            temperature = round(main_data["temp"] - 273.15, 2)  # Convert to Celsius
            humidity = main_data["humidity"]
            return temperature, humidity
        else:
            print("API request failed with status code:", data["cod"])
    except json.JSONDecodeError:
        print("Failed to decode JSON response from API.")
    return None

# render home page
@app.route('/')
def home():
    title = 'Agronomix - Home'
    return render_template('./home.html', title=title)

# @app.route('/disease-prediction')
# def disease_prediction():
#     title = 'Agronomix - Yield predict'
#     return render_template('disease.html', title=title)

@app.route('/yield-prediction')
def yield_prediction():
    title = 'Agronomix - Yield predict'
    return render_template('yield.html', title=title)


# render crop recommendation form page
@app.route('/crop-recommend')
def crop_recommend():
    title = 'Agronomix - Crop Recommendation'
    return render_template('crop.html', title=title)

# render fertilizer recommendation form page
@app.route('/fertilizer')
def fertilizer_recommendation():
    title = 'Agronomix - Fertilizer Suggestion'
    return render_template('fertilizer.html', title=title)

# render crop recommendation result page
@app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    title = 'Agronomix - Crop Recommendation'

    if request.method == 'POST':
        N = int(request.form['nitrogen'])
        P = int(request.form['phosphorous'])
        K = int(request.form['pottasium'])
        ph = float(request.form['ph'])
        rainfall = float(request.form['rainfall'])

        city = request.form.get("city")

        if weather_fetch(city) != None:
            temperature, humidity = weather_fetch(city)
            data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            my_prediction = crop_recommendation_model.predict(data)
            final_prediction = my_prediction[0]

            return render_template('crop-result.html', prediction=final_prediction, title=title)

        else:
            return render_template('try_again.html', title=title)

# render fertilizer recommendation result page
@app.route('/fertilizer-predict', methods=['POST'])
def fert_recommend():
    title = 'Agronomix - Fertilizer Suggestion'

    crop_name = str(request.form['cropname'])
    N = int(request.form['nitrogen'])
    P = int(request.form['phosphorous'])
    K = int(request.form['pottasium'])

    # df = pd.read_csv(r'pythonbackend\Data\fertilizer.csv')

    # Construct the absolute path to the fertilizer.csv file
    csv_file_path = os.path.join(script_dir, 'Data', 'fertilizer.csv')

    # Read the CSV file
    df = pd.read_csv(csv_file_path)


    nr = df[df['Crop'] == crop_name]['N'].iloc[0]
    pr = df[df['Crop'] == crop_name]['P'].iloc[0]
    kr = df[df['Crop'] == crop_name]['K'].iloc[0]

    n = nr - N
    p = pr - P
    k = kr - K
    temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
    max_value = temp[max(temp.keys())]
    if max_value == "N":
        if n < 0:
            key = 'NHigh'
        else:
            key = "Nlow"
    elif max_value == "P":
        if p < 0:
            key = 'PHigh'
        else:
            key = "Plow"
    else:
        if k < 0:
            key = 'KHigh'
        else:
            key = "Klow"

    response = Markup(str(fertilizer_dic[key]))

    return render_template('fertilizer-result.html', recommendation=response, title=title)

# --------------------------------------------------------------------------------------------------------------------

# crop_yield_predicting_model_path = os.path.join(
#     script_dir, 'models', 'linear_regression_crop_yield_model.pkl')

# crop_yield_predicting_model = pickle.load(
#     open(crop_yield_predicting_model_path, 'rb'))

# @app.route('/yield-predict', methods=['POST'])
# def predict_yield():  # Rename the function to avoid conflict
#     title = 'Agronomix - Crop Yield Prediction'

#     if request.method == 'POST':
#         temperature = float(request.form['temperature'])
#         rainfall = float(request.form['rainfall'])
#         humidity = float(request.form['humidity'])
#         fertilizer = float(request.form['fertilizer'])
#         irrigation = float(request.form['irrigation'])

#         # Make a prediction using the loaded model for crop yield
#         data = np.array([[temperature, rainfall, humidity, fertilizer, irrigation]])
        
#         # Use the crop_yield_predicting_model to make predictions
#         prediction = crop_yield_predicting_model.predict(data)

#         return render_template('disease-result.html', prediction=f'Predicted Crop Yield: {prediction:.2f} kg/acre', title=title)

#     else:
#         return render_template('try_again.html', title=title)

import joblib

# Construct the absolute path to the trained Linear Regression model
crop_yield_predicting_model_path = os.path.join(
    script_dir, 'models', 'linear_regression_crop_yield_model.pkl')

# Load the trained Linear Regression model using joblib
crop_yield_predicting_model = joblib.load(
    open(crop_yield_predicting_model_path, 'rb'))

@app.route('/yield-predict', methods=['POST'])
def predict_yield():
    title = 'Agronomix - Crop Yield Prediction'

    if request.method == 'POST':
        temperature = float(request.form['temperature'])
        rainfall = float(request.form['rainfall'])
        humidity = float(request.form['humidity'])
        fertilizer = float(request.form['fertilizer'])
        irrigation = float(request.form['irrigation'])

        # Make a prediction using the loaded model for crop yield
        data = np.array([[temperature, rainfall, humidity, fertilizer, irrigation]])

        # Use the crop_yield_predicting_model to make predictions
        prediction = crop_yield_predicting_model.predict(data)

        return render_template('yield-result.html', prediction=f'Predicted Crop Yield: {prediction[0]:.2f} kg/acre', title=title)

    else:
        return render_template('try_again.html', title=title)

if __name__ == '__main__':
    app.run(debug=True, port=8080)  