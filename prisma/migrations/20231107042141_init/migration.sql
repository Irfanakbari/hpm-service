-- CreateTable
CREATE TABLE `history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_part` VARCHAR(100) NOT NULL,
    `timestamp` DATE NOT NULL,
    `barcode_pcc` VARCHAR(255) NOT NULL,
    `status` VARCHAR(100) NULL,
    `operator` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `kode` VARCHAR(255) NOT NULL,
    `part_no` VARCHAR(255) NOT NULL,
    `part_name` VARCHAR(255) NULL,
    `part_color` VARCHAR(100) NULL,
    `qty` INTEGER NOT NULL,
    `to1` VARCHAR(50) NULL,
    `to2` VARCHAR(50) NULL,
    `date_local` VARCHAR(100) NULL,
    `time_local` VARCHAR(100) NULL,
    `date_export` VARCHAR(100) NULL,
    `time_export` VARCHAR(100) NULL,
    `weekly` VARCHAR(100) NULL,
    `type_part` VARCHAR(100) NULL,
    `seq_no` VARCHAR(255) NULL,
    `kd_lot_no` VARCHAR(255) NULL,
    `date` VARCHAR(100) NULL,
    `time` TIME(0) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`kode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
