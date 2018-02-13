from flask import Flask, render_template, request
import git

application = Flask(__name__)


@application.route('/')
def student():
    return render_template('splash.html')
   # return render_template('about.html')


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


@application.route('/city-austin')
def city_austin():
    return render_template('city-Austin.html')


@application.route('/city-houston')
def city_houston():
    return render_template('city-Houston.html')


@application.route('/city-colstat')
def city_colstat():
    return render_template('city-CollegeStation.html')


@application.route('/college-utexas')
def college_ut():
    return render_template('college-utexas.html')


@application.route('/college-texasam')
def college_tam():
    return render_template('college-texasAM.html')


@application.route('/college-uhouston')
def college_uh():
    return render_template('college-uhouston.html')


@application.route('/major-compsci')
def major_computer_science():
    return render_template('major-compsci.html')


@application.route('/major-nursing')
def major_nursing():
    return render_template('major-nursing.html')


@application.route('/major-petroleumengineering')
def major_petroleum_engineering():
    return render_template('major-petrolengineering.html')


@application.route('/api/about')
def api_about():
    return git.get_git_stat()

if __name__ == '__main__':
    application.run(debug=True)
