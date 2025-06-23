-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 01:35 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sipeka`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `attachment_id` bigint(20) UNSIGNED NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `complaint_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`attachment_id`, `file_path`, `complaint_id`, `created_at`, `updated_at`) VALUES
(3, 'storage/attachments/CzWZWAcn0ZGpTVY0D0nvcKrYdGr7oNvNZBVeubR6.jpg', 3, '2025-06-16 16:20:20', '2025-06-16 16:20:20');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Akademik', '2025-05-22 18:21:50', '2025-06-16 16:42:02'),
(2, 'Fasilitas Kampus', '2025-06-16 16:40:39', '2025-06-16 16:40:39'),
(3, 'Administrasi dan Layanan', '2025-06-16 16:41:33', '2025-06-16 16:41:33'),
(4, 'Etika, Keamanan, Sosial', '2025-06-16 16:41:54', '2025-06-16 16:41:54');

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `complaint_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(45) NOT NULL,
  `status` enum('diproses','ditolak','selesai') NOT NULL DEFAULT 'diproses',
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`complaint_id`, `title`, `description`, `location`, `status`, `user_id`, `category_id`, `created_at`, `updated_at`) VALUES
(3, 'Projector rusak', 'projector di gedung fik kelas 302 rusak', 'gedung FIK kelas 302', 'diproses', 4, 1, '2025-06-16 16:20:20', '2025-06-16 16:20:20'),
(4, 'Projector rusak', 'rusak', 'gedung FIK kelas 302', 'diproses', 4, 2, '2025-06-19 15:58:04', '2025-06-19 15:58:04');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_05_04_180818_create_personal_access_tokens_table', 1),
(5, '2025_05_05_102245_create_categories_table', 1),
(6, '2025_05_05_122109_create_complaints_table', 1),
(7, '2025_05_05_124818_create_attachments_table', 1),
(8, '2025_05_05_141619_create_ratings_table', 1),
(9, '2025_05_05_143925_create_responses_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(3, 'App\\Models\\User', 3, 'myapptoken', '4898e599252fb2002569ebf8756e3a33a482e9338092ac594f758a976e790416', '[\"*\"]', NULL, NULL, '2025-05-22 18:07:09', '2025-05-22 18:07:09'),
(5, 'App\\Models\\User', 3, 'myapptoken', 'ef1713923b9f5466f6e5037464a6c414c639e6a1388cc7b5b7223def0196d0ea', '[\"*\"]', '2025-05-22 18:29:44', NULL, '2025-05-22 18:29:21', '2025-05-22 18:29:44'),
(6, 'App\\Models\\User', 4, 'myapptoken', '82aeaf3f5e88738cb168aa071d96459348959951f3655c922b0159aa9ed81624', '[\"*\"]', NULL, NULL, '2025-06-10 17:38:39', '2025-06-10 17:38:39'),
(7, 'App\\Models\\User', 4, 'myapptoken', '2b2b9d58829a758befaab1e5e1ab2571a23c99bf7744f4ea3a1a50d0678b1bae', '[\"*\"]', '2025-06-10 17:53:58', NULL, '2025-06-10 17:38:50', '2025-06-10 17:53:58'),
(8, 'App\\Models\\User', 4, 'myapptoken', '609b140af02fd13a7035ca0fab14743421e3d4969d6bc021b1ffa94b238a7f72', '[\"*\"]', '2025-06-16 16:38:15', NULL, '2025-06-10 17:59:25', '2025-06-16 16:38:15'),
(9, 'App\\Models\\User', 4, 'myapptoken', 'a5d8322d40050735b15e8fc87c803b6b4aa423369d233eabb783b22d7b178c18', '[\"*\"]', '2025-06-10 19:36:13', NULL, '2025-06-10 19:35:17', '2025-06-10 19:36:13'),
(10, 'App\\Models\\User', 5, 'myapptoken', '23b8a19f0c309893b7d6a673f8427537d55a6a49873bf6aa71bf9eea5d3e5621', '[\"*\"]', NULL, NULL, '2025-06-10 19:38:18', '2025-06-10 19:38:18'),
(11, 'App\\Models\\User', 5, 'myapptoken', '4ab3eeb2c24789d121d95686e10c8cc7f9f31c1b440b5eca6b22f11e425d2331', '[\"*\"]', '2025-06-10 19:38:36', NULL, '2025-06-10 19:38:34', '2025-06-10 19:38:36'),
(12, 'App\\Models\\User', 4, 'myapptoken', '42067c31334af3212a175951b27ca8fba160fa6b1d83944b30974af75bb6bae6', '[\"*\"]', '2025-06-10 20:31:58', NULL, '2025-06-10 20:31:36', '2025-06-10 20:31:58'),
(14, 'App\\Models\\User', 6, 'myapptoken', '2bdfb5b27b7f9decfd6686ab0bc78311bd4c4bad9854db4637f0877be100d18e', '[\"*\"]', NULL, NULL, '2025-06-10 20:34:34', '2025-06-10 20:34:34'),
(15, 'App\\Models\\User', 6, 'myapptoken', 'f2a3f8292c19f23905b08da72c34ea419369252f98182960ba8ea81a09c5db36', '[\"*\"]', '2025-06-10 20:34:46', NULL, '2025-06-10 20:34:44', '2025-06-10 20:34:46'),
(16, 'App\\Models\\User', 1, 'myapptoken', 'aa2e6af4048bd59966b5b0bb2702fddc0c4cc4ca237062ce3de15c342024b241', '[\"*\"]', '2025-06-10 20:35:07', NULL, '2025-06-10 20:35:00', '2025-06-10 20:35:07');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `rating_id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `feedback` text NOT NULL,
  `complaint_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

CREATE TABLE `responses` (
  `response_id` bigint(20) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `complaint_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `role`, `password`, `created_at`, `updated_at`) VALUES
