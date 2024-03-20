import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import CustomWidth from "../CustomWidth";

const Auth = (props) => {
    const { children, type } = props
    const navTo = useNavigate();
    const WMobile = CustomWidth() <= 767;
    const DekstopLow = CustomWidth() <= 1366;

    return (
        <>
            {!WMobile ? (
                <div className="flex justify-center items-center shadow-md bg-white">
                    <div className="w-2/4 flex flex-col font-inter items-center p-12 space-y-4 min-h-screen
                    justify-center text"
                    style={{backgroundColor: 'rgba(30, 108, 177)',
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(d5134ed152d1ce158f3f1f390cef3cbe.jpeg)', // Gambar latar belakang dengan gradasi transparan
                    backgroundBlendMode: 'overlay',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                    }}>
                        <img src="logo-onedek.png" alt="" className="rounded-lg size-38" 
                        style={{filter: 'drop-shadow(0px 4px 20px rgba(255, 255, 255, 1))'}}/>
                        <h3 className={`text-white font-bold ${DekstopLow ? 'text-xl' : 'text-2xl'}`}>SMKN 1 Depok</h3>
                        <p className={`text-white ${DekstopLow ? 'text-sm' : 'text-md'} text-center`}>
                            SMK Negeri 1 Depok adalah sebuah Sekolah <br/>
                            Menengah Kejuruan (SMK) Negeri pertama di Kota <br/>
                            Depok dan telah mendapat status sekolah PK <br/>
                            (Pusat Keunggulan) dan status sekolah BLUD <br/>
                            (Badan Layanan Umum Daerah)
                        </p>
                    </div>
                    <div className={`${WMobile ? 'w-full' : 'w-3/4'} flex flex-col p-4 space-y-12 min-h-screen font-inter`}>
                        {/* <div className="flex font-inter justify-end space-x-2">
                            {type === 'login' ? (
                                <>
                                    <p className="text-black my-auto text-md">Don't have an Account yet?</p>
                                    <button type="button" className="bg-white hover:bg-black text-black hover:text-white rounded-xl px-6 py-1 border border-black"
                                        onClick={() => navTo('/Siskoolbe/Register')}>Register</button>
                                </>
                            ) : type === 'register' ? (
                                <>
                                    <p className="text-black my-auto text-md">Have an Account?</p>
                                    <button type="button" className="bg-white hover:bg-black text-black hover:text-white rounded-xl px-8 py-1 border border-black"
                                        onClick={() => navTo('/Siskoolbe/Login')}>Log in</button>
                                </>
                            ) : (
                                <>
                                    <p className="text-black my-auto text-md">Have an Account?</p>
                                    <button type="button" className="bg-white hover:bg-black text-black hover:text-white rounded-xl px-8 py-1 border border-black"
                                        onClick={() => navTo('/Siskoolbe/Login')}>Log in</button>
                                </>
                            )}
                        </div> */}
                        <div className={`${DekstopLow ? 'flex flex-col font-inter items-center' : 'mx-auto my-auto'}`}>
                            <h3 className={`text-black font-bold text-5xl mb-8 ${DekstopLow ? '' : ''}`}>{
                                type === 'login' ? 'Log In' :
                                // type === 'register' ? 'Register into SMKN 1 Depok School' :
                                type === 'forgotpassword' ? 'Lupa Kata Sandi' : 'Reset Password'}
                            </h3>
                            <p className={`text-lg mb-8 text-[#636A73] ${type === "login" ? 'w-2/3' : ''}`}>
                            {
                                type === 'login' ? 'Masukkan email dan password yang telah tedaftar pada sistem' :

                                type === 'forgotpassword' ? 'Kirim email untuk mereset password' : 
                                'Masukkan email dan password yang telah terdaftar pada sistem'
                            }
                            </p>
                            {children}
                        </div>

                        <div className="absolute bottom-0 right-0 p-4 font-inter">
                            <p>© 2024 SMKN 1 Depok. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col">
                    {/* <div className="flex space-x-2 justify-end font-inter p-3">
                        {type === 'login' ? (
                            <>
                                <p className="text-black my-auto text-sm">Don't have an Account yet?</p>
                                <button type="button" className="bg-white hover:bg-black text-black hover:text-white rounded-sm px-4 py-1 border border-black"
                                    onClick={() => navTo('/Siskoolbe/Register')}>Register</button>
                            </>
                        ) : type === 'register' ? (
                              <>
                                   <p className="text-black my-auto">Have an Account?</p>
                                   <button type="button" className="bg-white hover:bg-black text-black hover:text-white rounded-sm px-6 py-1 border border-black"
                                   onClick={() => navTo('/Siskoolbe/Login')}>Log in</button>
                              </>
                        ) : (
                            <>
                                <p className="text-black my-auto text-sm">Have an Account?</p>
                                <button type="button" className="bg-white hover:bg-black text-black hover:text-white rounded-sm px-6 py-1 border border-black"
                                    onClick={() => navTo('/Siskoolbe/Login')}>Log in</button>
                            </>
                        )}
                    </div> */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h3 className={`text-black font-bold text-2xl mb-8 text-center`}>{
                            type === 'login' ? 'Log in' :
                            // type === 'register' ? 'Register' :
                            type === 'forgotpassword' ? 'Forgot Password' : 'Reset Password'}
                        </h3>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Auth;
