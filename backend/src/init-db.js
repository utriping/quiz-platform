import fs from 'node:fs'; import {pool} from './db.js';
try { await pool.query(fs.readFileSync(new URL('../sql/schema.sql',import.meta.url),'utf8')); console.log('Database schema created.'); } catch(e){console.error(e);process.exitCode=1;} finally{await pool.end();}
