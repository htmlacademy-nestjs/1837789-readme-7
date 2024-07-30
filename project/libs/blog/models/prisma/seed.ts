import { PrismaClient } from '@prisma/client';

enum PostUuid {
  First = '6d308040-06a2-4162-bea6-2398e9976540',
  Second = '6g308045-98a2-4162-iea6-2338e9906540',
}

enum UserId {
  First = '658170cbb974e9f5b946pcf4',
  Second = '6841762309c030b503e37622',
}

export enum PostType {
  Video = 'Video',
  Text = 'Text',
  Quotation = 'Quotation',
  Photo = 'Photo',
  Link = 'Link'
}

function getPosts() {
  return [
    {
      id: PostUuid.First,
      type: PostType.Text,
      userId: UserId.First,
      title: 'First Post',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['#aggd', '#oooo'],
      isRepost: false,
    },
    {
      id: PostUuid.Second,
      type: PostType.Quotation,
      userId: UserId.Second,
      title: 'First Post',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['#aggd', '#oooo'],
      isRepost: false,
      comments: [
        {
          text: 'Это действительно отличная книга!',
          userId: UserId.First,
        },
        {
          text: 'Надо будет обязательно перечитать. Слишком много информации.',
          userId: UserId.Second,
        }
      ],
      likes: [
        { userId: UserId.First },
        { userId: UserId.Second },
      ],
    }
  ]
}


async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();

  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        type: post.type,
        userId: post.userId,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        tags: post.tags,
        isRepost: post.isRepost,
        comments: post.comments ? {
          create: post.comments
        } : undefined,
         likes: post.likes ? {
           create: post.likes
         } : undefined,
      }
    })
  }
  console.info('🤘️ Database was filled');
}


async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
