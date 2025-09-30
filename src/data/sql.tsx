import postgres from 'postgres';

const processUseSsl = (useSsl: string | undefined) => {
  useSsl = useSsl?.toLowerCase();

  switch ( useSsl ) {
    case "true": return true;
    case "false": return false;
    case "require": return "require";
    case "prefer": return "prefer";
    case "allow": return "allow";
    case "verify-full": return "verify-full";
    default: return undefined;
  }
}

const getPostgreInstance = (() => {
  let instance: postgres.Sql<any> | null = null;

  return function () {
    if ( instance === null ) {
      const { POSTGRES_URL, POSTGRES_USER, POSTGRES_PASSWORD, USE_SSL } = process.env;

      instance = postgres(POSTGRES_URL!, { ssl: processUseSsl(USE_SSL), user: POSTGRES_USER, pass: POSTGRES_PASSWORD });
    }

    return instance;
  }
})()

export default getPostgreInstance;