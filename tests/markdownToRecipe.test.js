const expect = require('expect')

const markdownToRecipe = require('../lib/markdownToRecipe').default
const { minimal, medium, complete } = require('./fixtures')

module.exports = {
  run: () => {
    expect(markdownToRecipe(minimal.markdown)).toStrictEqual(minimal.recipe)
    expect(markdownToRecipe(medium.markdown)).toStrictEqual(medium.recipe)
    expect(markdownToRecipe(complete.markdown)).toStrictEqual(complete.recipe)
  }
}
