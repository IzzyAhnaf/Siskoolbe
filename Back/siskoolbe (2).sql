-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 21 Mar 2024 pada 03.33
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `siskoolbe`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `absensisiswa`
--

CREATE TABLE `absensisiswa` (
  `id` int(11) NOT NULL,
  `nis` int(10) NOT NULL,
  `tanggal` date NOT NULL,
  `absen_masuk` datetime DEFAULT NULL,
  `absen_keluar` datetime DEFAULT NULL,
  `izin` enum('sakit','keterangan','tanpa_keterangan') DEFAULT NULL,
  `detail-izin` text DEFAULT NULL,
  `foto-izin_absensi` text DEFAULT NULL,
  `status` enum('open','closed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `absensisiswa`
--

INSERT INTO `absensisiswa` (`id`, `nis`, `tanggal`, `absen_masuk`, `absen_keluar`, `izin`, `detail-izin`, `foto-izin_absensi`, `status`) VALUES
(5, 2012321, '2024-03-20', NULL, NULL, NULL, NULL, NULL, 'closed'),
(6, 2112231, '2024-03-20', NULL, NULL, NULL, NULL, NULL, 'closed'),
(7, 2012321, '2024-03-19', '2024-03-19 06:34:32', NULL, 'tanpa_keterangan', NULL, NULL, 'closed'),
(28, 2012321, '2024-03-21', NULL, NULL, NULL, NULL, NULL, 'open'),
(29, 2112231, '2024-03-21', NULL, NULL, NULL, NULL, NULL, 'open');

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `nik` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `no_hp` bigint(20) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `guru`
--

CREATE TABLE `guru` (
  `id` int(11) NOT NULL,
  `nik` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `no_hp` bigint(20) DEFAULT NULL,
  `jenis_kelamin` enum('L','P') NOT NULL,
  `alamat` text DEFAULT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `agama` varchar(255) NOT NULL,
  `pendidikan` varchar(255) NOT NULL,
  `jabatan` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `gambar_profil` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jurusan`
--

CREATE TABLE `jurusan` (
  `id` int(11) NOT NULL,
  `namajurusan` enum('PPLG','MM','TO','PH','AKL') NOT NULL,
  `sub_jurusan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id` int(11) NOT NULL,
  `jurusanid` int(11) NOT NULL,
  `idguru` int(11) NOT NULL,
  `nis` int(10) NOT NULL,
  `kelas` enum('10','11','12') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `siswa`
--

CREATE TABLE `siswa` (
  `id` int(10) NOT NULL,
  `nik` bigint(16) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `nisn` bigint(20) DEFAULT NULL,
  `nis` int(10) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `no_hp` bigint(20) DEFAULT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `gambar_profil` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `siswa`
--

INSERT INTO `siswa` (`id`, `nik`, `nama`, `email`, `password`, `nisn`, `nis`, `alamat`, `no_hp`, `tempat_lahir`, `tgl_lahir`, `gambar_profil`, `created_at`, `updated_at`) VALUES
(13, 321789312121, 'Budi', 'budi@gmail.com', '123', NULL, 2112231, NULL, NULL, NULL, NULL, '', '2024-03-19 03:21:37', '2024-03-19 03:31:30'),
(14, 32178931324, 'Didi', 'didi@gmail.com', '1234', NULL, 2012321, NULL, NULL, NULL, NULL, '', '2024-03-20 02:33:26', '2024-03-20 02:33:26');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `absensisiswa`
--
ALTER TABLE `absensisiswa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nis` (`nis`);

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jurusanid` (`jurusanid`),
  ADD UNIQUE KEY `nis` (`nis`),
  ADD UNIQUE KEY `idguru` (`idguru`);

--
-- Indeks untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nis` (`nis`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `absensisiswa`
--
ALTER TABLE `absensisiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `guru`
--
ALTER TABLE `guru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `absensisiswa`
--
ALTER TABLE `absensisiswa`
  ADD CONSTRAINT `absensisiswa_ibfk_1` FOREIGN KEY (`nis`) REFERENCES `siswa` (`nis`);

--
-- Ketidakleluasaan untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`nis`) REFERENCES `siswa` (`nis`),
  ADD CONSTRAINT `kelas_ibfk_2` FOREIGN KEY (`jurusanid`) REFERENCES `jurusan` (`id`),
  ADD CONSTRAINT `kelas_ibfk_3` FOREIGN KEY (`idguru`) REFERENCES `guru` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
