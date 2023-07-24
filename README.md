# LOJIPER CASE

## env

DB erisim bilgilerinin ve authentication icin kullanilacak bir key .env dosyasina eklenmesi gerekmektedir.
`DATABASE_URL`
`NEXTAUTH_SECRET`

## DB

Uygulamada MongoDB ve Prisma ORM kullanilmistir.
Kullanilan datalari iceren dosyalara data dizini icinde erisip, kendi database'inizdeki ilgili collectionlara import etmelisiniz.

## Calistirma

```bash
* clone the project
  git clone https://github.com/osmnfdrcn/bus-ticket-reservation-app.git
* cd bus-ticket-reservation-app/
   npm run build
   npm run start
```

## TechStack

NextJS,
TypeScript,
TailwindCSS
DB : MongoDB
ORM : Prisma
Form Validation : Formik, Yup
Authentication : next-auth
