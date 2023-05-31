import Login from './Login'
import BannerImg from '../../assets/images/banner.png'

export default function LoginContainer({ page }) {
    console.log('BannerImg', BannerImg)
    return (
        <>

            <div class="fixed inset-0 z-10 flex justify-center items-center bg-gray-500 bg-opacity-50">
                <div class="bg-white rounded-lg p-6">
                    <div className="flex">
                    
                        <Login page={page}/>
                    </div>

                </div>
            </div>
    
        </>
    )
}
