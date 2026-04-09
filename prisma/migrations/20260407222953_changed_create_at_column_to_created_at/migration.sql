/*
  Warnings:

  - You are about to drop the column `createAt` on the `ShortUrl` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE ShortUrl
DROP CONSTRAINT ShortUrl_createAt_df;
ALTER TABLE [dbo].[ShortUrl] DROP COLUMN [createAt];
ALTER TABLE [dbo].[ShortUrl] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [ShortUrl_createdAt_df] DEFAULT CURRENT_TIMESTAMP;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
