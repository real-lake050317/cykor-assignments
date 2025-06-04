FROM php:apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    && docker-php-ext-install mysqli \
    && docker-php-ext-enable mysqli \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-enable pdo_mysql

WORKDIR /var/www/html
EXPOSE 80
CMD ["apache2-foreground"]
