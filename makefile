.DEFAULT_GOAL := all

FILES :=                         \
    app/frontend/src             \
	app/frontend/src/js          \
	app/frontend/src/images      \
	app/frontend/src/css         \
	app/backend/Database/        \
	app/backend/scrapers/        \
	application.log 			 \
    .travis.yml

.pylintrc:
	pylint --disable=locally-disabled --reports=no --generate-rcfile > $@

doc:

log:
	git log > application.log

all:
	make format
	make doc
	make log
	make compile

check:
			@not_found=0;                                 \
	    for i in $(FILES);                            \
	    do                                            \
	        if [ -e $$i ];                            \
	        then                                      \
	            continue;                             \
	        else                                      \
	            echo "$$i NOT FOUND";                 \
	            not_found=`expr "$$not_found" + "1"`; \
	        fi                                        \
	    done;                                         \
	    if [ $$not_found -ne 0 ];                     \
	    then                                          \
	        echo "$$not_found failures";              \
	        exit 1;                                   \
	    fi;                                           \
	    echo "success";

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -f  *.pyc
	rm -f  *.tmp
	rm -f  *.log

config:
	git config -l

format:
	autopep8 -i "app/backend/scrapers/scrape_cities.py"
	autopep8 -i "app/backend/scrapers/scrape_majors.py"
	autopep8 -i "app/backend/scrapers/scrape_university.py"

compile:
	python -m py_compile "app/backend/scrapers/scrape_cities.py"
	python -m py_compile "app/backend/scrapers/scrape_majors.py"
	python -m py_compile "app/backend/scrapers/scrape_university.py"

scrub:
	make clean
	rm -f  application.log

status:
	make clean
	@echo
	git branch
	git status

tests_run:
	python tests/backend_tests.py
travis:
	make clean
	ls -al
	make all
	make -r check
