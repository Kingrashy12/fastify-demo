import crypto from 'crypto';

function jwt() {
  const key = crypto.randomBytes(32).toString('hex');
  console.log(key);
}

jwt();
