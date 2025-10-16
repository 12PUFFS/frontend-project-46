install:
	npm install

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npx jest --coverage

watch:
	npx jest --watch