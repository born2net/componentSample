build:
	@npm install

test:
	@./node_modules/.bin/mocha

clean:
	@rm -rf node_modules test/outputs

release:
	@make clean
	@make build
	@make test

.PHONY: build clean release test
