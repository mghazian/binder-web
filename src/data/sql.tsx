import postgres from 'postgres';

const getPostgreInstance = (() => {
  let instance: postgres.Sql<any> | null = null;

  return function () {
    if ( instance === null ) {
      const { POSTGRES_URL, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
      instance = postgres(POSTGRES_URL!, { ssl: false, user: POSTGRES_USER, pass: POSTGRES_PASSWORD });
    }

    return instance;
  }
})()

export default getPostgreInstance;