/*
  Warnings:

  - A unique constraint covering the columns `[projectId,traceId]` on the table `Trace` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Trace_projectId_traceId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Trace_projectId_traceId_key" ON "Trace"("projectId", "traceId");
