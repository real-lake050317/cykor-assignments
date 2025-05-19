## How do deploy 

### 1. Setup the .env file

Create .env file by

```shell
nano .env
```

Add three lines, just like the .env.example file.

* The `PORT` value is fixed to 80, the port where it is deployed.
* The `MONGO` value is used for connecting to the MongoDB database, recommend using MongoDB atlas.
* The `SECRET` value can be made using the following command:
  ```shell
  openssl rand -base64 32
  ```

### 2. Transfile Typescript files to Javascript

Run 

```shell
sudo npx tsc
```
