import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Auth = (props) => {
    const { children, type } = props
    const navTo = useNavigate();


    return (
        <>
                <div className="flex justify-center items-center shadow-md bg-white">
                    <div className="w-2/4 flex flex-col bg-black font-inter items-center p-12 space-y-4 min-h-screen
                    justify-center">
                        <img src="logo-onedek.png" alt="" className="rounded-lg bg-[#D9D9D9] size-28" />
                        <h3 className="text-white font-bold text-xl">SMKN 1 Depok</h3>
                        <p className="text-white text-sm text-center">
                            SMK Negeri 1 Depok adalah sebuah <br/>
                            Sekolah Menengah Kejuruan (SMK) <br/>
                            Negeri pertama di Kota Depok<br/>
                            dan telah mendapat status <br/>
                            sekolah PK (Pusat Keunggulan) <br/>
                            dan status sekolah BLUD <br/>
                            (Badan Layanan Umum Daerah)
                        </p>
                    </div>
                    <div className="w-3/4 flex flex-col p-4 space-y-12 min-h-screen font-inter">
                        <div className="flex font-inter justify-end space-x-2">
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
                        </div>
                        <div className={`flex flex-col font-inter items-center`}>
                            <h3 className={`text-black font-bold text-lg mb-8`}>{type === 'login' ? 'Login into SMKN 1 Depok School' : 
                            type === 'register' ? 'Register into SMKN 1 Depok School' : 
                            type === 'forgotpassword' ? 'Forgot Password' : 'Reset Password'}</h3>
                            {children}
                        </div>
                        <div className="absolute bottom-0 right-0 p-4 font-inter">
                            <p>© 2024 SMKN 1 Depok. All rights reserved.</p>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Auth;
