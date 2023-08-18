#new flask RESTFul API for the Personal Books Library Project
from flask import Flask, request, render_template, jsonify
import sqlite3
app = Flask(__name__,template_folder="../app/templates/", static_folder="../app/static/")

@app.route('/') #this just provides with relevant information regarding which page/root it will belong to.
def welcome():
    return render_template("index.html")
if __name__ == '__main__':
    app.run(use_reloader= True, debug= True )


