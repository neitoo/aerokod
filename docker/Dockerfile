FROM php:8.1-fpm

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions gd

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libicu-dev \
    libpng-dev \
    libjpeg-dev \
    libwebp-dev \
    libfreetype6-dev \
    libavif-dev \
    libaom-dev \
    libxpm-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    supervisor \
    cron \
    ffmpeg

RUN docker-php-ext-install -j$(nproc)  pdo_mysql mysqli bcmath sockets calendar gettext \
    && docker-php-ext-configure gd --with-freetype --with-webp --with-jpeg --with-avif --with-xpm \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd \
    && docker-php-ext-configure intl && docker-php-ext-install intl \
    && docker-php-ext-configure exif && docker-php-ext-install exif && docker-php-ext-enable exif \
    && pecl install xdebug-3.1.3 && docker-php-ext-enable xdebug && docker-php-ext-install pcntl

RUN apt-get install -y libpq-dev  \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

#RUN pecl install imagick && \
#        docker-php-ext-enable imagick

RUN apt-get update && apt-get install -y \
    libmagickwand-dev --no-install-recommends \
    && pecl install imagick \
	&& docker-php-ext-enable imagick

COPY ./docker/php/php.ini /usr/local/etc/php/conf.d/php.ini

# Install composer
#ENV COMPOSER_ALLOW_SUPERUSER=1
RUN curl -sS https://getcomposer.org/installer | php -- \
    --filename=composer \
    --install-dir=/usr/local/bin

RUN apt-get install -y \
        libzip-dev \
        zip \
  && docker-php-ext-install zip


# Create the log file to be able to run tail
RUN touch /var/log/cron.log

WORKDIR /var/www
