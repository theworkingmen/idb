import scrape_university, scrape_majors, scrape_cities

if __name__ == '__main__':

    # Add university data
    scrape_university.get_university_stat()
    scrape_university.add_image_links()
    scrape_university.add_tuition_stat()
    scrape_university.scrape_race_stat()
    scrape_university.add_race_stat()
    scrape_university.add_gender_stat()
    scrape_university.add_top_majors()
    scrape_university.remove_null_values()
    scrape_university.count_universities()
    scrape_university.add_university_type()

    # Add cities.data
    scrape_cities.cities_basic_info()
    scrape_cities.add_city_images_from_bing()
    scrape_cities.scrape_county_health_stat()
    scrape_cities.add_county_health_stat()
    scrape_cities.add_top_majors_in_county()

    # Add majors
    scrape_majors.majors_basic_info()
    scrape_majors.add_pictures_from_bing()
    scrape_majors.scrape_detail_info_major()
    scrape_majors.add_detail_info_major()
    scrape_majors.add_cities_top_grads_for_major()
    scrape_majors.add_universities_top_grads_for_major()

    # filter
    scrape_cities.filter_majors()
