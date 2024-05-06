// https://eslint.org/docs/latest/use/configure/

module.exports = {
  root: true,
  env: {
    // @TODO: Can be removed, ES versions are cumulative:
    //       https://stackoverflow.com/a/61688878
    // es6: true,
    // This seems to be what Node.js 18, 20 fully supports, but online documentation
    // isn't exactly crystal clear about what should be put here
    es2022: true,
    browser: true,
    node: true,
  },
  // Standard linting for pure javascript files
  parserOptions: {
    // @TODO: Can be removed, as env ES version sets this too:
    //        https://eslint.org/docs/latest/use/configure/language-options#specifying-environments
    // ecmaVersion: 2019,
    // @TODO: Remove because in JS files we use commonjs
    // sourceType: 'module',
  },
  // prettier must always be put last, so it overrides anything before it
  extends: [
    'eslint:recommended',
    // Disables all style rules
    // https://prettier.io/docs/en/integrating-with-linters.html
    // https://github.com/prettier/eslint-config-prettier
    'prettier',
  ],
  rules: {
    // @TODO: Remove this rule, as it's a style rule covered by prettier and
    //       it's deprecated https://eslint.org/docs/latest/rules/comma-dangle
    // 'comma-dangle': 'off',
  },
  overrides: [
    // TypeScript linting for TypeScript files
    {
      files: '*.ts',
      plugins: [
        '@typescript-eslint',
        // TSDoc is only meant for TS files https://tsdoc.org/
        'eslint-plugin-tsdoc',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: 'tsconfig.eslint.json' },
      // prettier must always be put last, so it overrides anything before it
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'prettier',
      ],
      rules: {
        // @TODO: Remove as it doesn't seem to cause issues anymore with fn overloads
        // 'no-dupe-class-members': 'off', // Off due to conflict with typescript overload functions
        'tsdoc/syntax': 'error',
        // new TS rules begin @TODO: Remove these and adapt code
        '@typescript-eslint/prefer-as-const': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        // new TS rules end
        '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
        // @TODO: Remove, as it's already off
        // '@typescript-eslint/return-await': 'off',
        // @TODO: Remove this rule, deprecated:
        //       https://typescript-eslint.io/rules/space-before-function-paren/
        // '@typescript-eslint/space-before-function-paren': 0,
        // @TODO: Should be careful with this rule, should leave it be and disable
        //       it within files where necessary with explanations
        '@typescript-eslint/no-explicit-any': 'off',
        // @TODO: Remove, as it's already off
        // '@typescript-eslint/explicit-function-return-type': 'off',
        // @TODO: Remove, as it's already off
        // '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          // argsIgnorePattern: https://eslint.org/docs/latest/rules/no-unused-vars#argsignorepattern
          // varsIgnorePattern: https://eslint.org/docs/latest/rules/no-unused-vars#varsignorepattern
          { args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        // @TODO: Remove this rule, as it's a style rule covered by prettier
        // '@typescript-eslint/member-delimiter-style': [
        //   'error',
        //   {
        //     multiline: {
        //       delimiter: 'none', // 'none' or 'semi' or 'comma'
        //       requireLast: true,
        //     },
        //     singleline: {
        //       delimiter: 'semi', // 'semi' or 'comma'
        //       requireLast: false,
        //     },
        //   },
        // ],
        // @TODO: Not recommended to disable rule, should instead disable locally
        //       with explanation
        '@typescript-eslint/ban-ts-ignore': 'off',
      },
    },
    // Jest linting for test files
    {
      files: 'tests/*.ts',
      plugins: ['jest'],
      env: {
        // @TODO: Jasmine is not meant to be used in Jest tests,
        //       there's even a rule for it in plugin:jest/recommended
        jasmine: true,
        jest: true,
        'jest/globals': true,
      },
      // prettier must always be put last, so it overrides anything before it
      extends: ['plugin:jest/recommended', 'prettier'],
      // @TODO: Remove these rules and adapt code!
      rules: {
        'jest/no-disabled-tests': 'off',
        'jest/expect-expect': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/valid-title': 'off',
        'jest/no-jasmine-globals': 'off',
        'jest/valid-expect-in-promise': 'off',
        'jest/valid-expect': 'off',
        'jest/no-alias-methods': 'off',
      },
    },
  ],
}
