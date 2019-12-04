const expect = require('expect')

const recipeToMarkdown = require('../lib/recipeToMarkdown').default
const { empty, minimal, medium, complete } = require('./fixtures')

module.exports = {
  run: () => {
    expect(recipeToMarkdown(empty.recipe)).toStrictEqual(empty.markdown)
    expect(recipeToMarkdown(minimal.recipe)).toStrictEqual(minimal.markdown)
    expect(recipeToMarkdown(medium.recipe)).toStrictEqual(medium.markdown)
    expect(recipeToMarkdown(complete.recipe)).toStrictEqual(complete.markdown)
  }
}
