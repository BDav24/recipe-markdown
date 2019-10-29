const expect = require('expect')

const markdownToRecipe = require('../lib/markdownToRecipe').default
const { minimal, medium, complete } = require('./fixtures')

module.exports = {
  run: () => {
    expect(markdownToRecipe(minimal.markdown)).toBe(minimal.recipe)
    expect(markdownToRecipe(medium.markdown)).toBe(medium.recipe)
    expect(markdownToRecipe(complete.markdown)).toBe(complete.recipe)
  }
}
