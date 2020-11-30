---
layout: post
title: Feature toggle configurations with JSONSchema
description: How to validate feature toggle configuration with JSONSchema and a caveat.
date: 2020-11-30 11:10:00
tags:
  - JavaScript
  - JSONSchema
  - Data Validation
category:
  - development
  - Data Validation
---

**Note: I use the package [`validate-value`](https://github.com/thenativeweb/validate-value) for everything related to JSONSchema validation, which uses [`ajv`](https://github.com/ajv-validator/ajv) under the hood. Thus the error messages and caveat mentioned here are based on my experience these packages. They do not necessarily reflect the JSONSchema spec and might not occur with other implementations.**

JSONSchema has the feature [`one-of`](https://json-schema.org/understanding-json-schema/reference/combining.html#oneof), which takes multiple schemas and validates that exactly one of these schemas matches.

JSONSchema also has the feature [`const`](https://json-schema.org/understanding-json-schema/reference/generic.html#constant-values), which takes a single value and validates that the property for which it is set has exactly this value.

These features can be combined for mutually exclusive configurations. For example, if you want a feature toggle, you'll probably want your configuration to *either* be `{ "isEnabled": false }` *or* `{ "isEnabled": true, "someOtherConfig": "foo" }`. The key point being, that if `isEnabled` is `false`, no other properties next to it are allowed.

```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "isEnabled": {
          "type": "boolean",
          "const": false
        }
      },
      "required": [ "isEnabled" ],
      "additionalProperties": false
    },
    {
      "type": "object",
      "properties": {
        "isEnabled": {
          "type": "boolean",
          "const": true
        },
        "someOtherConfig": {
          "type": "string"
        }
      },
      "required": [ "isEnabled", "someOtherConfig" ],
      "additionalProperties": false
    }
  ]
}
```

## Caveat

If the second part of the schema, the one where `isEnabled` is `true` and which contains additional properties, does not match for whatever reason, the error message will be confusing. Say you use the above schema to validate this data:

```json
{
  "isEnabled": true,
  "someOtherConfig": 1337
}
```

Here `someOtherConfig` does not match the specified type `string`. So the second schema in `oneOf` does not match. So JSONSchema tries to match it against the first schema in `oneOf` and the resulting error message is `unexpected additional property "someOtherConfig"`.

## Workaround

This confusing error message is due to the fact that ajv bases its error message on the first schema given in `oneOf`. So put the schema that you want to be validated in detail first!


```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "isEnabled": {
          "type": "boolean",
          "const": true
        },
        "someOtherConfig": {
          "type": "string"
        }
      },
      "required": [ "isEnabled", "someOtherConfig" ],
      "additionalProperties": false
    },
    {
      "type": "object",
      "properties": {
        "isEnabled": {
          "type": "boolean",
          "const": false
        }
      },
      "required": [ "isEnabled" ],
      "additionalProperties": false
    }
  ]
}
```

Now if `isEnabled` is set to `true`, it will go into the first schema in `anyOf` and continue validation from there and thus give detailled error messages. Using this schema to validate the broken data above results in something along the lines of `validation failed; "someOtherConfig" should be string`.
