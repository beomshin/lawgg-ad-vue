#!/bin/bash

cd /var/www

rm -rf /var/www/admin

sleep 1

cp -r /home/sp/source/admin/dist admin

sleep 1

service nginx restart

