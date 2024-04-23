import CustomWidth from "../../CustomWidth";

const FormAdmin = ({nama, email, nik, no_hp, handleInputChange, update}) => {

    const WMobile = CustomWidth() <= 767;
    return(
        <>
            {!WMobile ? (
                <form className="w-full overflow-y-auto slim-scroll mx-auto bg-white p-4 font-inter"
                style={{borderRadius: '0 0 10px 10px'}}>
                    <div>
                        <div className="mb-4 flex w-full space-x-2">
                            <div className="mt-4 w-full">
                                <label htmlFor="nama" className="block text-sm">Nama</label>
                                <input 
                                type="text" 
                                name="nama" 
                                id="nama" 
                                value={nama}
                                onChange={handleInputChange}
                                className="w-full flex border-[1px] border-black rounded-md bg-transparent px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                                focus:outline-0"
                                required
                                />
                            </div>
                            <div className="mt-4 w-full">
                                <label htmlFor="email" className="block text-sm">Email</label>
                                <input 
                                type="text" 
                                name="email" 
                                id="email" 
                                value={email}
                                onChange={handleInputChange}
                                className="w-full flex border-[1px] border-black rounded-md bg-[#D9D9D9] px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                                focus:outline-0"
                                disabled
                                />
                            </div>
                        </div>
                        <div className="mb-4 flex w-full space-x-2">
                            <div className="mt-4 w-full">
                                <label htmlFor="nik" className="block text-sm">NIK</label>
                                <input 
                                type="number"
                                name="nik" 
                                id="nik" 
                                value={nik}
                                onChange={handleInputChange}
                                className="w-full flex border-[1px] border-black rounded-md bg-transparent px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                                focus:outline-0 no-InDecrement"
                                onWheel={e => e.target.blur()}
                                required
                                />
                            </div>
                            <div className="mt-4 w-full">
                                <label htmlFor="no_hp" className="block text-sm">No Hp</label>
                                <input 
                                type="number" 
                                name="no_hp" 
                                id="no_hp" 
                                value={no_hp}
                                onChange={handleInputChange}
                                className="w-full flex border-[1px] border-black rounded-md bg-transparent px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                                focus:outline-0 no-InDecrement"
                                required
                                onWheel={e => e.target.blur()}
                                />
                            </div>
                        </div>

                        <div className="w-full mt-8">
                            <button
                                type="button"
                                onClick={update}
                                className="w-full bg-blue-500 py-2 text-white">
                                 <span>Simpan</span>
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <>
                    <form className="w-full font-inter">
                        <div className="mb-3 flex flex-col justify-center items-center space-y-2 px-8">
                            <div className="mt-4 w-full">
                                <label htmlFor="nama" className="block text-sm">Nama</label>
                                <input 
                                type="text" 
                                name="nama" 
                                id="nama" 
                                value={nama}
                                onChange={handleInputChange}
                                className="w-full flex border-[1px] border-black rounded-md bg-transparent px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                                focus:outline-0"
                                required
                                />
                            </div>
                            <div className="mt-4 w-full">
                                <label htmlFor="email" className="block text-sm">Email</label>
                                <input 
                                type="text" 
                                name="email" 
                                id="email" 
                                value={email}
                                onChange={handleInputChange}
                                className="w-full flex border-[1px] border-black rounded-md bg-[#D9D9D9] px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                                focus:outline-0"
                                disabled
                                />
                            </div>
                            <div className="mt-4 w-full">
                                <label htmlFor="nik" className="block text-sm">NIK</label>
                                <input 
                                type="number"
                                name="nik" 
                                id="nik" 
                                value={nik}
                                onChange={handleInputChange}
                                className="w-full flex border-[1px] border-black rounded-md bg-transparent px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                                focus:outline-0 no-InDecrement"
                                onWheel={e => e.target.blur()}
                                required
                                />
                            </div>
                            <div className="mt-4 w-full">
                                <label htmlFor="no_hp" className="block text-sm">No Hp</label>
                                <input 
                                type="number" 
                                name="no_hp" 
                                id="no_hp" 
                                value={no_hp}
                                onChange={handleInputChange}
                                className="w-full flex border-[1px] border-black rounded-md bg-transparent px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                                focus:outline-0 no-InDecrement"
                                required
                                onWheel={e => e.target.blur()}
                                />
                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    )
}

export default FormAdmin