SELECT *
FROM "events"
WHERE "userId" = $1
ORDER BY "startDate", "startTime"