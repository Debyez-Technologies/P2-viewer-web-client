import Logo from '../../../assets/images/app-logo.svg';

type AppTitle = {
    textColor: string;
}

const AppTitle = ({ textColor = 'white' }) => {
    return (
        // 1. Use `flex` to create the flex container.
        // 2. Use `items-center` to vertically align the flex items (logo and text).
        // 3. Use `gap-4` to add some space between the logo and the text.
        <div className="flex items-center gap-2 mr-10">
            <div>
                <img src={Logo} alt="Debyez logo" width={'48px'} height={'48px'} />
            </div>
            <div className="title-container">
                <span className={`text-2xl text-${textColor} font-normal`} role='h1'>Viewvanta</span> {/* Added some styling for visibility */}
            </div>
        </div>
    );
}

export default AppTitle;