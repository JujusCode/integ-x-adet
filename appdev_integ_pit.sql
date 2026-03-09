-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2026 at 02:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appdev_integ_pit`
--

-- --------------------------------------------------------

--
-- Table structure for table `adetxinteg_cartitem`
--

CREATE TABLE `adetxinteg_cartitem` (
  `id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `added_at` datetime(6) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `adetxinteg_order`
--

CREATE TABLE `adetxinteg_order` (
  `id` bigint(20) NOT NULL,
  `order_date` datetime(6) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `shipping_address` longtext NOT NULL,
  `status` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `adetxinteg_order`
--

INSERT INTO `adetxinteg_order` (`id`, `order_date`, `total_amount`, `shipping_address`, `status`, `user_id`) VALUES
(1, '2026-03-09 13:23:04.934162', 70000.00, 'test1, test1, 1', 'Processing', 3);

-- --------------------------------------------------------

--
-- Table structure for table `adetxinteg_orderitem`
--

CREATE TABLE `adetxinteg_orderitem` (
  `id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_at_purchase` decimal(10,2) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `adetxinteg_orderitem`
--

INSERT INTO `adetxinteg_orderitem` (`id`, `quantity`, `price_at_purchase`, `order_id`, `product_id`) VALUES
(1, 1, 70000.00, 1, 9);

-- --------------------------------------------------------

--
-- Table structure for table `adetxinteg_product`
--

CREATE TABLE `adetxinteg_product` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `specs` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `adetxinteg_product`
--

INSERT INTO `adetxinteg_product` (`id`, `name`, `description`, `specs`, `price`, `stock`, `created_at`, `image`, `status`) VALUES
(3, 'Iphone 15 Pro max', 'A powerful 2023 iPhone flagship known for its lightweight titanium design, great camera zoom, and very strong gaming performance.', '256 GB', 30000.00, 0, '2026-03-08 13:21:40.904035', 'products/ip_15_pm.jpg', 'Low Stock'),
(5, 'Iphone 13', 'The iPhone 13 is an older flagship (2021) but still very reliable. It offers smooth performance, good cameras, and long software support at a much lower price than newer iPhones.', '256 GB', 27000.00, 0, '2026-03-09 12:32:54.960205', 'products/iphone_13.avif', 'In Stock'),
(6, 'Iphone 17 Pro Max', 'The iPhone 17 Pro Max is Apple’s newest flagship, expected to improve AI features, camera zoom, and battery life compared to the iPhone 16 Pro Max.', '256 GB, 120Hz', 89000.00, 0, '2026-03-09 12:33:34.752325', 'products/17_pmax.jpg', 'In Stock'),
(7, 'Iphone 16', 'The iPhone 16 Pro Max is Apple’s 2024 flagship, known for its strong performance, video quality, and ecosystem integration with Mac, iPad, and Apple Watch.', '1TB', 77000.00, 0, '2026-03-09 12:33:58.989052', 'products/iphone_16.jpg', 'In Stock'),
(8, 'Samsung Galaxy S26 Ultra', 'The S26 Ultra is Samsung’s latest flagship phone with a massive AMOLED display, powerful Snapdragon chip, and a 200MP camera system designed for professional photography and video. It also includes the S-Pen and advanced Galaxy AI tools for productivity and editing.', '512GB', 100990.00, 0, '2026-03-09 12:34:26.585457', 'products/s26_ultra.avif', 'In Stock'),
(9, 'Samsung Galaxy S25 Ultra', 'The S25 Ultra is the previous-generation Samsung flagship, still extremely powerful with a 200MP camera and built-in S-Pen. It offers almost flagship-level performance for a lower price than the S26 Ultra.', '256GB', 70000.00, 0, '2026-03-09 12:34:58.778426', 'products/s25_ultra.webp', 'Low Stock');

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add product', 7, 'add_product'),
(26, 'Can change product', 7, 'change_product'),
(27, 'Can delete product', 7, 'delete_product'),
(28, 'Can view product', 7, 'view_product'),
(29, 'Can add order', 8, 'add_order'),
(30, 'Can change order', 8, 'change_order'),
(31, 'Can delete order', 8, 'delete_order'),
(32, 'Can view order', 8, 'view_order'),
(33, 'Can add order item', 9, 'add_orderitem'),
(34, 'Can change order item', 9, 'change_orderitem'),
(35, 'Can delete order item', 9, 'delete_orderitem'),
(36, 'Can view order item', 9, 'view_orderitem'),
(37, 'Can add cart item', 10, 'add_cartitem'),
(38, 'Can change cart item', 10, 'change_cartitem'),
(39, 'Can delete cart item', 10, 'delete_cartitem'),
(40, 'Can view cart item', 10, 'view_cartitem');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$9cdp9SJn8HvML95qJVS6Ps$RkZI1KI8d3WVr8VKNS9odT7h3c7w9OK/WwXmMnRjYmI=', NULL, 1, 'admin', '', '', 'admin@gmail.com', 1, 1, '2026-03-08 09:29:12.193685'),
(2, 'pbkdf2_sha256$600000$4fqD6wqTAs6qk3DCnGfDDJ$1ZHfTrkMsGDIpK7K0TlVotVOH+1IVkn7MgqLM73eF9o=', NULL, 1, 'admin@gmail.com', '', '', 'admin@gmail.com', 1, 1, '2026-03-08 09:49:02.736970'),
(3, 'pbkdf2_sha256$600000$u0u5LV6APJlU4yhwyg3KUE$YkUFcew+jEFXR6/D9iz463L/ldBCE/mK0vq//AKzzk8=', NULL, 0, 'j1@gmail.com', 'Justine Jude Bardinas', '', 'j1@gmail.com', 0, 1, '2026-03-08 14:02:21.401686');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(10, 'adetxinteg', 'cartitem'),
(8, 'adetxinteg', 'order'),
(9, 'adetxinteg', 'orderitem'),
(7, 'adetxinteg', 'product'),
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'adetxinteg', '0001_initial', '2026-03-08 07:37:31.011256'),
(2, 'contenttypes', '0001_initial', '2026-03-08 07:37:31.098452'),
(3, 'auth', '0001_initial', '2026-03-08 07:37:31.941016'),
(4, 'admin', '0001_initial', '2026-03-08 07:37:32.122668'),
(5, 'admin', '0002_logentry_remove_auto_add', '2026-03-08 07:37:32.138238'),
(6, 'admin', '0003_logentry_add_action_flag_choices', '2026-03-08 07:37:32.162067'),
(7, 'contenttypes', '0002_remove_content_type_name', '2026-03-08 07:37:32.259125'),
(8, 'auth', '0002_alter_permission_name_max_length', '2026-03-08 07:37:32.338840'),
(9, 'auth', '0003_alter_user_email_max_length', '2026-03-08 07:37:32.399931'),
(10, 'auth', '0004_alter_user_username_opts', '2026-03-08 07:37:32.407587'),
(11, 'auth', '0005_alter_user_last_login_null', '2026-03-08 07:37:32.462460'),
(12, 'auth', '0006_require_contenttypes_0002', '2026-03-08 07:37:32.467711'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2026-03-08 07:37:32.475732'),
(14, 'auth', '0008_alter_user_username_max_length', '2026-03-08 07:37:32.495389'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2026-03-08 07:37:32.514735'),
(16, 'auth', '0010_alter_group_name_max_length', '2026-03-08 07:37:32.586081'),
(17, 'auth', '0011_update_proxy_permissions', '2026-03-08 07:37:32.603159'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2026-03-08 07:37:32.620885'),
(19, 'sessions', '0001_initial', '2026-03-08 07:37:32.667272'),
(20, 'adetxinteg', '0002_product_image', '2026-03-08 09:14:29.310565'),
(21, 'adetxinteg', '0003_product_status', '2026-03-08 13:20:00.538257'),
(22, 'adetxinteg', '0004_order_alter_product_id_orderitem_cartitem', '2026-03-09 02:20:58.493691');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adetxinteg_cartitem`
--
ALTER TABLE `adetxinteg_cartitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adetxinteg_cartitem_product_id_abee510c_fk_adetxinteg_product_id` (`product_id`),
  ADD KEY `adetxinteg_cartitem_user_id_6aab30ac_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `adetxinteg_order`
--
ALTER TABLE `adetxinteg_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adetxinteg_order_user_id_9b1140c6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `adetxinteg_orderitem`
--
ALTER TABLE `adetxinteg_orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adetxinteg_orderitem_order_id_165f46fe_fk_adetxinteg_order_id` (`order_id`),
  ADD KEY `adetxinteg_orderitem_product_id_144bff74_fk_adetxinte` (`product_id`);

--
-- Indexes for table `adetxinteg_product`
--
ALTER TABLE `adetxinteg_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adetxinteg_cartitem`
--
ALTER TABLE `adetxinteg_cartitem`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `adetxinteg_order`
--
ALTER TABLE `adetxinteg_order`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `adetxinteg_orderitem`
--
ALTER TABLE `adetxinteg_orderitem`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `adetxinteg_product`
--
ALTER TABLE `adetxinteg_product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adetxinteg_cartitem`
--
ALTER TABLE `adetxinteg_cartitem`
  ADD CONSTRAINT `adetxinteg_cartitem_product_id_abee510c_fk_adetxinteg_product_id` FOREIGN KEY (`product_id`) REFERENCES `adetxinteg_product` (`id`),
  ADD CONSTRAINT `adetxinteg_cartitem_user_id_6aab30ac_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `adetxinteg_order`
--
ALTER TABLE `adetxinteg_order`
  ADD CONSTRAINT `adetxinteg_order_user_id_9b1140c6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `adetxinteg_orderitem`
--
ALTER TABLE `adetxinteg_orderitem`
  ADD CONSTRAINT `adetxinteg_orderitem_order_id_165f46fe_fk_adetxinteg_order_id` FOREIGN KEY (`order_id`) REFERENCES `adetxinteg_order` (`id`),
  ADD CONSTRAINT `adetxinteg_orderitem_product_id_144bff74_fk_adetxinte` FOREIGN KEY (`product_id`) REFERENCES `adetxinteg_product` (`id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
