# Binder Application But Web!

This is a prototype port of Binder application, but instead built for mobile devices, this project runs on browser.

## Getting Started

> Make sure `podman` and `node` has been installed already.

1. Open the `.env` file and fill it accordingly. For example,
```env
POSTGRES_USER=app
POSTGRES_PASSWORD=app
```

2. Run `podman-compose --env-file .env up`
3. Run the migration. Normally it should be done by e.g. `psql`, but this project offers an endpoint to run the migration and seeding as well:
```sh
curl -X POST http://localhost:3000/api/migrations
```

4. Verify the app is accessible at http://localhost:3000. A login page should appear by now.

## Demo Account

When the migration and the seed is executed, the following account can be used:

|Phone|OTP|Name|
|---|--|--|
|+621100110011|123456|Ted|
|+621122112211|123456|Ron|
|+621133113311|123456|Jackson|

## Known Caveat

- Registration is not usable. So registration should be done by hitting the following endpoint directly
  ```sh
  curl --request POST \
  --url http://localhost:3000/api/register \
  --header 'content-type: application/json' \
  --data '{
    "phone": "+6212341234",
    "otp": "123456",
    "name": "bono"
  }'
  ```
- Automated redirection when logged out is not implemented. When the app does not look responsive, try to login again. Visit http://localhost:3000/auth

## Related document

- [API contract](./docs/api.md)
- [Design document](./docs/overview.md)