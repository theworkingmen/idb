.DEFAULT_GOAL := all

FILES :=                               \
    static                              \
		templates                 	        \
		application.py                      \
		git.py                        			\
		application.html										\
		git.html														\
		application.log 										\
	  .travis.yml

.pylintrc:
	pylint --disable=locally-disabled --reports=no --generate-rcfile > $@

doc: application.py
	-pydoc -w application
	-pydoc -w git

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
	            continue;                     \
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
	autopep8 -i application.py
	autopep8 -i git.py

compile:
	python -m py_compile application.py
	python -m py_compile git.py

scrub:
	make clean
	rm -f  application.html
	rm -f  git.html
	rm -f  application.log

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

travis: application.py application.html application.log
	make clean
	ls -al
	make all
	make -r check
