FROM ubuntu/apache2
WORKDIR /var/www/html
RUN mkdir home
RUN a2enmod rewrite
RUN service apache2 restart
COPY /dist/ ./home
COPY .htaccess ./home
COPY 000-default.conf /etc/apache2/sites-available
