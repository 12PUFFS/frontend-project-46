install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	@echo "Linting is disabled"

test:
	npm test