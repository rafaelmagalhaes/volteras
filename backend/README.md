# Volteras Backend


### API

<details>
 <summary><code>GET</code> <code><b>/api/vehicles</b></code> <code>(gets list of all vehicles in database)</code></summary>

##### Parameters

> | name         | type                          | data type | description                               |
> |--------------|-------------------------------|-----------|-------------------------------------------|
> | `vehicle_id` | optional                      | uuid      | return all data belongs to vehicle_id     |
> | `limit`      | optional - default value = 10 | number    | how many records to fetch per page        |
> | `offset`     | optional - default value = 0  | number    | how many rows to skip when returning data |

##### Responses

> | http code | content-type        | response                                                                |
> |-----------|---------------------|-------------------------------------------------------------------------|
> | `200`     | `application/json`  | `{"totalCount":540,"limit": "1","offset": 10, "data":[{vehicleData}]} ` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/vehicles?limit=5&offset=10
> ```

</details>


<details>
 <summary><code>GET</code> <code><b>/api/vehicles/{id}</b></code> <code>(return single vehicle)</code></summary>

##### Parameters

> | name     | type | data type | description |
> |----------|------|-----------|-------------|
> | `None`   | N/A  |   N/A     | N/A         |

##### Responses

> | http code     | content-type               | response    |
> |---------------|----------------------------|-------------|
> | `200`         | `application/json`         | JSON Object |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/vehicles/1
> ```

</details>
<details>
 <summary><code>POST</code> <code><b>/api/vehicles/</b></code> <code>(add new vehicle)</code></summary>

##### Headers

> | name    | type   | data type | description              |
> |---------|--------|-----------|--------------------------|
> | `token` | Header |   N/A     | needs to mach value 123  |

##### Responses

> | http code | content-type               | response                                    |
> |-----------|----------------------------|---------------------------------------------|
> | `201`     | `application/json`         | Created data                                |
> | `401`     | `application/json`         | Unauthorised if token is incorrect          |
> | `400`     | `application/json`         | bad request if body doesnt match the schema |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/vehicles
> ```

</details>




## Project setup

convert `.env-example` to `.env` in root of backend folder

## Docker setup

This is the preferred and quickest way to start the project as this will create a database and populate the data from the csv files into the database

to get started run this

```bash
docker compose up --build -d
```
the `-d` command will run this in the background so terminal won't have to be open

We have 3 services running when we run the docker compose file

1. backed: this is nitro.js backend and will build base on `Dockerfile` in root `/backend/Dockerfile`
2. database: postgres database, this will run a `sql` script in `/backend/database/init.sql` this will create our `vehicle_data` table
3. csv_loader: python script in `/backend/csv_loader.py` which will loop over our csv files in `/backend/database/csv` and will add values into `vehicle_data`
table

### setup locally

For development, we can just run the `database` and `csv_loader` scripts in docker to create the database and populate the data.

once the `csv_loader` script is done and database is populated you need to change value of `DB_HOST` to `localhost` in the `.env` file


To get started with nitro

Install packages
```bash
npm install
```

Run locally 
```bash
npm run dev
```
this will open backend server in port `3000`