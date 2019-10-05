prod-build:
	docker-compose -f docker-compose-prod.yml build

dev-build:
	docker-compose -f docker-compose-dev.yml build

dev-up:
	docker-compose -f docker-compose-dev.yml up

prod-up:
	docker-compose -f docker-compose-prod.yml up -d

prod-down:
	docker-compose -f docker-compose-prod.yml down -v

dev-down:
	docker-compose -f docker-compose-dev.yml down -v

logs:
	docker-compose -f docker-compose-prod.yml logs -f

pull:
	git pull

check-prod:
	./provisioning/check_environment_prod.sh

check-dev:
	./provisioning/check_environment_dev.sh

prod: check-prod prod-down prod-build prod-up

dev: check-dev dev-down dev-build dev-up

clean:
	docker ps -a | grep annuaire | xargs -r docker stop | xargs -r docker rm
