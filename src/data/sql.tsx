import postgres from 'postgres';

const getPostgreInstance = (() => {
  let instance: postgres.Sql<{}> | null = null;

  return function () {
    if ( instance === null ) {
      // TODO: Move values to env or secrets
      instance = postgres('postgresql://localhost:35432/heybinder', { ssl: false, user: 'app', pass: 'app' });
    }

    instance`select * from black`;

    return instance;
  }
})()

export default getPostgreInstance;