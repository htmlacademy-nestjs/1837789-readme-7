/*
  Warnings:

  - You are about to drop the column `text` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `message` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('Published', 'Draft');

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_post_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "text",
ADD COLUMN     "message" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "annoncement" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "likes" VARCHAR(100)[],
ADD COLUMN     "link_url" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "quoted_autor" TEXT,
ADD COLUMN     "quoted_text" TEXT,
ADD COLUMN     "status" "PostStatus" NOT NULL,
ADD COLUMN     "text" TEXT,
ADD COLUMN     "urlVideo" TEXT;

-- DropTable
DROP TABLE "likes";
