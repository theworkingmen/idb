from flask import Flask, render_template, request
import git

application = Flask(__name__)

@application.route('/')
def student():
    return render_template('splash.html')
   ##return render_template('about.html')

@application.route('/about')
def about():
   return render_template('about.html')

@application.route('/colleges')
def colleges():
   return render_template('colleges.html')

@application.route('/cities')
def cities():
   return render_template('cities.html')

@application.route('/majors')
def majors():
   return render_template('majors.html')

@application.route('/api/about')
def api_about():
    return git.get_commit_stat()

if __name__ == '__main__':
   application.run(debug = True)
