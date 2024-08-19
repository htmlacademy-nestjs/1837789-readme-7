-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "original_author_id" VARCHAR(100),
ADD COLUMN     "original_id" TEXT;
