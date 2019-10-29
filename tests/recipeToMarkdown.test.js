const expect = require('expect')

const recipeToMarkdown = require('../lib/recipeToMarkdown').default
const { empty, minimal, medium, complete } = require('./fixtures')

module.exports = {
  run: () => {
    expect(recipeToMarkdown(empty.recipe)).toBe(empty.markdown)
    expect(recipeToMarkdown(minimal.recipe)).toBe(minimal.markdown)
    expect(recipeToMarkdown(medium.recipe)).toBe(medium.markdown)
    expect(recipeToMarkdown(complete.recipe)).toBe(complete.markdown)
  }
}
