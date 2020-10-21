UPDATE "events"
SET "title" = $3,
  "description" = $4,
  "startDate" = $5,
  "startTime" = $6,
  "endDate" = $7,
  "endTime" = $8
WHERE "id" = $1 AND "userId" = $2;

SELECT "id", "title", "description", "startDate", "startTime", "endDate", "endTime"
FROM "events"
WHERE "id" = $1 AND "userId" = $2;
