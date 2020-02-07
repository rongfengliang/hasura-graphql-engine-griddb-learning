# pgspider + griddb

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

* use extension

```code
CREATE EXTENSION griddb_fdw;

// use notification_member 
CREATE SERVER griddb_svr FOREIGN DATA WRAPPER griddb_fdw OPTIONS(notification_member 'griddb:10001',clustername 'defaultCluster');
CREATE USER MAPPING FOR public SERVER griddb_svr OPTIONS(username 'admin', password 'admin');
IMPORT FOREIGN SCHEMA griddb_schema FROM SERVER griddb_svr INTO public;
select * from col01;
```