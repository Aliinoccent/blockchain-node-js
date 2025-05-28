const pool=require('../config/db');

const allTables=async()=>{
account=`
create table if not exists account(
account_id serial not null primary key,
address varchar(255),
private_key varchar(255)
)
`
await pool.query(account);
 try {
    await pool.query(account);
    console.log('Account table created or already exists.');
  } catch (err) {
    console.error('Error creating account table:', err);
  }
}
module.exports=allTables;