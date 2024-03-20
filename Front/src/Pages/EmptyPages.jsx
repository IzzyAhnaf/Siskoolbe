const EmptyPages = (role, navTo) => {

    if(role === 'siswa'){
        navTo('/Siskoolbe/Admin')
    }else if(role === 'admin'){
        navTo('/Siskoolbe/Siswa')
    }else if(role === 'guru'){
        navTo('/Siskoolbe/Guru')
    }
    return(
        <>
        tes
        </>
    )
}

export default EmptyPages