const { Pool } = require('pg');
const Router = require('express-promise-router');
const keys = require('../config/keys');


const pool = new Pool({
  connectionString: keys.posgresqlURI,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.post('/insertarpaciente', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  console.log(req.body)
  await pool.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.json('INSERTADO');
});



router.get('/consultatotalpacientes', async (req, res) => {
  console.log("aaaaa")
    const {rows} = await pool.query('SELECT * FROM pacientes');
    res.send(rows);

});


router.delete('/borrarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `DELETE FROM pacientes WHERE numid='${numid}';`
  );
  res.send('BORRADO');
});

router.post('/actualizarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `UPDATE pacientes SET nombre = '${nombre}', apellido = '${apellido}', numid = '${numid}' WHERE numid='${numid}';`
  );
  res.send('MODIFICADO');
});