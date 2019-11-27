import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import { IResolvers } from 'graphql-middleware/dist/types';

const resolvers: IResolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      return ctx.db.query.posts({}, info);
    },
    post(parent, args, ctx, info) {
      return ctx.db.query.post({ where: { id: args.id } }, info);
    },
  },
  Mutation: {
    createDraft(parent, { title, content }, ctx, info) {
      return ctx.db.mutation.createPost(
        {
          data: {
            title,
            content,
          },
        },
        info,
      );
    },
    deletePost(parent, { id }, ctx, info) {
      return ctx.db.mutation.deletePost({ where: { id } }, info);
    },
    publish(parent, { id }, ctx, info) {
      return ctx.db.mutation.updatePost(
        {
          where: { id },
          data: { published: true },
        },
        info,
      );
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql', // the generated Prisma DB schema
      endpoint: 'http://localhost:4466', // the endpoint of the Prisma DB service
      // secret: "mysecret123", // specified in database/prisma.yml
      debug: true, // log all GraphQL queries & mutations
    }),
  }),
});

server.start(() => console.log(server, 'Server is running on http://localhost:4000'));
