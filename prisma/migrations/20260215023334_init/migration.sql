-- CreateTable
CREATE TABLE "Reccomendation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "review" TEXT NOT NULL,

    CONSTRAINT "Reccomendation_pkey" PRIMARY KEY ("id")
);
