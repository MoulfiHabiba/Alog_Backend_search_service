
to create an initial migration :
npx prisma migrate dev --name init
npx prisma db push

After changing in the shema:
npx prisma generate
npx prisma migrate dev --name <migration-name>
npx prisma db push
