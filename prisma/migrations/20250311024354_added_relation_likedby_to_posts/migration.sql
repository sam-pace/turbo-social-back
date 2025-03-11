-- CreateTable
CREATE TABLE "_PostLikedBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostLikedBy_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PostLikedBy_B_index" ON "_PostLikedBy"("B");

-- AddForeignKey
ALTER TABLE "_PostLikedBy" ADD CONSTRAINT "_PostLikedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostLikedBy" ADD CONSTRAINT "_PostLikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
