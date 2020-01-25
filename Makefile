STAGE ?= dev

.PHONY: .ensure-stage-exists
.ensure-stage-exists:
ifeq (,$(wildcard ./docker-compose.$(STAGE).yml))
	@echo "Env $(STAGE) not supported."
	@exit 1
endif

.PHONY: .validate-tag
.validate-tag:
ifneq ($(STAGE),dev)
ifeq ($(IMAGE_TAG),)
	@echo "You can't build, push or deploy to production without an IMAGE_TAG.\n"
	@exit 1
endif
endif

.PHONY: cp-env
cp-env:
	cp .env.dist .env

.PHONY:
install-deps:
	docker-compose -f ./docker-compose.$(STAGE).yml run --rm app yarn install

.PHONY:
start:
	docker-compose -f ./docker-compose.$(STAGE).yml up

.PHONY:
test:
	docker-compose -f ./docker-compose.dev.yml run --rm app npm run test

.PHONY: build
build: .ensure-stage-exists .validate-tag
	docker-compose -f ./docker-compose.$(STAGE).yml build

.PHONY: push
push: .ensure-stage-exists .validate-tag
ifeq ($(STAGE),dev)
	@echo "You can't push dev env to remote repo.\n"
	@exit 1
endif
	docker-compose -f ./docker-compose.$(STAGE).yml push
