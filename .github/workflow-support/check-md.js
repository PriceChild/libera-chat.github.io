const { check } = require('check-md')
const path = require('path')

check({
  pattern: '**/*.md',
  ignore: ['**/node_modules'],
  exitLevel: 'error',
  root: ['./', './content'],
  defaultIndex: ['README.md', 'index.md'],
  //slugify: compose(deeplyParseHeaders, slugify),
  cwd: process.cwd()
}).then(result => {
  let failed = false
  for (const { type, list } of Object.values(result)) {
    for (const match of list) {
      failed = true
      const relativePath = path.relative(process.cwd(), match.fileUrl)
      console.error(`${relativePath}:${match.line}:${match.col}:${type === 'warn' ? 'warning' : type}:${match.errMsg}`)
    }
  }
  process.exit(failed ? 1 : 0)
})
