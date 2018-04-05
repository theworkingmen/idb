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

class SeleTests():

    # Create and initialize a Google Chrome webdriver to run the tests.
    def initialize(self):
        self.driver = webdriver.Chrome(executable_path='chrome_driver/chromedriver.exe')
        #self.driver = webdriver.Chrome('chrome_driver.exe')
        driver = self.driver
        driver.get("http://majorpotential.me")
        assert "<div class=\"carousel slide\">" in driver.page_source

    # Test navbar - city page
    def test_navbar_city(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("Cities")
        nav_link.click()
        driver.implicitly_wait(10) # Wait ten seconds for page to load
        assert driver.current_url == "http://majorpotential.me/cities"
        cards = driver.find_elements_by_class_name("thumbnail")
        assert len(cards) > 0
        # Pick two random city cards to test.
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        assert "Population: " in inner_html
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        assert "Population: " in inner_html
        
        # Tests for filtering and sorting
        dropdown_buttons = driver.find_elements_by_class_name("btn-group")
        dropdown_buttons[0].click()
        test_link = driver.find_element_by_link_text("Population")
        test_link.click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Bismarck')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        print(cards[0].get_attribute("innerHTML"))
        assert "Bismarck" in cards[0].get_attribute("innerHTML")
        dropdown_buttons = driver.find_elements_by_class_name("btn-group")
        dropdown_buttons[1].click()
        test_link = driver.find_element_by_link_text("Descending")
        test_link.click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Chicago')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "Chicago" in cards[0].get_attribute("innerHTML")
        dropdown_buttons = driver.find_elements_by_class_name("btn-group")
        dropdown_buttons[2].click()
        test_link = driver.find_element_by_link_text("Kentucky")
        test_link.click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Louisville')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "Louisville" in cards[0].get_attribute("innerHTML")
        test_link = driver.find_elements_by_class_name("btn-default")
        test_link[4].click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Aberdeen')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "Aberdeen" in cards[0].get_attribute("innerHTML")
        

    # Test navbar - university page
    def test_navbar_university(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("Universities")
        nav_link.click()
        driver.implicitly_wait(10) # Wait ten seconds for page to load
        assert driver.current_url == "http://majorpotential.me/colleges"
        cards = driver.find_elements_by_class_name("thumbnail")
        assert len(cards) > 0
        # Pick two random university cards to test.
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        print(inner_html)
        type_displayed = ("public" in inner_html) or ("private" in inner_html)
        assert type_displayed
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        type_displayed = ("public" in inner_html) or ("private" in inner_html)
        assert type_displayed
        
        # Tests for filtering and sorting
        dropdown_buttons = driver.find_elements_by_class_name("btn-group")
        dropdown_buttons[0].click()
        test_link = driver.find_element_by_link_text("In-State Tuition")
        test_link.click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Merchant Marine')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "Merchant Marine Academy" in cards[0].get_attribute("innerHTML")
        dropdown_buttons = driver.find_elements_by_class_name("btn-group")
        dropdown_buttons[1].click()
        test_link = driver.find_element_by_link_text("Descending")
        test_link.click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Samuel Merritt')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "Samuel Merritt" in cards[0].get_attribute("innerHTML")
        dropdown_buttons = driver.find_elements_by_class_name("btn-group")
        dropdown_buttons[2].click()
        test_link = driver.find_element_by_link_text("Texas")
        test_link.click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Southern Methodist')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "Southern Methodist" in cards[0].get_attribute("innerHTML")
        dropdown_buttons = driver.find_elements_by_class_name("btn-group")
        dropdown_buttons[3].click()
        test_link = driver.find_element_by_link_text("Public")
        test_link.click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'at Dallas')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "at Dallas" in cards[0].get_attribute("innerHTML")
        test_link = driver.find_elements_by_class_name("btn-default")
        test_link[5].click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Abilene')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "Abilene" in cards[0].get_attribute("innerHTML")

    # Test navbar - major page
    def test_navbar_major(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("Majors")
        nav_link.click()
        driver.implicitly_wait(10) # Wait ten seconds for page to load
        assert driver.current_url == "http://majorpotential.me/majors"
        cards = driver.find_elements_by_class_name("thumbnail")
        assert len(cards) > 0
        # Pick two random major cards to test.
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        assert "Average Wage: " in inner_html
        random_card = randint(1, len(cards)) - 1
        inner_html = cards[random_card].get_attribute("innerHTML")
        assert "Average Wage: " in inner_html
        
        # Tests for filtering and sorting
        dropdown_buttons = driver.find_elements_by_class_name("btn-group")
        dropdown_buttons[1].click()
        test_link = driver.find_element_by_link_text("Descending")
        test_link.click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Photographic')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "Photographic" in cards[0].get_attribute("innerHTML")
        dropdown_buttons = driver.find_elements_by_class_name("btn-group")
        dropdown_buttons[2].click()
        test_link = driver.find_element_by_link_text("STEM")
        test_link.click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Textile')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "Textile" in cards[0].get_attribute("innerHTML")
        test_link = driver.find_elements_by_class_name("btn-default")
        test_link[4].click()
        WebDriverWait(driver, 5).until(expected_conditions. \
            text_to_be_present_in_element((By.CLASS_NAME, 'thumbnail'), \
            'Accounting')) # Explicitly Wait
        cards = driver.find_elements_by_class_name("thumbnail")
        assert "Accounting" in cards[0].get_attribute("innerHTML")

    # Test navbar - about page
    def test_navbar_about(self):
        driver = self.driver
        nav_link = driver.find_element_by_link_text("About")
        nav_link.click()
        driver.implicitly_wait(10) # Wait ten seconds for page to load
        inner_html = driver.find_element_by_class_name("group_members").get_attribute("innerHTML")
        assert "The Team" in inner_html
        try :
            test_link = driver.find_element_by_partial_link_text("Github")
            test_link = driver.find_element_by_partial_link_text("Report")
        except NoSuchElementException : #pragma: no cover
            assert False                #pragma: no cover
            
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
        assert len(cards) == 1
        assert "-Hulman Institute of Technology" in cards[0].get_attribute("innerHTML")

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
    tester.test_search()
    tester.terminate()
    print("All tests passed.")

if __name__ == "__main__" :
    main()
