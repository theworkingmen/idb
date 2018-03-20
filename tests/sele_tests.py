#!/usr/bin/env python

# To run this, you'll need to have installed selenium with "pip install selenium"
# Also install Chromedriver from https://sites.google.com/a/chromium.org/chromedriver/downloads
# and save the executable in your machine's PATH

# For now, this will not be handled via Travis CI

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class SeleTests():

    # Create and initialize a Google Chrome webdriver to run the tests.
    def initialize(self):
        self.driver = webdriver.Chrome(executable_path='chrome_driver/chromedriver.exe')
        driver = self.driver
        driver.get("http://majorpotential.me")

    # Test navbar - city page
    def test_navbar_city(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("Cities")
        nav_link.click()
        assert driver.current_url == "http://majorpotential.me/cities"
        cards = driver.find_elements_by_class_name("card-body")
        assert len(cards) > 0
        assert "Universities:" in cards[0].text
        assert "Notable job opportunities:" in cards[0].text

    # Test navbar - university page
    def test_navbar_university(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("Colleges")
        nav_link.click()
        assert driver.current_url == "http://majorpotential.me/colleges"
        cards = driver.find_elements_by_class_name("card-body")
        assert len(cards) > 0
        assert "Location:" in cards[0].text
        assert "Highest Ranked Major:" in cards[0].text

    # Test navbar - major page
    def test_navbar_major(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("Majors")
        nav_link.click()
        assert driver.current_url == "http://majorpotential.me/majors"
        cards = driver.find_elements_by_class_name("card-body")
        assert len(cards) > 0
        assert "Universities:" in cards[0].text
        assert "Most prominent city:" in cards[0].text

    # Test navbar - about page
    def test_navbar_about(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("About")
        nav_link.click()
        assert "Mitchell Traylor" in driver.page_source
        assert "Sungsup Lee" in driver.page_source
        assert "Abel Tesfaye" in driver.page_source
        assert "Neal Friesenhahn" in driver.page_source
        assert "Christian Onuogu" in driver.page_source

    # Close the driver
    def terminate(self):
        self.driver.close()

def main() :
    tester = SeleTests()
    tester.initialize()
    tester.test_navbar_city()
    tester.test_navbar_university()
    tester.test_navbar_major()
    tester.test_navbar_about()
    tester.terminate()
    print("All tests passed.")
    
if __name__ == "__main__" :
    main()