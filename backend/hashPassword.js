const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'password123'; // Remplacez par le mot de passe à hacher
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Mot de passe haché:', hashedPassword);
}

hashPassword();