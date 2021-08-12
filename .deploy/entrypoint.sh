#!/bin/sh

echo "🎬 entrypoint.sh: [$(whoami)] [PHP $(php -r 'echo phpversion();')]"

composer dump-autoload --no-interaction --no-dev --optimize

echo "🎬 artisan commands"

# 💡 Group into a custom command e.g. php artisan app:on-deploy
php artisan migrate --no-interaction --force

# Clear user carts
php artisan cart:clear

echo "Running with environment \"$APP_ENV\""

if [ "$APP_ENV" == "staging" ]
then
    echo "Setup Minio credentials"
    mc alias set market $MINIO_ENDPOINT $MINIO_ACCESS_KEY_ID $MINIO_SECRET_ACCESS_KEY

    echo "Syncing production Minio to staging"
    mc mirror market/$MINIO_SYNC_BUCKET market/$MINIO_BUCKET

    echo "Dumping production database to staging"
    mysqldump --host $DB_ORIGIN_HOST -u $DB_ORIGIN_USERNAME --password=$DB_ORIGIN_PASSWORD --port $DB_ORIGIN_PORT $DB_ORIGIN_DATABASE | mysql --host $DB_HOST -u $DB_USERNAME --password=$DB_PASSWORD --port $DB_PORT $DB_DATABASE
fi

echo "🎬 start supervisord"

supervisord -c $LARAVEL_PATH/.deploy/config/supervisor.conf
