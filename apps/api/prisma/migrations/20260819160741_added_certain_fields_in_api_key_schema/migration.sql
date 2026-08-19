/*
  Warnings:

  - You are about to drop the column `key` on the `APIKey` table. All the data in the column will be lost.
  - Added the required column `keyHash` to the `APIKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "APIKey" DROP COLUMN "key",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "keyHash" TEXT NOT NULL,
ADD COLUMN     "revokedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "APIKey_projectId_idx" ON "APIKey"("projectId");

-- AddForeignKey
ALTER TABLE "APIKey" ADD CONSTRAINT "APIKey_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
