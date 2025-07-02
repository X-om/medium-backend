/*
  Warnings:

  - You are about to drop the column `backgroundImg` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "backgroundImg";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileImage";
