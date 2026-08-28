-- CreateEnum
CREATE TYPE "TraceStatus" AS ENUM ('SUCCESS', 'ERROR');

-- CreateTable
CREATE TABLE "Trace" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "apiKeyId" TEXT,
    "traceId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "status" "TraceStatus" NOT NULL DEFAULT 'SUCCESS',
    "latencyMs" INTEGER,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "totalTokens" INTEGER,
    "inputCost" DECIMAL(12,8),
    "outputCost" DECIMAL(12,8),
    "totalCost" DECIMAL(12,8),
    "input" JSONB,
    "output" JSONB,
    "errorType" TEXT,
    "errorMessage" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Trace_projectId_createdAt_idx" ON "Trace"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "Trace_projectId_traceId_idx" ON "Trace"("projectId", "traceId");

-- CreateIndex
CREATE INDEX "Trace_apiKeyId_idx" ON "Trace"("apiKeyId");

-- CreateIndex
CREATE INDEX "Trace_status_idx" ON "Trace"("status");

-- AddForeignKey
ALTER TABLE "Trace" ADD CONSTRAINT "Trace_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trace" ADD CONSTRAINT "Trace_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "APIKey"("id") ON DELETE SET NULL ON UPDATE CASCADE;
