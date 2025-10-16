### Hexlet tests and linter status:
[![Actions Status](https://github.com/12PUFFS/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/12PUFFS/frontend-project-46/actions)




# Gendiff
[![CI](https://github.com/your-username/frontend-project-46/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/frontend-project-46/actions/workflows/ci.yml)

[![Test Coverage](https://api.codeclimate.com/v1/badges/your-repo-id/test_coverage)](https://codeclimate.com/github/your-username/frontend-project-46/test_coverage)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=12PUFFS_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=12PUFFS_frontend-project-46)

Compares two configuration files and shows a difference.

## Installation


npm install
npm link


## Usage
gendiff file1.json file2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}

make install    # Install dependencies
make lint       # Run linter  
make test       # Run tests
make watch      # Run tests in watch mode

##Example
https://asciinema.org/a/o8eZQVOHGcsURnVfyfDwMB5gH