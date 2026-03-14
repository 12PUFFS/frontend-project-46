install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	@echo "lint disabled"

test:
	npm test