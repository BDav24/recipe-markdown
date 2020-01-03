const empty = {
  markdown: '',
  recipe: {}
}

const minimal = {
  markdown: `
# My awesome recipe

## Directions

Put it all together, et voilà!
`,
  recipe: {
    title: 'My awesome recipe',
    directionGroups: [
      { directions: [{ content: [{ type: 'text', text: 'Put it all together, et voilà!' }] }] }
    ]
  }
}

const medium = {
  markdown: `
# My awesome recipe

## Ingredients

- a bit of this
- 1 spoon of that

---

## Directions

### Step 1

Put it all together, et voilà!

### Step 2

Put it in the oven.
`,
  recipe: {
    title: 'My awesome recipe',
    directionGroups: [
      {
        directions: [
          { step: 'Step 1', content: [{ type: 'text', text: 'Put it all together, et voilà!' }] },
          { step: 'Step 2', content: [{ type: 'text', text: 'Put it in the oven.' }] }
        ]
      }
    ],
    ingredientGroups: [
      {
        ingredients: [{ name: 'a bit of this' }, { quantity: 1, unit: 'spoon', name: 'of that' }]
      }
    ]
  }
}

const complete = {
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

![Awesome recipe](.../awesome-recipe.jpg)

Awesome description

> It's very good and easy to make!

[![Awesome recipe video](.../awesome-recipe-thumbnail.jpg)](.../awesome-recipe.mp4)

---

## Ingredients (4 persons)

### Main dish

- a bit of this
- 1 spoon of that ![That](.../that.jpg)

### Side dish

- 2 chunks
- and also this

---

## Ustensils

- 1 spoon
- 2 [knifes](.../knife)
- ![Fork](.../fork.jpg) 3 forks
- [![Awesome cooker video](.../cooker.jpg)](.../awesome-cooker.mp4) cooker

---

## Directions

### Main dish

#### Step 1

Put it all together, et voilà!

#### Step 2

Put it in the oven.

### Side dish

Same same.
`,
  recipe: {
    meta: {
      type: 'appetizer',
      tags: ['very', 'good'],
      places: [{ type: 'country', label: 'France' }],
      prepTime: '12 minutes',
      cookTime: '24 minutes',
      complexity: 'low',
      cost: 'high'
    },
    title: 'My awesome recipe',
    media: { type: 'photo', src: '.../awesome-recipe.jpg', alt: 'Awesome recipe' },
    description: [
      { type: 'photo', src: '.../awesome-recipe.jpg', alt: 'Awesome recipe' },
      { type: 'br' },
      { type: 'text', text: 'Awesome description' },
      { type: 'br' },
      { type: 'comment', text: "It's very good and easy to make!" },
      { type: 'br' },
      {
        type: 'video',
        url: '.../awesome-recipe.mp4',
        src: '.../awesome-recipe-thumbnail.jpg',
        alt: 'Awesome recipe video'
      },
      { type: 'br' },
      { type: 'hr' }
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
      {
        name: 'Side dish',
        ingredients: [{ quantity: 2, name: 'chunks' }, { name: 'and also this' }]
      }
    ],
    servings: 4,
    ustensils: [
      { label: 'spoon', quantity: 1 },
      { quantity: 2, media: { type: 'link', url: '.../knife', alt: 'knifes' } },
      { label: 'forks', quantity: 3, media: { type: 'photo', src: '.../fork.jpg', alt: 'Fork' } },
      {
        label: 'cooker',
        media: {
          type: 'video',
          url: '.../awesome-cooker.mp4',
          src: '.../cooker.jpg',
          alt: 'Awesome cooker video'
        }
      }
    ],
    directionGroups: [
      {
        name: 'Main dish',
        directions: [
          { step: 'Step 1', content: [{ type: 'text', text: 'Put it all together, et voilà!' }] },
          { step: 'Step 2', content: [{ type: 'text', text: 'Put it in the oven.' }] }
        ]
      },
      { name: 'Side dish', directions: [{ content: [{ type: 'text', text: 'Same same.' }] }] }
    ]
  }
}

module.exports = {
  empty,
  minimal,
  medium,
  complete
}
