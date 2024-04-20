-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Apr 2024 pada 06.36
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
-- Struktur dari tabel `absensiguru`
--

CREATE TABLE `absensiguru` (
  `id` int(11) NOT NULL,
  `idguru` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `absen_masuk` datetime DEFAULT NULL,
  `absen_keluar` datetime DEFAULT NULL,
  `izin` enum('sakit','keterangan','tanpa_keterangan') DEFAULT NULL,
  `detail-izin` text DEFAULT NULL,
  `foto-izin_absensi` text DEFAULT NULL,
  `status` enum('open','closed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `absensiguru`
--

INSERT INTO `absensiguru` (`id`, `idguru`, `tanggal`, `absen_masuk`, `absen_keluar`, `izin`, `detail-izin`, `foto-izin_absensi`, `status`) VALUES
(1, 1, '2024-04-18', '2024-04-18 14:54:21', NULL, '', '', '', 'open');

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
  `detail_izin` text DEFAULT NULL,
  `foto_izin_absensi` text DEFAULT NULL,
  `status` enum('open','closed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `absensisiswa`
--

INSERT INTO `absensisiswa` (`id`, `nis`, `tanggal`, `absen_masuk`, `absen_keluar`, `izin`, `detail_izin`, `foto_izin_absensi`, `status`) VALUES
(31, 2012321, '2024-04-04', NULL, NULL, 'tanpa_keterangan', '', '', 'closed'),
(32, 2012321, '2024-04-05', NULL, NULL, 'keterangan', 'mokel', '1712200071658-ikan-mujair-goreng.jpg', 'closed'),
(33, 2012321, '2024-04-06', '2024-04-05 06:19:10', NULL, NULL, NULL, NULL, 'closed'),
(36, 2012321, '2024-04-07', NULL, NULL, NULL, NULL, NULL, 'closed'),
(38, 2012321, '2024-04-18', NULL, NULL, NULL, NULL, NULL, 'open');

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
  `gambar_profil` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `nik`, `nama`, `email`, `password`, `no_hp`, `gambar_profil`, `status`, `created_at`, `updated_at`) VALUES
(1, '313432323', 'jay', 'jay@g.com', '123', NULL, '', '-', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `guru`
--

CREATE TABLE `guru` (
  `id` int(11) NOT NULL,
  `nik` bigint(16) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `no_hp` bigint(20) DEFAULT NULL,
  `jenis_kelamin` enum('L','P') NOT NULL,
  `alamat` text DEFAULT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `agama` enum('Muslim','Non-Muslim') NOT NULL,
  `jabatan` enum('Kepala Sekolah','Wakil Kepala Sekolah','Guru Kelas','Koordinator atau Pembina Bidang','Guru Mata Pelajaran','Guru Bimbingan Konseling (BK)','Guru Agama','Guru Pendukung','Guru Pengajar Tambahan','Guru Pembimbing','Guru Pendidikan Khusus','Guru Bahasa Asing','Guru Pengampu Program Keahlian') DEFAULT NULL,
  `status` enum('PNS','Honorer') DEFAULT NULL,
  `gambar_profil` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `guru`
--

INSERT INTO `guru` (`id`, `nik`, `nama`, `email`, `password`, `no_hp`, `jenis_kelamin`, `alamat`, `tempat_lahir`, `tgl_lahir`, `agama`, `jabatan`, `status`, `gambar_profil`, `created_at`, `updated_at`) VALUES
(1, 3603126191912, 'Budin', 'Budin@gmail.com', '123', 98273172391, 'L', 'Las Vegas', 'Pajajaran', '1889-03-13', 'Muslim', 'Kepala Sekolah', 'PNS', '1711618106747-WhatsApp Image 2023-08-11 at 08.18.30.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `jurusan`
--

CREATE TABLE `jurusan` (
  `id` int(11) NOT NULL,
  `namajurusan` varchar(255) NOT NULL,
  `sub_jurusan` int(11) NOT NULL,
  `gambar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `jurusan`
--

INSERT INTO `jurusan` (`id`, `namajurusan`, `sub_jurusan`, `gambar`) VALUES
(15, 'Pengembangan Perangkat Lunak dan Gim', 1, '1711507382196-1711474149565-logo-rpl.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id` int(11) NOT NULL,
  `jurusanid` int(11) NOT NULL,
  `idguru` int(11) DEFAULT NULL,
  `kelas` enum('10','11','12') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`id`, `jurusanid`, `idguru`, `kelas`) VALUES
(31, 15, 1, '10'),
(32, 15, NULL, '11'),
(33, 15, NULL, '12');

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
  `idkelas` int(11) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `no_hp` bigint(20) DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') NOT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `agama` enum('Muslim','Non-Muslim') NOT NULL,
  `gambar_profil` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `siswa`
--

INSERT INTO `siswa` (`id`, `nik`, `nama`, `email`, `password`, `nisn`, `nis`, `idkelas`, `alamat`, `no_hp`, `jenis_kelamin`, `tempat_lahir`, `tgl_lahir`, `agama`, `gambar_profil`, `created_at`, `updated_at`) VALUES
(16, 321789313241, 'Izzy', 'Didi@gmail.com', '123', 87178116234, 2012321, 31, 'Los Santos', 982731723911, 'Laki-laki', 'Seseupan', '2000-09-05', 'Muslim', '1712417786093-image (2).jpeg', '2024-03-28 09:20:59', '2024-04-06 15:36:26');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `absensiguru`
--
ALTER TABLE `absensiguru`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idguru` (`idguru`);

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
  ADD UNIQUE KEY `idguru` (`idguru`),
  ADD KEY `jurusanid` (`jurusanid`) USING BTREE;

--
-- Indeks untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nis` (`nis`),
  ADD KEY `idkelas` (`idkelas`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `absensiguru`
--
ALTER TABLE `absensiguru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `absensisiswa`
--
ALTER TABLE `absensisiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `guru`
--
ALTER TABLE `guru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `absensiguru`
--
ALTER TABLE `absensiguru`
  ADD CONSTRAINT `absensiguru_ibfk_1` FOREIGN KEY (`idguru`) REFERENCES `guru` (`id`);

--
-- Ketidakleluasaan untuk tabel `absensisiswa`
--
ALTER TABLE `absensisiswa`
  ADD CONSTRAINT `absensisiswa_ibfk_1` FOREIGN KEY (`nis`) REFERENCES `siswa` (`nis`);

--
-- Ketidakleluasaan untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_2` FOREIGN KEY (`jurusanid`) REFERENCES `jurusan` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `kelas_ibfk_3` FOREIGN KEY (`idguru`) REFERENCES `guru` (`id`);

--
-- Ketidakleluasaan untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`idkelas`) REFERENCES `kelas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
