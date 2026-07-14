module.exports = {
  default: {
    require: ['src/**/*.ts'],
    requireModule: ['tsx/cjs'],
    format: [
      'progress-bar',
      'html:reports/cucumber.html',
      'json:reports/cucumber.json'
    ],
    paths: ['features/**/*.feature'],
    tags: 'not @wip',
    parallel: 1
  }
}
