import fs from 'fs';
/**
 * ## sqlite与postgres不同点
 * 1.
 * sqlite: AUTOINCREAMENT
 * postgresql: GENERATED BY DEFAULT AS IDENTITY
 *
 * 2.
 * sqlite: datetime
 * postgresql: timestamp
 *
 * 3.
 * sqlite: update sqlite_sequence set seq = 1000 where name = 'sys_role' ;
 * postgresql: select setval('sys_role_id_seq', 1000);
 *
 * 4.
 * sqlite: "disabled" boolean DEFAULT (0)
 * postgresql: "disabled" boolean DEFAULT (false)
 *
 * 5.
 * sqlite: last_insert_rowid()
 * postgresql: LASTVAL()
 *
 * 6.
 * sqlite: integer
 * postgresql: bigint
 */
function transformPG() {
  // 读取文件列表
  const sqliteFiles = fs.readdirSync('./migration/');
  const pgFiles = fs.readdirSync('./migration-pg/');
  //找出pg里面没有的文件
  const notFiles = sqliteFiles.filter(file => !pgFiles.includes(file));
  for (const notFile of notFiles) {
    //开始转换
    const sqliteSql = fs.readFileSync(`./migration/${notFile}`, 'utf-8');
    let pgSql = sqliteSql.replaceAll(/AUTOINCREMENT/g, 'GENERATED BY DEFAULT AS IDENTITY');
    pgSql = pgSql.replaceAll(/datetime/g, 'timestamp');
    pgSql = pgSql.replaceAll(/boolean DEFAULT \(0\)/g, 'boolean DEFAULT (false)');
    pgSql = pgSql.replaceAll(/boolean.*NOT NULL DEFAULT \(0\)/g, 'boolean NOT NULL DEFAULT (false)');
    pgSql = pgSql.replaceAll(/integer/g, 'bigint');
    pgSql = pgSql.replaceAll(/last_insert_rowid\(\)/g, 'LASTVAL()');
    fs.writeFileSync(`./migration-pg/${notFile}`, pgSql);
  }

  if (notFiles.length > 0) {
    console.log('sqlite->pg 转换完成');

    throw new Error('sqlite->pg 转换完成，有更新，需要测试pg');
  } else {
    console.log('sql无需更新');
  }
}

function transformMysql() {
  // 读取文件列表
  const sqliteFiles = fs.readdirSync('./migration/');
  const pgFiles = fs.readdirSync('./migration-mysql/');
  //找出pg里面没有的文件
  const notFiles = sqliteFiles.filter(file => !pgFiles.includes(file));
  for (const notFile of notFiles) {
    //开始转换
    const sqliteSql = fs.readFileSync(`./migration/${notFile}`, 'utf-8');
    let pgSql = sqliteSql.replaceAll(/AUTOINCREMENT/g, 'AUTO_INCREMENT');
    pgSql = pgSql.replaceAll(/datetime/g, 'timestamp');
    //DEFAULT (xxx) 替换成 DEFAULT xxx
    pgSql = pgSql.replaceAll(/DEFAULT \(([^)]*)\)/g, 'DEFAULT $1');
    pgSql = pgSql.replaceAll(/integer/g, 'bigint');
    pgSql = pgSql.replaceAll(/last_insert_rowid\(\)/g, 'LAST_INSERT_ID()');

    //双引号 替换成反引号
    pgSql = pgSql.replaceAll(/"/g, '`');

    fs.writeFileSync(`./migration-mysql/${notFile}`, pgSql);
  }

  if (notFiles.length > 0) {
    console.log('sqlite->mysql 转换完成');

    throw new Error('sqlite->mysql 转换完成，有更新，需要测试mysql');
  } else {
    console.log('sql无需更新');
  }
}

transformPG();
transformMysql();