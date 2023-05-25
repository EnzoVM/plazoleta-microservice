import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

prisma.$connect()
.then(() => console.log('MySQL was connected successfully'))
.catch((error: any) => console.log('Error for prisma conection', error))

export default prisma