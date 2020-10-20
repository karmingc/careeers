module.exports = {
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    plugins: ['@typescript-eslint'],
    env: {
        es6: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: ['./packages/*/tsconfig.json']
    }
};
