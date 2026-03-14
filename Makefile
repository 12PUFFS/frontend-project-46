install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	@echo "Linting disabled"

test:
	npm test