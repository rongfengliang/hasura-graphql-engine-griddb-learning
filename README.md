# pgspider + griddb + plv8

##  how to running

* build image

```code
docker-compose build
```

* start griddb && pgspider:griddb

```code
docker-compose up -d griddb pgspider-griddb
```

* init some datas
> after griddb start && source code in  `java-app` dir

```code
docker-compose up griddb-java
```

* use griddb_fdw extension

```code
CREATE EXTENSION griddb_fdw;

// use notification_member 
CREATE SERVER griddb_svr FOREIGN DATA WRAPPER griddb_fdw OPTIONS(notification_member 'griddb:10001',clustername 'defaultCluster');
CREATE USER MAPPING FOR public SERVER griddb_svr OPTIONS(username 'admin', password 'admin');
IMPORT FOREIGN SCHEMA griddb_schema FROM SERVER griddb_svr INTO public;
select * from col01;
```

* use plv8 extension

```code

// create plv8 extension
CREATE EXTENSION plv8;

// create shortid func
CREATE or replace FUNCTION shortid() RETURNS text AS
$$
   const shortid = require('shortid');
   const result = shortid.generate();
   return result;
$$
LANGUAGE plv8;
// register plv8  require funcs
cd node-app && yarn &&  node app.js 
// alter  database for session init plv8 func
ALTER DATABASE postgres SET "plv8.start_proc" TO "v8.plv8_init";
// maybe need restart pg server

// do some insert with  knex orm framework 
cd node-app && yarn &&  node index.js 
```
