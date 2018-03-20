import cities_populate, majors_populate, university_populate

if __name__ == "__main__":
    university_populate.university_basic_populate()
    university_populate.add_university_image_link()
    majors_populate.major_basic_populate()
    cities_populate.city_basic_populate()

    university_populate.add_city_relationship()
    university_populate.add_major_relationship()
    
    cities_populate.add_major_relationship()

    majors_populate.add_city_relationship()
    majors_populate.add_univeristy_relationship()
