install:
	npm install

lint:
	@if command -v npx >/dev/null 2>&1; then \
		npx eslint .; \
	else \
		./node_modules/.bin/eslint .; \
	fi

test:
	npx jest

test-coverage:
	npx jest --coverage

watch:
	npx jest --watch