import { createServer } from '@graphql-yoga/common';

import { getBuiltMesh } from '../.mesh';

const worker = {
  async fetch(req: Request) {
    // retrieve the mesh instance (with configured Envelop plugins)
    console.log("getting mesh")
    const mesh = await getBuiltMesh();
    console.log("retrieved mesh");
    // pass the Mesh instance to Yoga and configure GraphiQL
    const yoga = createServer({
      logging: {
        debug: console.log,
        error: console.log,
        info: console.log,
        warn: console.log,
      },
      plugins: mesh.plugins, 
      graphiql: {
        endpoint: '/graphql',
        title: 'Mesh Gateway',
      },
    });
    console.log("executing fetch")
    const result = await yoga.fetch(req);
    console.log("fetch result", JSON.stringify(result))
    return result
  },
};

export default worker;
