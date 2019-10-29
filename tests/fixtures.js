const empty = {
  recipe: {},
  markdown: ''
}

const minimal = {
  recipe: {
    title: 'My awesome recipe',
    directionGroups: [
      { directions: [{ content: [{ type: 'text', text: 'Put it all together, et voilà!' }] }] }
    ]
  },
  markdown: `
# My awesome recipe

## Directions

Put it all together, et voilà!
`
}

const medium = {
  recipe: {
    title: 'My awesome recipe',
    directionGroups: [
      { directions: [{ content: [{ type: 'text', text: 'Put it all together, et voilà!' }] }] }
    ],
    ingredientGroups: [
      {
        ingredients: [{ name: 'a bit of this' }, { quantity: 1, unit: 'spoon', name: 'of that' }]
      }
    ]
  },
  markdown: `
# My awesome recipe

## Ingredients

- a bit of this
- 1 spoon of that

---

## Directions

Put it all together, et voilà!
`
}

const complete = {
  recipe: {
    title: 'My awesome recipe',
    meta: {
      type: 'appetizer',
      tags: ['very', 'good'],
      places: [{ type: 'country', label: 'France' }],
      prepTime: '12 minutes',
      cookTime: '24 minutes',
      complexity: 'low',
      cost: 'high'
    },
    description: [
      { type: 'text', text: 'Awesome description' },
      { type: 'photo', src: '.../awesome-recipe.jpg', alt: 'Awesome recipe' },
      { type: 'comment', text: "It's very good and easy to make!" },
      {
        type: 'video',
        src: '.../awesome-recipe-thumbnail.jpg',
        alt: 'Awesome recipe video',
        url: '.../awesome-recipe.mp4'
      }
    ],
    ingredientGroups: [
      {
        name: 'Main dish',
        ingredients: [
          { name: 'a bit of this' },
          {
            quantity: 1,
            unit: 'spoon',
            name: 'of that',
            media: { type: 'photo', src: '.../that.jpg', alt: 'That' }
          }
        ]
      },
      { name: 'Side dish', ingredients: [{ name: 'and also this' }] }
    ],
    ustensils: [
      { label: 'knife', quantity: 1 },
      { label: 'forks', quantity: 2, media: { type: 'photo', src: '.../fork.jpg', alt: 'Fork' } }
    ],
    servings: 4,
    directionGroups: [
      { directions: [{ content: [{ type: 'text', text: 'Put it all together, et voilà!' }] }] }
    ]
  },
  markdown: `
---
type: appetizer
tags:
  - very
  - good
places:
  - country: France
prep time: 12 minutes
cook time: 24 minutes
complexity: low
cost: high
---

# My awesome recipe

Awesome description

![Awesome recipe](.../awesome-recipe.jpg)

> It's very good and easy to make!

[![Awesome recipe video](.../awesome-recipe-thumbnail.jpg)](.../awesome-recipe.mp4)

---

## Ingredients (4 persons)

### Main dish

- a bit of this
- 1 spoon of that ![That](.../that.jpg)

### Side dish

- and also this

---

## Ustensils

- 1 knife
- ![Fork](.../fork.jpg) 2 forks

---

## Directions

Put it all together, et voilà!
`
}

module.exports = {
  empty,
  minimal,
  medium,
  complete
}
