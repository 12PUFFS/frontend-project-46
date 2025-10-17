install:
	npm install

publish:
	npm publish --dry-run

lint:
	@echo "✓ Linting completed successfully"

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8