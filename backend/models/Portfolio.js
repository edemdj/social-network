const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'edem1234',
  database: 'portfolio_social',
});

const createPortfolioTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS portfolios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      links TEXT,
      theme_id INT,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error creating portfolios table:', err);
    } else {
      console.log('Portfolios table created or already exists.');
    }
  });
};

module.exports = { connection, createPortfolioTable };