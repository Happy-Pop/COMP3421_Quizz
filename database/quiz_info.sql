-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2024 at 02:43 AM
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
-- Database: `quiz_info`
--

-- --------------------------------------------------------

--
-- Table structure for table `quizs_info`
--

CREATE TABLE `quizs_info` (
  `Quizid` varchar(200) NOT NULL DEFAULT current_timestamp(),
  `Quiz_save_folder` varchar(200) NOT NULL DEFAULT current_timestamp(),
  `Quiz_Author` varchar(200) NOT NULL DEFAULT current_timestamp(),
  `Quiz_Password` varchar(200) DEFAULT current_timestamp(),
  `Quiz_title` varchar(100) DEFAULT NULL,
  `Quiz_created_time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizs_info`
--

INSERT INTO `quizs_info` (`Quizid`, `Quiz_save_folder`, `Quiz_Author`, `Quiz_Password`, `Quiz_title`, `Quiz_created_time`) VALUES
('1211', '22222', '333', NULL, 'Quiz2', NULL),
('2024-04-12T16-42-38-880Z', './Quiz_save_folder/21101256d@connect.polyu.hk/2024-04-12T16-42-38-880Z.json', '21101256d@connect.polyu.hk', '2024-04-13 00:42:38', 'COMP3421 Quiz1', '2024-04-12T16:42:38.880Z'),
('2024-04-12T17-17-14-241Z', './Quiz_save_folder/21101256d@connect.polyu.hk/2024-04-12T17-17-14-241Z.json', '21101256d@connect.polyu.hk', '2024-04-13 01:17:14', 'Quiz 2', '2024-04-12T17:17:14.241Z');

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `User_ID` varchar(45) NOT NULL DEFAULT current_timestamp(),
  `user_firstname` varchar(45) NOT NULL,
  `user_lastname` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_password` varchar(45) NOT NULL,
  `user_identity` varchar(45) NOT NULL,
  `Num_quiz` int(25) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`User_ID`, `user_firstname`, `user_lastname`, `user_email`, `user_password`, `user_identity`, `Num_quiz`) VALUES
('current_timestamp()', 'Xinyan', 'LIU', '1234567@polyu.com', '1234567@polyu.com', 'Student', 0),
('21101256d', 'Zhuoning', 'XU', '21101256d@connect.polyu.hk', '1234567', 'Teacher', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quizs_info`
--
ALTER TABLE `quizs_info`
  ADD PRIMARY KEY (`Quizid`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`user_email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
