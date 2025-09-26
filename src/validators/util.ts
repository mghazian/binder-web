import z, { ZodError } from "zod";

export function formatZodError(error: ZodError) {
  const errorJson: { [x: string]: string[] } = {};
  error.issues.forEach(v => {
    const key = v.path.join('/');
    
    // Make new array to store the errors
    if ( !errorJson[ key ] ) {
      errorJson[ key ] = [];
      console.log(errorJson, key);
    }

    errorJson[ key ].push(v.message);
  });

  return errorJson;
}