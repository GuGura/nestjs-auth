-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('LOCAL', 'OAUTH');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'APPLE', 'EMAIL', 'NAVER', 'KAKAO');

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "AuthType" NOT NULL DEFAULT 'LOCAL',
    "provider" "Provider" NOT NULL DEFAULT 'EMAIL',
    "providerAccountId" TEXT DEFAULT '',
    "expiredAt" TIMESTAMP(3),
    "password" TEXT DEFAULT '',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccessTokens" (
    "index" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "refresh" TEXT NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAccessTokens_pkey" PRIMARY KEY ("index")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccessTokens_userId_platform_key" ON "UserAccessTokens"("userId", "platform");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccessTokens" ADD CONSTRAINT "UserAccessTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
