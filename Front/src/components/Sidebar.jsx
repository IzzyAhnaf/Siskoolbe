import { Link } from "react-router-dom"
const Sidebar = () => {
    <aside className="flex flex-col h-[620px] mt-2 px-4 py-8 overflow-y-auto rounded-3xl bg-sky-700">
        <a href="#" className="mx-auto">
        </a>
        <div className="flex flex-col items-center mt-6 mx-2">
            <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">John Doe</h4>
            <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">Student</p>
        </div>
        <div className="flex flex-row justify-center flex-1 mt-6">
            <nav>
                <a className="flex flex-col items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-100 dark:bg-opacity-50 dark:text-gray-200" href="">
                    <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3c0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8c24.9-25 24.9-65.5-.1-90.5"></path></svg>
                    <span className="font-medium font-inter">Home</span>
                </a>

                <Link className="flex flex-col items-center px-4 py-2 mt-5 text-gray-100 duration-300 transform rounded-lg dark:text-gray-100 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100" to="./Profile">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="mx-4 font-medium font-inter">Profile</span>
                </Link>

                <a className="flex flex-col items-center px-4 py-2 mt-5 text-gray-100 duration-300 transform rounded-lg dark:text-gray-100 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100" href="#">
                    <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M1792 993q60 41 107 93t81 114t50 131t18 141q0 119-45 224t-124 183t-183 123t-224 46q-91 0-176-27t-156-78t-126-122t-85-157H128V128h256V0h128v128h896V0h128v128h256zM256 256v256h1408V256h-128v128h-128V256H512v128H384V256zm643 1280q-3-31-3-64q0-119 45-224t124-183t183-123t224-46q100 0 192 33V640H256v896zm573 384q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36m64-512h192v128h-320v-384h128z"></path></svg>
                    <span className="mx-4 font-medium text-center font-inter">Izin</span>
                </a>
            </nav>
        </div>
    </aside>
}