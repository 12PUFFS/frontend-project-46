install:
	npm install

publish:
	npm publish --dry-run

lint:
	npm run lint

test:
	npm test

test-coverage:
	npm run test:coverage

ci:
	npm run ci