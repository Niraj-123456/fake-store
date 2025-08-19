
# build web image
docker-build-web:
	docker build --build-arg APP_NAME=web -t fake-store-frontend-web -f Dockerfile .

# build admin image
docker-build-admin:
	docker build --build-arg APP_NAME=admin -t fake-store-frontend-admin -f Dockerfile .