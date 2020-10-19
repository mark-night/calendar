const fs = require('fs-extra');
const { join } = require('path');

const loadSqlQueries = async folder => {
  /**
   * Load in sql queries written in .sql files inside "folder",
   * return a queries object, where every sql file has a key in the object and
   * file content (sql queries) as the value.
   * Another approach might be to just write every sql query as a javascript
   * string instead of saving them in external files to be loaded while server
   * starting.
   * This is just personal preference.
   */
  const filePath = join(process.cwd(), 'src', 'db', folder);
  const files = await fs.readdir(filePath);
  const sqlFiles = files.filter(file => /\.sql$/i.test(file));
  const queries = {};
  for (const sqlFile of sqlFiles) {
    const prop = sqlFile.replace(/\.sql$/i, '').replace(/[^$\w]/g, '');
    queries[prop] = fs.readFileSync(join(filePath, sqlFile), {
      encoding: 'UTF-8',
    });
  }
  return queries;
};

module.exports = {
  loadSqlQueries,
};
