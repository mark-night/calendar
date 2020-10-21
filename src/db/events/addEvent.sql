INSERT INTO "events"
( "userId", "title", "description", "startDate", "startTime", "endDate", "endTime" )
VALUES ($1, $2, $3, $4, $5, $6, $7);

SELECT SCOPE_IDENTITY() AS id;