import CustomWidth from "../CustomWidth"
import CardZev from "./universal/febryan"
import CardGilang from "./universal/gilang"
import CardIzzy from "./universal/izzy"
import CardIpul from "./universal/saipul"

const ListCard = () => {
    const DesktopLow = CustomWidth() <= 1366;
    const WMobile = CustomWidth() <= 767;

    return (
        <>
            {!WMobile ? (
                <div className={`flex w-full justify-center items-center`}>
                    <div className={`flex space-x-12 ${DesktopLow ? "overflow-x-auto overflow-y-hidden slim-scroll" : ""}`}>
                        <CardGilang />
                        <CardZev />
                        <CardIzzy />
                        <CardIpul />
                    </div>
                </div>
            ) : (
                <div className={`flex w-full justify-center items-center`}>
                    <div className={`flex space-x-12  overflow-x-auto overflow-y-hidden slim-scroll`}>
                        <CardGilang />
                        <CardZev />
                        <CardIzzy />
                        <CardIpul />
                    </div>
                </div>
            )}
        </>
    )
}

export default ListCard