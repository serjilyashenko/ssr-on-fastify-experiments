export function indexRouter(fastify, opts, done) {
  fastify.get("/", async () => {
    return "Fastify + React = 🦐";
  });

  fastify.get("/about", async () => {
    return "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque eligendi quasi unde? Ab fuga iste labore magni modi molestias nemo rem vel vero voluptas. Corporis eum quibusdam totam vel voluptas.";
  });

  done();
}
