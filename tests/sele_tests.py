#!/usr/bin/env python

# To run this, you'll need to have installed selenium with "pip install selenium"
# Also install Chromedriver from https://sites.google.com/a/chromium.org/chromedriver/downloads
# and save the executable in your machine's PATH

# For now, this will not be handled via Travis CI

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from random import randint



class SeleTests():

    # Create and initialize a Google Chrome webdriver to run the tests.
    def initialize(self):
        self.driver = webdriver.Chrome(executable_path='chrome_driver/chromedriver.exe')
        #self.driver = webdriver.Chrome('chrome_driver.exe')
        driver = self.driver
        driver.get("http://majorpotential.me")
        assert "Welcome to Major Potential" in driver.page_source

    # Test navbar - city page
    def test_navbar_city(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("Cities")
        nav_link.click()
        driver.implicitly_wait(3) # Wait three seconds for page to load
        assert driver.current_url == "http://majorpotential.me/cities"
        cards = driver.find_elements_by_class_name("thumbnail")
        assert len(cards) > 0
        # Pick two random city cards to test.
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        assert "<a href=\"/cities/" in inner_html
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        assert "<a href=\"/cities/" in inner_html

    # Test navbar - university page
    def test_navbar_university(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("Colleges")
        nav_link.click()
        driver.implicitly_wait(3) # Wait three seconds for page to load
        assert driver.current_url == "http://majorpotential.me/colleges"
        cards = driver.find_elements_by_class_name("thumbnail")
        assert len(cards) > 0
        # Pick two random university cards to test.
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        assert "<a href=\"/colleges/" in inner_html
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        assert "<a href=\"/colleges/" in inner_html

    # Test navbar - major page
    def test_navbar_major(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("Majors")
        nav_link.click()
        driver.implicitly_wait(3) # Wait three seconds for page to load
        assert driver.current_url == "http://majorpotential.me/majors"
        cards = driver.find_elements_by_class_name("thumbnail")
        assert len(cards) > 0
        # Pick two random major cards to test.
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        assert "<a href=\"/majors/" in inner_html
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        assert "<a href=\"/majors/" in inner_html

    # Test navbar - about page
    def test_navbar_about(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("About")
        nav_link.click()
        driver.implicitly_wait(3) # Wait three seconds for page to load
        inner_html = driver.find_element_by_tag_name("body").get_attribute("innerHTML")
        assert "Bureau of Labor Statistics" in inner_html
        assert "Amazon Beanstalk" in inner_html
        assert "https://github.com/theworkingmen/idb" in inner_html

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
