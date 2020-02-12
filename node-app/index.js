const knex = require('knex')
const knexHandle = knex({
    client: 'pg',
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "dalong",
        database: "postgres"
    }
})
knexHandle.raw("insert into col01(name,status,count) values(shortid(),true,33)")
.then((result)=>{
    console.log(result)
})

knexHandle.raw("select * from  col01")
.then((result)=>{
    console.log(result)
})