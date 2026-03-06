import { API_BASE_URL } from '@/config/settings';
import { useAppStore } from '../../../store/app-store';
import ImageWithFallback from '../../ui-components/ImageWithFallback';

const TitleLogo = ({ textColor = 'white' }) => {

    const currentProjectInfo = useAppStore((state) => state.currentProjectInfo)
    console.log(currentProjectInfo, "info in title log")

    const companyDetails = currentProjectInfo?.companyDetails
    const logoUrl = currentProjectInfo?.publicationId 
        ? `${API_BASE_URL}/api/v1/projects/${currentProjectInfo.publicationId}/logo` 
        : null;

    return (
        // 1. Use `flex` to create the flex container.
        // 2. Use `items-center` to vertically align the flex items (logo and text).
        // 3. Use `gap-4` to add some space between the logo and the text.
        <div className="flex items-center gap-4 mr-10">
            <div>
                <ImageWithFallback
                    src={logoUrl}
                    alt={companyDetails}
                    title={companyDetails}
                    width={48}
                    hieght={48}
                />
            </div>
            <div className="title-container">
                <span className={`text-xl text-${textColor} font-bold `} role='h1'>{companyDetails}</span> {/* Added some styling for visibility */}
            </div>
        </div>
    );
}

export default TitleLogo;