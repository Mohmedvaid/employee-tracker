const connection = require('./config/connections')

async function test(){
    let arr = [];
    let test = await connection.query(`SELECT * FROM department`)
    test.forEach(e => {
        arr.push(e.id+" "+e.name);
    });
    
};

test()