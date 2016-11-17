/**
 * Form Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a redux-form component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should the form be called?',
    default: 'NewForm',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantCSS',
    default: false,
    message: 'Does it have styling?',
  }],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../app/containers/{{properCase name}}/index.js',
      templateFile: './form/index.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../app/containers/{{properCase name}}/tests/index.test.js',
      templateFile: './form/test.js.hbs',
      abortOnFail: true,
    }];

    // If they want a CSS file, add styles.css
    if (data.wantCSS) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/styles.css',
        templateFile: './form/styles.css.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
