module.exports = {
    "env": {
        "browser": false,
        "commonjs": true,
        "es6": true,
        "node": true,
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "rules": {
        "indent": [
            "error",
            4
        ],
        'no-console': 'off',
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};