import { useAuthStore } from "@/store/auth";

function IntroBox() {
    const { currentUser } = useAuthStore();

    return (
        <div className="m-5">
            <h1 className="text-3xl text-center">
                Welcome Back,{" "}
                <span className="inherit text-viewer-core">
                    {currentUser?.profile?.fullName ?? `John Doe`}
                </span>
            </h1>
            {/*<h2 className="text-xl text-center mt-4 text-gray-400">How can I help you today?</h2>*/}
        </div>
    );
}

export default IntroBox;
