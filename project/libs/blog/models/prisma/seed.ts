import { PrismaClient } from '@prisma/client';
import { Types } from 'mongoose';

enum PostUuid {
  First = '6d308040-06a2-4162-bea6-2398e9976540',
  Second = '6g308045-98a2-4162-iea6-2338e9906540',
  Third = '6i308045-98a2-4162-kea6-2338e9907540'
}

enum UserId {
  First = '658170cbb974e9f5b946pcf4',
  Second = '6841762309c030b503e37622',
  Third = '658170cbb954e9f5b905ccf4'
}

function getPosts() {
  return [
    {
      id: PostUuid.First,
      type: 'text',
      title: 'Луна ночью',
      tags: ['#aggd', '#oooo'],
      userId: UserId.First,
      isRepost: false,
    },
    {
      id: PostUuid.Second,
      type: 'quotation',
      text: '«Невозможно решить проблему на том же уровне, на котором она возникла. Нужно стать выше этой проблемы, поднявшись на следующий уровень».',
      author: 'Альберт Эйнштейн',
      tags: ['#affd', '#ordfd'],
      userId: UserId.Second,
      isRepost: false,
      comments: [
        {
          text: 'Это действительно отличная цитата!',
          userId: UserId.Second,
        }
      ],
      likes: [
        { userId: new Types.ObjectId().toString() },
        { userId: new Types.ObjectId().toString() },
      ],
    }
  ]
}


async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();

  await Promise.all(
    mockPosts.map(post => prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: post
    }))
  );
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
