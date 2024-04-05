const AboutUS = ({WMobile}) => {
    return(
        <>
        {!WMobile ? (
            <div className="flex flex-col w-full rounded-xl bg-[#D9D9D9] mx-4 p-8 font-inter overflow-y-auto slim-scroll">
                <div className="flex flex-col items-center w-full space-y-4 mb-32">            
                    <h1 className="text-4xl font-bold">How it Started</h1>
                    <p className="lg:text-2xl md:text-xl lg:w-[40%] md:w-1/3 text-center">Selamat datang di website absensi resmi SMKN 1 Depok! 
                    Kami hadir untuk mempermudah dan mempercepat proses 
                    pencatatan kehadiran siswa dan tenaga pendidik. Dibangun 
                    dengan teknologi terkini dan fitur-fitur canggih, website 
                    kami menjaga keamanan data sebagai prioritas utama. 
                    Dukungan dan kerjasama dari komunitas SMKN 1 Depok sangat berarti bagi kami. Terima kasih atas kunjungan Anda!

                    Salam, Tim Pengembang Website Absensi SMKN 1 Depok</p>
                </div>
                <div className="flex space-x-48 justify-center">
                    <div className="rounded-lg bg-blue-700 w-1/4">empty</div>
                    <div className="rounded-lg bg-blue-700 w-1/4"></div>
                </div>
            </div>
        ):(
            <>
            </>
        )}
        </>
    )
}

export default AboutUS