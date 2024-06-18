const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'avaliacao_pedidos',
  password: 'rjsys@2024',
  port: 5432,
});

// Endpoint para obter um cupom pelo código do cupom
app.get('/api/cupom/:codigo_cupom', async (req, res) => {
  const { codigo_cupom } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cupons WHERE codigo_cupom = $1', [codigo_cupom]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Cupom não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar cupom' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
