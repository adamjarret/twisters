.PHONY: help install build start docs

help:				## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}'

install:		## Install dependencies
	bundle install

build:			## Build site
	bundle exec jekyll build

start:			## Preview jekyll site locally
	bundle exec jekyll serve

docs:				## Run `yarn docs` in parent directory
	yarn --cwd .. docs
