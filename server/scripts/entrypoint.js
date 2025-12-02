const { execSync } = require('child_process');

const DB_HOST = process.env.DB_HOST || 'db';
const DB_PORT = process.env.DB_PORT || '5432';

function waitForDB() {
  console.log(`Waiting for db ${DB_HOST}:${DB_PORT}...`);

  while (true) {
    try {
      execSync(`nc -z ${DB_HOST} ${DB_PORT}`, { stdio: 'ignore' });
      return;
    } catch {
      execSync('sleep 1');
    }
  }
}

function run(cmd) {
  console.log(cmd + '...');
  execSync(cmd, { stdio: 'inherit' });
}

(async () => {
  waitForDB();

  run('npm run db:create');
  run('npm run migration:run');
  run('npm run seed');

  try {
    execSync('test -f dist/src/main.js');
  } catch {
    run('npm run build');
  }

  run('npm run start:prod');
})();
