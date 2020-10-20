// https://medium.com/@brygrill/create-react-app-with-typescript-eslint-prettier-and-github-actions-f3ce6a571c97
module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    plugins: ['react', '@typescript-eslint', 'jest'],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: ['./packages/web/tsconfig.json'],
    },
    rules: {
        "react/prop-types": "off",
        'linebreak-style': 'off',
        "quotes": ["error", "single", { "avoidEscape": true }],

        "import/order": ["error", { "groups": ["builtin", "external", "parent", "sibling", "index"] }],
        "import/order": ["error", { "alphabetize": { "order": "asc", "caseInsensitive": true } }],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
    // https://stackoverflow.com/questions/41769880/how-to-manually-add-a-path-to-be-resolved-in-eslintrc
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['./src']
            }
        }
    },

};