import { PrismaClient } from '@prisma/client';

const mockUsersId = [
  '65a3f63cc013e4c03afc6a9d',
  '65a3f64beb0cae3804f7d9ef',
  '65a3f657fb04b4c2846e9094',
  '65a3f65f2c1c3209873906fb',
  '65a3f66ac7d55ebb0a1b9b65'
];

const mockPostId = [
  '6d308040-06a2-4162-bea6-2398e9976540',
  '6d308040-06a2-4162-bea6-2398e9976541',
  '6d308040-06a2-4162-bea6-2398e9976542',
  '6d308040-06a2-4162-bea6-2398e9976543',
  '6d308040-06a2-4162-bea6-2398e9976544'
];

enum UserId {
  First = '658170cbb974e9f5b946pcf4',
  Second = '6841762309c030b503e37622',
}

enum PostType {
  Video = 'Video',
  Text = 'Text',
  Quotation = 'Quotation',
  Photo = 'Photo',
  Link = 'Link'
}

enum PostStatus {
  Published = 'Published',
  Draft = 'Draft'
}

function randomInt (a = 1, b = 0) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1))
};

function getRandomElement <T>(list: T[]): T {
  const randomindex = randomInt(0, list.length - 1);
  return list[randomindex];
};

const mockComments = [
  {
    message: 'Первый комментарий',
    userId: getRandomElement(mockUsersId),
  },
  {
    message: 'Еще один новый комментарий',
    userId: getRandomElement(mockUsersId),
  },
  {
    message: 'Не придумал лучший комментарий, поэтому оставлю просто этот текст',
    userId: getRandomElement(mockUsersId),
  },
  {
    message: 'Здесь могла быть ваша реклама',
    userId: getRandomElement(mockUsersId)
  },
  {
    message: 'Лучший пост',
    userId: getRandomElement(mockUsersId)
  },
];

const mockPosts = mockPostId.map((id) => {
  const type = getRandomElement(Object.values(PostType));
  const randomNumber = randomInt(0, mockComments.length);
  const userId = getRandomElement(mockUsersId);
  return {
      id: id,
      type,
      status: PostStatus.Published,
      userId: userId,
      title: 'First Post',
      createdAt: new Date(),
      updatedAt: new Date(),
      isRepost: false,
      tags: ['#aggd', '#oooo'],
      likes: [ UserId.First , UserId.Second],
      comments: mockComments.slice(0, randomNumber),

      name: (type === PostType.Video || type === PostType.Text) ? 'Post' : undefined,
      urlVideo: type === PostType.Video ? 'http://sample.edu/hobbies.html' : undefined,
      annoncement: type === PostType.Text ? 'Another text' : undefined,
      text: type === PostType.Text ? 'Simple text' : undefined,
      authorQuotation: type === PostType.Quotation ? 'Kbpf' : undefined,
      textQuotation: type === PostType.Quotation ? 'Quote text example' : undefined,
      photo: type === PostType.Photo ? 'https://pics4.city-data.com/cpicc/cfiles34653.jpg' : undefined,
      urlLink: type === PostType.Link ? 'http://www.sample.com/?education=orange&reaction=detail' : undefined,
      description: type === PostType.Link ? 'Another link' : undefined,
  }
})
async function seedDb(prismaClient: PrismaClient) {
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        type: post.type,
        status: post.status,
        userId: post.userId,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        tags: post.tags,
        isRepost: post.isRepost,
        likes: post.likes,
        comments: post.comments ? {
          create: post.comments
        } : undefined,
        name: post.name,
        urlVideo: post.urlVideo,
        annoncement: post.annoncement,
        text: post.text,
        authorQuotation: post.authorQuotation,
        textQuotation: post.textQuotation,
        photo: post.photo,
        urlLink: post.urlLink,
        description: post.description,
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
