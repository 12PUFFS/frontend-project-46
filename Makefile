# Установка зависимостей
install:
	npm ci

# Линтинг
lint:
	npm run lint

# Линтинг с исправлением
lint-fix:
	npm run lint:fix

# Запуск тестов
test:
	npm test

# Тесты с покрытием
test-coverage:
	npm run test:coverage

# Запуск утилиты
gendiff:
	node bin/gendiff.js $(ARGS)

# Помощь
help:
	node bin/gendiff.js -h

# Версия
version:
	node bin/gendiff.js -V

.PHONY: install lint lint-fix test test-coverage gendiff help version
%:
	@:
