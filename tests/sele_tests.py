#!/usr/bin/env python

# To run this, you'll need to have installed selenium with "pip install selenium"
# Also install Chromedriver from https://sites.google.com/a/chromium.org/chromedriver/downloads
# and save the executable in your machine's PATH

# For now, this will not be handled via Travis CI

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions

from random import randint

import unittest

class SeleTests(unittest.TestCase):

    # Create and initialize a webdriver to run the tests via Google Chrome.
    def initialize(self):
        self.driver = webdriver.Chrome()
        driver = self.driver
        driver.get("http://majorpotential.me")
        self.assertTrue("<div class=\"carousel slide\">" in driver.page_source)

    # Test site's city page
    def test_navbar_city(self):
        driver = self.driver
        self.navigate(driver, "Cities")
        self.assertTrue(driver.current_url == "http://majorpotential.me/cities")
        self.test_cards(driver, "Population: ")
        filter_testvals = ((0, "Population", "Bismarck"), \
            (1, "Descending", "Chicago"), \
            (2, "Kentucky", "Louisville"))
        self.test_filtering_sorting(driver, filter_testvals)
        self.reset_inner_contents(driver, 4, "Aberdeen")

    # Test site's university page
    def test_navbar_university(self):
        driver = self.driver
        self.navigate(driver, "Universities")
        self.assertTrue(driver.current_url == "http://majorpotential.me/colleges")
        self.test_cards(driver, "public", "private")
        filter_testvals = ((0, "In-State Tuition", "Merchant Marine"), \
            (1, "Descending", "Samuel Merritt"), \
            (2, "Texas", "Southern Methodist"), \
            (3, "Public", "at Dallas"))
        self.test_filtering_sorting(driver, filter_testvals)
        self.reset_inner_contents(driver, 5, "Abilene")

    # Test site's major page
    def test_navbar_major(self):
        driver = self.driver
        self.navigate(driver, "Majors")
        self.assertTrue(driver.current_url == "http://majorpotential.me/majors")
        self.test_cards(driver, "Average Wage: ")
        filter_testvals = ((1, "Descending", "Photographic"), \
            (2, "STEM", "Textile"))
        self.test_filtering_sorting(driver, filter_testvals)
        self.reset_inner_contents(driver, 4, "Accounting")

    # Test navbar - about page
    def test_navbar_about(self):
        driver = self.driver
        self.navigate(driver, "About")
        inner_html = driver.find_element_by_class_name("group_members").get_attribute("innerHTML")
        self.assertTrue("The Team" in inner_html)
        try :
            test_link = driver.find_element_by_partial_link_text("Github")
            test_link = driver.find_element_by_partial_link_text("Report")
        except NoSuchElementException : #pragma: no cover
            self.assertTrue(False)      #pragma: no cover
            
    # Test global search functionality
    def test_search(self):
        driver = self.driver
        driver.get("http://majorpotential.me")
        driver.implicitly_wait(10) # Wait ten seconds for page to load
        search_text = "rose indiana"
        search_field = driver.find_element_by_class_name("form-control")
        search_field.click()
        search_field.send_keys(search_text)
        search_link = driver.find_element_by_partial_link_text("Search")
        search_link.click()
        driver.implicitly_wait(3) # Wait three seconds for page to load
        cards = driver.find_elements_by_class_name("thumbnail")
        self.assertTrue(len(cards) == 1)
        self.assertTrue("-Hulman Institute of Technology" in cards[0].get_attribute("innerHTML"))

    # Close the driver
    def terminate(self):
        self.driver.close()
        
    # Navigate to another page from the site's navbar
    def navigate(self, driver, link_text):
        nav_link = driver.find_element_by_link_text(link_text)
        nav_link.click()
        driver.implicitly_wait(10) # Wait ten seconds for page to load
        
    # Test the current page, make sure it contains cards which contain the expected values
    def test_cards(self, driver, *expected_text):
        cards = driver.find_elements_by_class_name("thumbnail")
        self.assertTrue(len(cards) > 0)
        self.check_two_random_cards(cards, *expected_text)

    # Given a list of cards, pick two at random and verify they contain expected contents
    def check_two_random_cards(self, cards, *expected_text):
        self.assertTrue(len(expected_text))
        for check in range(0, 2) :
            random_card = randint(1, len(cards)) - 1
            inner_html = cards[random_card].get_attribute("innerHTML")
            found_expected = False
            for term in expected_text:
                found_expected = term in inner_html or found_expected
            self.assertTrue(found_expected)

    # Explicitly wait for page to load with expeced elements
    def explicit_wait(self, expected_text):
        driver = self.driver
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            expected_text))
            
    # Given an iterable of 3-tuples, runs filtering and sorting tests using their values
    def test_filtering_sorting(self, driver, testvals):
        for test in testvals :
            self.update_inner_contents(driver, test[0], test[1], test[2])
            
    # Update displayed content via filtering and sorting options
    def update_inner_contents(self, driver, button_index, link_text, expected_text):
        dropdown_buttons = driver.find_elements_by_class_name("btn-group")
        dropdown_buttons[button_index].click()
        test_link = driver.find_element_by_link_text(link_text)
        test_link.click()
        self.explicit_wait(expected_text)
        cards = driver.find_elements_by_class_name("thumbnail")
        self.assertTrue(expected_text in cards[0].get_attribute("innerHTML"))
    
    # Reset displayed content via the reset button
    def reset_inner_contents(self, driver, reset_index, expected_text):
        test_link = driver.find_elements_by_class_name("btn-default")
        test_link[reset_index].click()
        self.explicit_wait(expected_text)
        cards = driver.find_elements_by_class_name("thumbnail")
        self.assertTrue(expected_text in cards[0].get_attribute("innerHTML"))
        
# Testing main function: initializes the test object and its webdriver, runs all tests, then terminates
def main() :
    tester = SeleTests()
    tester.initialize()
    tester.test_navbar_city()
    tester.test_navbar_university()
    tester.test_navbar_major()
    tester.test_navbar_about()
    tester.test_search()
    tester.terminate()

if __name__ == "__main__" :
    main()
