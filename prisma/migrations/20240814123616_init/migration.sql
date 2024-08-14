-- CreateTable
CREATE TABLE "PublicMessage" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "encryptedMessage" TEXT NOT NULL,
    "availableAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateKey" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "availableAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrivateKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicMessage_slug_key" ON "PublicMessage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PrivateKey_slug_key" ON "PrivateKey"("slug");
