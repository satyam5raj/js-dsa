const schema = {
  name: 'string',
  age: 'number',
  deviceCount: 'number'
};

const data = {
  name: 'Random',
  age: 'abcd',         // ❌ should be number
  deviceCount: 5,
  extraKey: true       // ❌ not allowed
};

function validateJSON(input, schema) {
  const errors = [];
  const inputKeys = Object.keys(input);
  const schemaKeys = Object.keys(schema);

  // 1. Check for extra keys
  for (const key of inputKeys) {
    if (!schemaKeys.includes(key)) {
      errors.push(`❌ Extra key found: ${key}`);
    }
  }

  // 2. Check for missing keys and type mismatches
  for (const key of schemaKeys) {
    if (!(key in input)) {
      errors.push(`❌ Missing key: ${key}`);
    } else {
      const expectedType = schema[key];
      const actualType = typeof input[key];
      if (actualType !== expectedType) {
        errors.push(`❌ Type mismatch for key '${key}': expected ${expectedType}, got ${actualType}`);
      }
    }
  }

  // Final result
  return errors.length === 0 ? "✅ JSON is valid!" : errors;
}


const result = validateJSON(data, schema);
console.log(result);
