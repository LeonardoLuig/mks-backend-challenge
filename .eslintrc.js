module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint/eslint-plugin"],
  "root": true,
  "extends": ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "prettier"],
  "env": {
    "node": true,
    "jest": true,
    "es2020": true
  },
  "ignorePatterns": [".eslintrc.js", "dist/"],
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-var": "error",
    "sort-imports": "off",
    "semi": "error",
    "operator-linebreak": "off",
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "@typescript-eslint/typedef": ["error", {
      "memberVariableDeclaration": true,
      "propertyDeclaration": true,
      "variableDeclaration": true,
      "variableDeclarationIgnoreFunction": true,
      "arrowParameter": false
    }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/semi": ["error", "always"]
  },
}