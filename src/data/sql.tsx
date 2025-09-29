import postgres from 'postgres';

const getPostgreInstance = (() => {
  let instance: postgres.Sql<any> | null = null;

  return function () {
    if ( instance === null ) {
      // TODO: Move values to env or secrets
      instance = postgres('postgresql://localhost:35432/heybinder', { ssl: false, user: 'app', pass: 'app' });
    }

    return instance;
  }
})()

export default getPostgreInstance;