install:
	npm install

publish:
	npm publish --dry-run

lint:
	rm -rf node_modules
	npm ci
	npm run lint

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8