(1, 'raymond', 'raymond@gmail.com', 'admin', '$2y$12$tFCZj7APaF84YYdpm/hN4.nrH2/qVJSDF.1vf2a5BNjHhL9kugf0.', '2025-05-22 17:37:55', '2025-05-22 17:37:55'),
(2, 'charlie', 'charlie@gmail.com', 'admin', '$2y$12$B1xWyAVgT22u7dRC3h2tMOwJB4a1sTzfNTz.rtckS0SZsFBb9CfFu', '2025-05-22 17:51:18', '2025-05-22 17:51:18'),
(3, 'grace', 'grace@gmail.com', 'user', '$2y$12$vdgQyUBbK/8fxkgF.MGfAuZHAEzWH5Kq8Wry6uITavSxIAz75HIKi', '2025-05-22 18:07:09', '2025-05-22 18:07:09'),
(4, 'udin', 'udin@gmail.com', 'user', '$2y$12$XQnq8o3K3gPr.XGX1etDjOnLartEN0P0vCb/twWe5hJCzyPd0Q7Ye', '2025-06-10 17:38:39', '2025-06-10 17:38:39'),
(5, 'john', 'john@gmail.com', 'user', '$2y$12$OVMB2DKvs0d.YZtfjR0TTOevQsfiqG2paoDrncTgsBWc2hSlHZwDm', '2025-06-10 19:38:18', '2025-06-10 19:38:18'),
(6, 'mahes', 'mahes@gmail.com', 'user', '$2y$12$yhjvD4YcHD8rWVHDR0Q8GOIhPQzEkLBLL25GXicEJupeqRUD.ZVHG', '2025-06-10 20:34:34', '2025-06-10 20:34:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`attachment_id`),
  ADD KEY `attachments_complaint_id_foreign` (`complaint_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`complaint_id`),
  ADD KEY `complaints_user_id_foreign` (`user_id`),
  ADD KEY `complaints_category_id_foreign` (`category_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD UNIQUE KEY `ratings_complaint_id_unique` (`complaint_id`);

--
-- Indexes for table `responses`
--
ALTER TABLE `responses`
  ADD PRIMARY KEY (`response_id`),
  ADD UNIQUE KEY `responses_complaint_id_unique` (`complaint_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `attachment_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `complaint_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `rating_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `responses`
--
ALTER TABLE `responses`
  MODIFY `response_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attachments`
--
ALTER TABLE `attachments`
  ADD CONSTRAINT `attachments_complaint_id_foreign` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`complaint_id`) ON DELETE CASCADE;

--
-- Constraints for table `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `complaints_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_complaint_id_foreign` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`complaint_id`) ON DELETE CASCADE;

--
-- Constraints for table `responses`
--
ALTER TABLE `responses`
  ADD CONSTRAINT `responses_complaint_id_foreign` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`complaint_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
