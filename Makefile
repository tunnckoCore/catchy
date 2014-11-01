install:
	npm install

lint:
	$(MAKE) install
	./node_modules/.bin/jshint ./*.js

.PHONY: lint
