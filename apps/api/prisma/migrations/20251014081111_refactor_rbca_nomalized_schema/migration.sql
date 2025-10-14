/*
  Warnings:

  - You are about to drop the column `price` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `inventory` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `inventory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,3)`.
  - You are about to alter the column `minStock` on the `inventory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(10,3)`.
  - You are about to drop the column `ewallet` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paymentNumber]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bookingNumber]` on the table `table_bookings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[qrCode]` on the table `tables` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costPrice` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `menu_inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuName` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - The required column `paymentNumber` was added to the `payments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `bookingNumber` was added to the `table_bookings` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `bookingTime` to the `table_bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `table_bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `table_bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `table_bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."menu_inventory" DROP CONSTRAINT "menu_inventory_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."menus" DROP CONSTRAINT "menus_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."table_bookings" DROP CONSTRAINT "table_bookings_tableId_fkey";

-- DropForeignKey
ALTER TABLE "public"."table_bookings" DROP CONSTRAINT "table_bookings_userId_fkey";

-- DropIndex
DROP INDEX "public"."users_role_idx";

-- AlterTable
ALTER TABLE "public"."inventory" DROP COLUMN "price",
DROP COLUMN "supplier",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "costPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "supplierId" TEXT,
ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(10,3),
ALTER COLUMN "minStock" SET DATA TYPE DECIMAL(10,3);

-- AlterTable
ALTER TABLE "public"."menu_inventory" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."notifications" ADD COLUMN     "actionUrl" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."order_items" ADD COLUMN     "menuName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "cancelReason" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "customerPhone" TEXT,
ADD COLUMN     "discountRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
ADD COLUMN     "orderType" TEXT NOT NULL DEFAULT 'DINE_IN',
ADD COLUMN     "serviceCharge" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "taxRate" DECIMAL(5,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "ewallet",
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "cardType" TEXT,
ADD COLUMN     "changeAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "ewalletProvider" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "paidAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "paymentNumber" TEXT NOT NULL,
ADD COLUMN     "referenceNumber" TEXT;

-- AlterTable
ALTER TABLE "public"."table_bookings" ADD COLUMN     "bookingNumber" TEXT NOT NULL,
ADD COLUMN     "bookingTime" TEXT NOT NULL,
ADD COLUMN     "cancelReason" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "customerEmail" TEXT,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."tables" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "role";

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_roles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."suppliers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stock_history" (
    "id" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" DECIMAL(10,3) NOT NULL,
    "beforeQty" DECIMAL(10,3) NOT NULL,
    "afterQty" DECIMAL(10,3) NOT NULL,
    "reference" TEXT,
    "notes" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."system_config" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'STRING',
    "category" TEXT NOT NULL DEFAULT 'GENERAL',
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "public"."roles"("name");

-- CreateIndex
CREATE INDEX "user_roles_userId_idx" ON "public"."user_roles"("userId");

-- CreateIndex
CREATE INDEX "user_roles_roleId_idx" ON "public"."user_roles"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_userId_roleId_key" ON "public"."user_roles"("userId", "roleId");

-- CreateIndex
CREATE INDEX "suppliers_name_idx" ON "public"."suppliers"("name");

-- CreateIndex
CREATE INDEX "suppliers_isActive_idx" ON "public"."suppliers"("isActive");

-- CreateIndex
CREATE INDEX "stock_history_inventoryId_idx" ON "public"."stock_history"("inventoryId");

-- CreateIndex
CREATE INDEX "stock_history_type_idx" ON "public"."stock_history"("type");

-- CreateIndex
CREATE INDEX "stock_history_createdAt_idx" ON "public"."stock_history"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "system_config_key_key" ON "public"."system_config"("key");

-- CreateIndex
CREATE INDEX "system_config_key_idx" ON "public"."system_config"("key");

-- CreateIndex
CREATE INDEX "system_config_category_idx" ON "public"."system_config"("category");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "public"."categories"("name");

-- CreateIndex
CREATE INDEX "categories_isActive_idx" ON "public"."categories"("isActive");

-- CreateIndex
CREATE INDEX "categories_sortOrder_idx" ON "public"."categories"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_code_key" ON "public"."inventory"("code");

-- CreateIndex
CREATE INDEX "inventory_code_idx" ON "public"."inventory"("code");

-- CreateIndex
CREATE INDEX "inventory_supplierId_idx" ON "public"."inventory"("supplierId");

-- CreateIndex
CREATE INDEX "menus_name_idx" ON "public"."menus"("name");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "public"."notifications"("type");

-- CreateIndex
CREATE INDEX "orders_orderType_idx" ON "public"."orders"("orderType");

-- CreateIndex
CREATE INDEX "orders_orderNumber_idx" ON "public"."orders"("orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "payments_paymentNumber_key" ON "public"."payments"("paymentNumber");

-- CreateIndex
CREATE INDEX "payments_paymentMethod_idx" ON "public"."payments"("paymentMethod");

-- CreateIndex
CREATE INDEX "payments_paymentNumber_idx" ON "public"."payments"("paymentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "table_bookings_bookingNumber_key" ON "public"."table_bookings"("bookingNumber");

-- CreateIndex
CREATE INDEX "table_bookings_bookingNumber_idx" ON "public"."table_bookings"("bookingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "tables_qrCode_key" ON "public"."tables"("qrCode");

-- CreateIndex
CREATE INDEX "tables_isActive_idx" ON "public"."tables"("isActive");

-- CreateIndex
CREATE INDEX "tables_tableNumber_idx" ON "public"."tables"("tableNumber");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "public"."users"("username");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "public"."users"("isActive");

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."menus" ADD CONSTRAINT "menus_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."menu_inventory" ADD CONSTRAINT "menu_inventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "public"."inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_history" ADD CONSTRAINT "stock_history_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "public"."inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."table_bookings" ADD CONSTRAINT "table_bookings_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "public"."tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."table_bookings" ADD CONSTRAINT "table_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
