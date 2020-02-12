const PLV8 = require('plv8')
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
const plv8 = new PLV8(knexHandle);
plv8.on('log:error', msg => {
    console.error(msg)
})
process.on("uncaughtException",(err)=>{
    console.log("some wrong",err)
})
process.on("rejectionHandled",(err)=>{
    console.log("some wrong",err)
})
plv8.install({ modulePath: require.resolve("shortid"), moduleName: "shortid" })
    .then(() => {
        // eval some code
        return plv8.eval(() => {
            const shortid = require('shortid')
            return shortid.generate()
        })
    })
    .then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })